<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import GradientsBox from "@/components/GradientsBox/index.vue";
import CustomizeDialog from "@/components/CustomizeDialog/index.vue";
import PreviewPanel from "@/components/PreviewPanel/index.vue";
import vMove from "@/directives/move";
import { useView } from "./hooks";
import { debounce } from "lodash";

const {
  gradientType,
  gradients,
  loadNewGradients,
  changeGradientType,
  changeMode,
  viewMode,
  selectedGradient,
  enterPreviewMode,
} = useView();

const onscroll = debounce(loadNewGradients, 200);
onMounted(() => {
  changeGradientType(gradientType.value);
  window.document.addEventListener("scroll", onscroll);
});
onUnmounted(() => {
  window.document.removeEventListener("scroll", onscroll);
});

//customize part
const modalVisible = ref(false);
const openCustumizeDialog = (): void => {
  modalVisible.value = true;
};
</script>
<template>
  <h1>Generate your gradients</h1>
  <Transition
    enter-active-class="bounce-enter-active"
    leave-active-class="bounce-leave-active"
  >
    <preview-panel
      @back="changeMode('overview')"
      v-show="viewMode === 'preview'"
      v-model:info="selectedGradient"
    ></preview-panel>
  </Transition>
  <Transition enter-active-class="bounce-enter-active-1000">
    <el-row v-show="viewMode === 'overview'" class="flex-center">
      <kazi-btn
        @click="changeGradientType('STRONG')"
        :active="gradientType === 'STRONG'"
        >STRONG</kazi-btn
      >
      <kazi-btn
        @click="changeGradientType('PASTEL')"
        :active="gradientType === 'PASTEL'"
        >PASTEL</kazi-btn
      >
      <kazi-btn
        @click="changeGradientType('COOL')"
        :active="gradientType === 'COOL'"
        >COOL</kazi-btn
      >
      <kazi-btn
        @click="changeGradientType('BRIGHT')"
        :active="gradientType === 'BRIGHT'"
        >BRIGHT</kazi-btn
      >
      <kazi-btn
        @click="openCustumizeDialog"
        :active="gradientType === 'CUSTOMIZE'"
      >
        CUSTOMIZE</kazi-btn
      >
    </el-row>
  </Transition>
  <el-row :gutter="32" :class="viewMode + '-mode'">
    <el-col
      :xs="12"
      :sm="8"
      :md="8"
      :lg="6"
      :xl="6"
      v-for="info in gradients"
      :key="info.colors"
    >
      <GradientsBox
        v-move
        :class="viewMode + '-mode'"
        :info="info"
        :focus="JSON.stringify(info) === JSON.stringify(selectedGradient)"
        @click="enterPreviewMode(info)"
      />
    </el-col>
  </el-row>
  <KeepAlive>
    <customize-dialog
      @data-updated="changeGradientType('CUSTOMIZE')"
      v-model:visible="modalVisible"
    ></customize-dialog>
  </KeepAlive>
</template>

<style scoped lang="scss">
button {
  margin-right: 1.2rem;
  margin-bottom: 2.4rem;
}
</style>
