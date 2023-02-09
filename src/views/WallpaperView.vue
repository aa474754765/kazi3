<script setup lang="ts">
import Wallpaper from "@/components/WallPaper/index.vue";
import type { WallpaperInfo } from "@/types";
import { defaultWallPaperSettings } from "@/types/models";
import { reactive } from "vue";

const paperInfo: WallpaperInfo = reactive<WallpaperInfo>(
  defaultWallPaperSettings
);
</script>

<template>
  <el-row justify="center">
    <el-col :xs="24" :sm="6" :md="5" :lg="6" :xl="6" class="tools-panel">
    </el-col>
    <el-col :xs="24" :sm="18" :md="19" :lg="18" :xl="18">
      <wallpaper :data="paperInfo"></wallpaper>
    </el-col>
  </el-row>
</template>

<style scoped></style>
