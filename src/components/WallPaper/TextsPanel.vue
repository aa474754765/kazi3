<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import SettingsBox from "@/components/WallPaper/SettingsBox.vue";
import { newText, selectedFonts } from "@/types/models";
import type { TextSetting } from "@/types";
import { deepClone } from "@/utils";
import EventBus from "@/utils/eventBus";

interface Props {
  title: string;
  value: TextSetting[];
}
interface Emits {
  (e: "update:value", val: TextSetting[]): void;
}
const props = withDefaults(defineProps<Props>(), {
  title: "",
  value: () => [],
});
const emit = defineEmits<Emits>();
const texts = computed<TextSetting[]>({
  get() {
    return props.value;
  },
  set(val: TextSetting[]) {
    emit("update:value", val);
  },
});

const fonts = ref(selectedFonts);
const selectedText = ref("");
const addText = (): void => {
  texts.value.push(deepClone(newText));
};
const removeText = (index: number): void => {
  texts.value.splice(index, 1);
};

onMounted(() => {
  if (props.value.length > 0) {
    selectedText.value = props.value[0].id;
  }
  EventBus.on("text", function (id: string) {
    selectedText.value = id;
  });
});
onUnmounted(() => {
  EventBus.off("text");
});
</script>

<template>
  <settings-box :title="props.title" :style="{ '--radius': '18px' }">
    <template #title>
      <el-icon class="add-icon" @click="addText" :size="18"><Plus /></el-icon>
    </template>
    <el-collapse v-model="selectedText" accordion>
      <el-collapse-item
        :style="{
          '--el-collapse-header-bg-color': 'var(--color-panel-background)',
          '--el-collapse-content-bg-color': 'var(--color-panel-background)',
          '--el-collapse-header-text-color': 'var(--color-text)',
        }"
        v-for="(text, index) of texts"
        :name="text.id"
        :key="text.id"
      >
        <template #title>
          {{ text.text }}
          <el-tooltip
            effect="light"
            content="Remove text"
            placement="top-start"
          >
            <el-icon @click="removeText(index)"><Close /></el-icon>
          </el-tooltip>
        </template>
        <el-row :gutter="32">
          <el-col :span="12">
            <span class="label">Text Color</span>
            <el-color-picker
              v-model="text.color"
              @active-change="text.color = $event"
              show-alpha
            ></el-color-picker>
          </el-col>
          <el-col :span="12">
            <span class="label">Font</span>
            <el-select size="small" v-model="text.font" placeholder="choose">
              <el-option
                v-for="item in fonts"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="12">
            <span class="label">Size</span>
            <el-slider
              :style="{
                '--el-slider-button-size': '16px',
                '--el-slider-height': '4px',
              }"
              :min="10"
              :max="300"
              v-model="text.size"
            ></el-slider>
          </el-col>
          <el-col :span="12">
            <span class="label">Rotate</span>
            <el-slider
              :style="{
                '--el-slider-button-size': '16px',
                '--el-slider-height': '4px',
              }"
              :show-tooltip="false"
              :min="0"
              :max="360"
              v-model="text.rotate"
            ></el-slider>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="24">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="Text"
              v-model="text.text"
            ></el-input>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </settings-box>
</template>

<style scoped lang="scss">
.text-setting {
  padding: 1rem;
}
.el-col {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.label {
  color: var(--color-gray2);
  font-size: 12px;
  margin-right: 12px;
}
.el-icon {
  margin-left: 16px;
}
.add-icon {
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
