<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useMutationObserver } from "@vueuse/core";
import { newColor } from "@/types/models";
import type { ColorsSetting } from "@/types";
import vLeft from "./vLeft";
import vDrag from "@/directives/drag";
import vTouch from "@/directives/touch";
import { deepClone } from "@/utils";

interface Props {
  value: ColorsSetting[];
  radius?: number;
}
interface Emits {
  (e: "update:value", val: ColorsSetting[]): void;
}
const props = withDefaults(defineProps<Props>(), {
  value: () => [],
  radius: 22,
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
const addColor = (): void => {
  colors.value.push(deepClone(newColor));
};
const removeColor = (index: number): void => {
  colors.value.splice(index, 1);
};
</script>
<template>
  <div
    ref="slider"
    class="gradients-slider flex-center"
    :style="{ '--radius': props.radius + 'px' }"
  >
    <div class="gradients-container">
      <div class="center-line"></div>
      <div
        v-drag.preventY.preventColor
        v-touch.preventY.preventColor
        v-left="color.percentage"
        v-for="(color, index) of colors"
        :index="index"
        :key="color.id"
        class="item"
      >
        <el-tooltip
          :content="Math.round(color.percentage) + '%'"
          placement="top"
          effect="light"
        >
          <template #content>
            <div class="flex-center">
              <span>{{ Math.round(color.percentage) + "%" }}</span>
              <el-icon v-show="colors.length > 2" @click="removeColor(index)"
                ><Close
              /></el-icon>
            </div>
          </template>
          <div>
            <el-color-picker
              :model-value="color.text"
              @active-change="color.text = $event"
              show-alpha
            ></el-color-picker>
          </div>
        </el-tooltip>
      </div>
    </div>
    <div class="flex-center" style="width: 24px">
      <el-icon v-show="!(colors.length > 4)" :size="18">
        <CirclePlus @click="addColor" />
      </el-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gradients-slider {
  width: 100%;
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
</style>
