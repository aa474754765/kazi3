<script setup lang="ts">
import GradientsBox from "@/components/GradientsBox/index.vue";
import { starKey, Storager } from "@/utils/storage";
import type { BoxInfo } from "@/types";
import vMove from "@/directives/move";
import { useView } from "./hooks";

const { gradients, viewMode } = useView();

const renderStarBox = (): void => {
  gradients.value = Storager.get<BoxInfo>(starKey).map((i) => i.value);
};
renderStarBox();
</script>
<template>
  <h1>Yours Favorites</h1>
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
        @unstar="renderStarBox"
      />
    </el-col>
  </el-row>
</template>

<style scoped lang="scss"></style>
