<script setup lang="ts">
import { debounce } from "lodash";
import { onMounted, onUnmounted, ref } from "vue";
import GradientsBox from "@/components/GradientsBox/index.vue";
import CustomizeDialog from "@/components/CustomizeDialog/index.vue";
import type { GradientsType } from "@/types";
import { randowArr } from "@/utils";

const gradientType = ref<GradientsType>("PASTEL");
const gradients = ref(randowArr(16));
// when scroll to the bottom, it should add the new gradients to the last
const loadNewGradients = () => {
  let viewHeight = document.documentElement.clientHeight;
  let offsetHeight = document.documentElement.offsetHeight;
  let scrollTop = document.documentElement.scrollTop;

  if (viewHeight + scrollTop + 300 > offsetHeight) {
    gradients.value = gradients.value.concat(randowArr(8));
  }
};
const onscroll = debounce(loadNewGradients, 200);
onMounted(() => {
  window.document.addEventListener("scroll", onscroll);
});
onUnmounted(() => {
  window.document.removeEventListener("scroll", onscroll);
});
const changeGradientType = (type: GradientsType): void => {
  gradients.value = randowArr(16);
  gradientType.value = type;
};

//customize part
const modalVisible = ref(false);
const openCustumizeDialog = (): void => {
  modalVisible.value = true;
};
</script>
<template>
  <h1>Generate your gradients</h1>
  <el-row>
    <kazi-btn
      gradients-type="PASTEL"
      @click="changeGradientType('PASTEL')"
      :active="gradientType === 'PASTEL'"
      >PASTEL</kazi-btn
    >
    <kazi-btn
      gradients-type="COOL"
      @click="changeGradientType('COOL')"
      :active="gradientType === 'COOL'"
      >COOL</kazi-btn
    >
    <kazi-btn
      gradients-type="STRONG"
      @click="changeGradientType('STRONG')"
      :active="gradientType === 'STRONG'"
      >STRONG</kazi-btn
    >
    <kazi-btn
      gradients-type="BRIGHT"
      @click="changeGradientType('BRIGHT')"
      :active="gradientType === 'BRIGHT'"
      >BRIGHT</kazi-btn
    >
    <kazi-btn
      gradients-type="CUSTOMIZE"
      @click="openCustumizeDialog"
      :active="gradientType === 'CUSTOMIZE'"
    >
      CUSTOMIZE</kazi-btn
    >
  </el-row>
  <el-row :gutter="32">
    <el-col
      :xs="24"
      :sm="12"
      :md="8"
      :lg="6"
      :xl="6"
      v-for="i in gradients"
      :key="i"
    >
      <GradientsBox :type="gradientType" class="grid-content" />
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
h1 {
  text-align: center;
  margin: 2.4rem 0;
  opacity: 0.7;
}

.el-row {
  margin-bottom: 2.4rem;
  justify-content: center;

  button {
    margin-right: 1.2rem;
  }
}

.el-col {
  border-radius: 4px;
  margin-bottom: 3.2rem;
}

.grid-content {
  border-radius: 1rem;
  min-height: 20rem;
}
</style>
