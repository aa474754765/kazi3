<script setup lang="ts">
import SettingsBox from "@/components/WallPaper/SettingsBox.vue";
import GradientsSlider from "@/components/GradientsSlider/index.vue";
import type { BgSetting } from "@/types";

interface Props {
  title: string;
  settings: BgSetting[];
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  settings: () => [],
});
</script>

<template>
  <settings-box :title="props.title">
    <template v-for="(setting, i) of props.settings" :key="i">
      <gradients-slider v-model:value="setting.colors"></gradients-slider>
    </template>
  </settings-box>
</template>

<style scoped lang="scss"></style>
