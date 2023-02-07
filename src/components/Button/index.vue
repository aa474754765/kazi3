<script setup lang="ts">
import type { GradientsType } from "@/types";

const props = withDefaults(
  defineProps<{ gradientsType?: GradientsType; active?: boolean }>(),
  {
    active: false,
    gradientsType: undefined,
  }
);
</script>
<template>
  <button class="kazi-btn" type="button" :class="{ active: props.active }">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.kazi-btn {
  display: flex;
  justify-content: center;
  position: relative;
  padding: 1rem 1.6rem;
  border-radius: 8px;
  border: none;
  white-space: nowrap;
  letter-spacing: 0.5px;
  color: var(--color-text);
  background-color: var(--color-button-background);
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
  cursor: pointer;

  @media (max-width: 991px) {
    padding: 1rem 1.2rem;
  }

  @media (max-width: 767px) {
    padding: 1rem 1rem;
  }
}

:deep(.el-icon) {
  font-size: 16px;
  margin: 0 0.4rem;
}

.kazi-btn.primary {
  color: var(--color-gray0-1);
  background-color: var(--color-e3);
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
