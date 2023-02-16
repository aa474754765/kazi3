<script setup lang="ts">
import { onMounted } from "vue";
import GradientsBox from "@/components/GradientsBox/index.vue";
import PreviewPanel from "@/components/PreviewPanel/index.vue";
import { starKey, Storager } from "@/utils/storage";
import type { BoxInfo } from "@/types";
import vMove from "@/directives/move";
import { useView } from "./hooks";

const { gradients, viewMode, changeMode, selectedGradient, enterPreviewMode } =
  useView();

const renderView = (): void => {
  renderStarBox();
  if (gradients.value.length === 0) {
    changeMode("overview");
  } else {
    selectedGradient.value = gradients.value[0];
  }
};
const renderStarBox = (): void => {
  gradients.value = Storager.get<BoxInfo>(starKey).map((i) => i.value);
};

onMounted(() => {
  renderView();
});
</script>
<template>
  <h1>Your Favorites</h1>
  <div v-if="gradients.length === 0" class="collecting-box">
    <router-link class="link" to="/">
      <el-empty>
        <kazi-btn>Collecting Your Gradients</kazi-btn>
      </el-empty>
    </router-link>
  </div>
  <Transition
    enter-active-class="bounce-enter-active"
    leave-active-class="bounce-leave-active"
  >
    <preview-panel
      @back="changeMode('overview')"
      @star="renderStarBox"
      @unstar="renderView"
      v-show="viewMode === 'preview'"
      v-model:info="selectedGradient"
    ></preview-panel>
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
        :focus="JSON.stringify(info) === JSON.stringify(selectedGradient)"
        :info="info"
        @click="enterPreviewMode(info)"
        @unstar="renderStarBox"
      />
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.collecting-box {
  padding: 5rem 0;
  display: flex;
  justify-content: center;

  button {
    padding: 2rem 5rem;
  }
}
</style>
