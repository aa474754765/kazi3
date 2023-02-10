<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useMutationObserver } from "@vueuse/core";
import type { ColorsSetting } from "@/types";
import vLeft from "./vLeft";
import vDrag from "@/directives/drag";

interface Props {
  value: ColorsSetting[];
}
interface Emits {
  (e: "update:value", val: ColorsSetting[]): void;
}
const props = withDefaults(defineProps<Props>(), {
  value: () => [],
});
const emit = defineEmits<Emits>();
const colors = computed<ColorsSetting[]>({
  get() {
    return props.value;
  },
  set(val: ColorsSetting[]) {
    emit("update:value", val);
  },
});

// detect the styles changes of child nodes
const slider = ref(null);
onMounted(() => {
  useMutationObserver(
    slider,
    (mutations: MutationRecord[]) => {
      mutations.forEach((m) => {
        const element = m.target as HTMLElement;
        const index = element.getAttribute("index");
        if (index !== null) {
          if (element.getAttribute("per")) {
            colors.value[Number(index)].percentage = Number(
              element.getAttribute("per")
            );
          }
        }
      });
      colors.value = colors.value.sort((a, b) => a.percentage - b.percentage);
    },
    {
      attributes: true,
      subtree: true,
    }
  );
});
const addColor = () => {
  const newColor: ColorsSetting = {
    text: "rgb(255, 255, 255)",
    percentage: 100,
  };
  colors.value.push(newColor);
};
</script>
<template>
  <div
    ref="slider"
    class="gradients-slider flex-center"
    :style="{ '--radius': '24px' }"
  >
    <div class="gradients-container">
      <div class="center-line"></div>
      <div
        v-drag.preventY.preventColor
        v-left="color.percentage"
        v-for="(color, index) of colors"
        :index="index"
        :key="color.text"
        class="item"
      >
        <el-color-picker v-model="color.text" show-alpha></el-color-picker>
      </div>
    </div>
    <div class="flex-center" style="width: 24px">
      <el-icon v-show="!(colors.length > 4)" :size="24">
        <CirclePlusFilled @click="addColor" />
      </el-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gradients-slider {
  height: 5rem;
  position: relative;
  background-color: transparent;
  display: flex;

  .gradients-container {
    flex: 1;
    height: 100%;
    position: relative;
  }

  .center-line {
    position: absolute;
    top: calc(50% - 1px);
    width: calc(100% - var(--radius));
    left: calc(var(--radius) / 2);
    height: 2px;
    background-color: var(--color-gray3);
  }

  .item {
    position: absolute;
    height: var(--radius);
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
}

.el-icon {
  margin-left: 10px;
  color: var(--color-gray1-1);
  background-color: transparent;
  cursor: pointer;
}

:deep(.el-color-picker),
:deep(.el-color-picker__color-inner),
:deep(.el-color-picker__trigger),
:deep(.el-color-picker__color) {
  width: var(--radius);
  height: var(--radius);
  padding: 0;
  border: none;
  border-radius: 50%;
}

:deep(.el-color-picker__color-inner) {
  border: 2px solid var(--color-gray1-1);
}

:deep(.el-color-picker:hover) .el-color-picker__trigger {
  width: var(--radius);
  height: var(--radius);
  border: none !important;
}

:deep(.el-color-picker) .el-color-picker__icon {
  display: none;
}
</style>
