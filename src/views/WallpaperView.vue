<script setup lang="ts">
import { reactive } from "vue";
import Wallpaper from "@/components/WallPaper/index.vue";
import ColorsPanel from "@/components/WallPaper/ColorsPanel.vue";
import TextsPanel from "@/components/WallPaper/TextsPanel.vue";
import type { WallpaperInfo } from "@/types";
import { defaultWallPaperSettings } from "@/types/models";

const paperInfo: WallpaperInfo = reactive<WallpaperInfo>(
  defaultWallPaperSettings
);
</script>

<template>
  <el-row justify="center" :gutter="24">
    <el-col :xs="24" :sm="8" :md="6" :lg="6" :xl="6" class="tools-panel">
      <colors-panel
        title="Gradients"
        v-model:value="paperInfo.bgImage"
      ></colors-panel>
      <texts-panel title="Texts" :value="paperInfo.texts"></texts-panel>
    </el-col>
    <el-col :xs="24" :sm="16" :md="18" :lg="18" :xl="18">
      <wallpaper :data="paperInfo"></wallpaper>
    </el-col>
  </el-row>
</template>

<style scoped></style>
