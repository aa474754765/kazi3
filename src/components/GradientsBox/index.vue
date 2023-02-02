<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { randomDeg, generateRGBByType } from "@/utils/transformers";
import type { GradientsType } from "@/types";

interface Props {
  type: GradientsType;
}
const props = withDefaults(defineProps<Props>(), {
  type: "COOL",
});

const elStyle = computed((): CSSProperties => {
  return {
    "background-image": `linear-gradient(${randomDeg()}deg, rgb(${generateRGBByType(
      props.type
    )}), rgb(${generateRGBByType(props.type)}))`,
  };
});
</script>
<template>
  <div :style="elStyle"></div>
</template>

<style scoped></style>
