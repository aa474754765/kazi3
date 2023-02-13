<script setup lang="ts">
import { computed } from "vue";

const emit = defineEmits<{
  (e: "update:value", value: string): void;
}>();

const props = withDefaults(
  defineProps<{
    title?: string;
    value?: string;
    min?: number;
    max?: number;
    gradients?: string;
  }>(),
  {
    title: "",
    value: "0",
    min: 0,
    max: 100,
  }
);

const modelValue = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit("update:value", value);
  },
});
</script>
<template>
  <div class="color-range">
    <div class="color-range-title">{{ props.title }}</div>
    <div class="slider-container">
      <div
        class="color-range-slider"
        :style="{ 'background-image': props.gradients }"
      >
        <input
          :min="props.min"
          :max="props.max"
          type="range"
          v-model="modelValue"
        />
      </div>
      <span>{{ modelValue }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.color-range {
  margin-bottom: 8px;
  border-radius: 8px;
  padding: 0 0.8rem;
  border: 0.5px solid var(--color-border);
  width: 100%;

  .color-range-title {
    padding: 8px 0;
    line-height: 2.4rem;
  }

  .slider-container {
    padding: 0.8rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 0.5px solid var(--color-border);
  }

  .color-range-slider {
    position: relative;
    width: 50%;
    height: 1.2rem;
    border-radius: 4px;
  }

  input[type="range"] {
    width: 100%;
    bottom: 0.5rem;
    appearance: none;
    -webkit-appearance: none;
    background: 0;
    position: relative;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 2rem;
    width: 2rem;
    background: #ffffff;
    border: 1px solid var(--color-border);
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>
