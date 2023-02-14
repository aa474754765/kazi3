<script setup lang="ts">
import { reactive, ref } from "vue";
import { useFullscreen } from "@vueuse/core";
import Wallpaper from "@/components/WallPaper/index.vue";
import ColorsPanel from "@/components/WallPaper/ColorsPanel.vue";
import TextsPanel from "@/components/WallPaper/TextsPanel.vue";
import type { WallpaperInfo } from "@/types";
import { defaultWallPaperSettings } from "@/types/models";

const paperInfo: WallpaperInfo = reactive<WallpaperInfo>(
  defaultWallPaperSettings
);

const el = ref<HTMLElement | null>(null);
const { isFullscreen, enter } = useFullscreen(el);
</script>

<template>
  <el-row justify="center" :gutter="24">
    <el-col :xs="24" :sm="8" :md="6" :lg="6" :xl="6" class="tools-panel">
      <colors-panel
        title="Gradients"
        v-model:value="paperInfo.bgImage"
      ></colors-panel>
      <texts-panel title="Texts" :value="paperInfo.texts"></texts-panel>
      <section class="operation-section">
        <el-tooltip effect="light" content="Fullscreen" placement="right">
          <el-icon @click="enter" class="full-screen" :size="28"
            ><FullScreen
          /></el-icon>
        </el-tooltip>
      </section>
    </el-col>
    <el-col :xs="24" :sm="16" :md="18" :lg="18" :xl="18">
      <wallpaper
        :class="{ fullscreen: isFullscreen }"
        ref="el"
        :data="paperInfo"
      ></wallpaper>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.operation-section {
  text-align: right;
}
.full-screen {
  cursor: pointer;

  &:hover {
    transition: all 0.2s;
    transform: scale(1.2);
  }
}
</style>
