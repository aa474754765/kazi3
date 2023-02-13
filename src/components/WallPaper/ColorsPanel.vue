<script setup lang="ts">
import { computed } from "vue";
import draggable from "vuedraggable";
import SettingsBox from "@/components/WallPaper/SettingsBox.vue";
import GradientsSlider from "@/components/GradientsSlider/index.vue";
import { newGradientSetting } from "@/types/models";
import type { BgSetting } from "@/types";
import { deepClone } from "@/utils";

interface Props {
  title: string;
  value: BgSetting[];
}
interface Emits {
  (e: "update:value", val: BgSetting[]): void;
}
const props = withDefaults(defineProps<Props>(), {
  title: "",
  value: () => [],
});
const emit = defineEmits<Emits>();

const settings = computed<BgSetting[]>({
  get() {
    return props.value;
  },
  set(val: BgSetting[]) {
    emit("update:value", val);
  },
});

const addGradient = (): void => {
  settings.value.push(deepClone(newGradientSetting));
};
const removeGradient = (index: number): void => {
  settings.value.splice(index, 1);
};
</script>

<template>
  <settings-box :title="props.title">
    <template #title>
      <el-icon @click="addGradient" :size="18"><Plus /></el-icon>
    </template>
    <draggable :list="settings" handle=".drag-icon" item-key="colors">
      <template #item="{ element, index }">
        <div class="flex-center">
          <el-tooltip
            placement="left"
            effect="light"
            popper-class="vertical-slider"
          >
            <template #content>
              <el-slider
                :min="0"
                :max="360"
                v-model="element.deg"
                vertical
                height="100px"
              >
              </el-slider>
            </template>
            <div class="deg-text">
              {{ element.deg }}
            </div>
          </el-tooltip>
          <gradients-slider v-model:value="element.colors"></gradients-slider>
          <el-tooltip
            placement="right"
            effect="light"
            :disabled="settings.length < 2"
          >
            <template #content>
              <div class="flex-center">
                <el-icon
                  v-show="settings.length > 1"
                  @click="removeGradient(index)"
                  ><Delete
                /></el-icon>
              </div>
            </template>
            <div>
              <el-icon :size="20" class="drag-icon"><Operation /></el-icon>
            </div>
          </el-tooltip>
        </div>
      </template>
    </draggable>
  </settings-box>
</template>

<style scoped lang="scss">
.el-icon {
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
}
.drag-icon {
  position: relative;
  top: 2px;
  margin-left: 8px;
}

.deg-text {
  width: 24px;
  height: 24px;
  line-height: 24px;
  border: 1px grey solid;
  border-radius: 50%;
  font-size: 12px;
  text-align: center;
  flex-shrink: 0;
  margin-right: 8px;
}
</style>
<style>
.vertical-slider {
  padding: 4px 0;
}
</style>
