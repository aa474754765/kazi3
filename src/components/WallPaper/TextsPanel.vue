<script setup lang="ts">
import SettingsBox from "@/components/WallPaper/SettingsBox.vue";
import type { TextSetting } from "@/types";

interface Props {
  title: string;
  settings: TextSetting[];
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  settings: () => [],
});
</script>

<template>
  <settings-box :title="props.title"> 123 </settings-box>
</template>

<style scoped></style>
