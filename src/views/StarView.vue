<script setup lang="ts">
import GradientsBox from "@/components/GradientsBox/index.vue";
import PreviewPanel from "@/components/PreviewPanel/index.vue";
import { starKey, Storager } from "@/utils/storage";
import type { BoxInfo } from "@/types";
import vMove from "@/directives/move";
import { useView } from "./hooks";

const { gradients, viewMode, changeMode, selectedGradient, enterPreviewMode } =
  useView();

const renderStarBox = (): void => {
  gradients.value = Storager.get<BoxInfo>(starKey).map((i) => i.value);
  if (gradients.value.length === 0) {
    changeMode("overview");
  } else {
    selectedGradient.value = gradients.value[0];
  }
};
renderStarBox();
</script>
<template>
  <h1>Yours Favorites</h1>
  <Transition
    enter-active-class="bounce-enter-active"
    leave-active-class="bounce-leave-active"
  >
    <preview-panel
      @back="changeMode('overview')"
      @unstar="renderStarBox"
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
        :info="info"
        @click="enterPreviewMode(info)"
        @unstar="renderStarBox"
      />
    </el-col>
  </el-row>
</template>

<style scoped lang="scss"></style>
