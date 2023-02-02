<script setup lang="ts">
import { generateRGB } from "@/utils/transformers";
import type { GradientsType } from "@/types";
import { computed, type CSSProperties } from "vue";

const props = withDefaults(
  defineProps<{ gradientsType: GradientsType; active?: boolean }>(),
  {
    active: false,
    gradientsType: undefined,
  }
);

// not used yet
const gradientStyles = computed((): CSSProperties => {
  if (props.gradientsType) {
    return {
      "background-image": `linear-gradient(to right, rgb(${generateRGB(
        props.gradientsType
      )}), rgb(${generateRGB(props.gradientsType)}))`,
      "background-clip": "text",
      "-webkit-background-clip": "text",
      color: "transparent",
    };
  } else {
    return {};
  }
});
</script>
<template>
  <button class="kazi-btn" type="button" :class="{ active: props.active }">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.kazi-btn {
  position: relative;
  padding: 1rem 1.6rem;
  border-radius: 8px;
  border: none;
  letter-spacing: 0.5px;
  color: var(--color-text);
  background-color: var(--color-button-background);
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
  cursor: pointer;
}

.kazi-btn.active {
  color: var(--color-gray0-1);
  background-color: var(--color-c2-2);
}

.kazi-btn:hover {
  opacity: 0.9;
  transform: scale(1.05);
}
</style>
