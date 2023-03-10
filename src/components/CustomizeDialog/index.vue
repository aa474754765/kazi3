<script setup lang="ts">
import { computed, reactive, onMounted } from "vue";
import type { HSLInfo, HSLType, HSLValue } from "@/types";
import { generateRGBString } from "@/utils/transformers";
import ColorRange from "./ColorRange.vue";
import { useGradientsStore } from "@/stores/gradients";

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
  (e: "dataUpdated"): void;
}>();
const visible = computed({
  get() {
    return props.visible;
  },
  set(val: boolean) {
    emit("update:visible", val);
  },
});

//HSL related
const hsl = reactive({
  hue: "360",
  saturation: "100",
  lightness: "50",
});
const hslPercentage = computed(
  (): HSLValue => ({
    hue: Number(hsl.hue) / 360,
    saturation: Number(hsl.saturation) / 100,
    lightness: Number(hsl.lightness) / 100,
  })
);
const gradients = reactive({
  hue: "",
  saturation: "",
  lightness: "",
});
onMounted(() => {
  initDefaultGradients();
});
// init the default gradients for the sliders
const initDefaultGradients = (): void => {
  hsl.hue = "360";
  hsl.saturation = "100";
  hsl.lightness = "50";
  gradients.hue = `linear-gradient(to right,rgb(128, 0, 0),rgb(128, 128, 0),rgb(0, 128, 0),rgb(0, 128, 128),rgb(0, 0, 128),rgb(128, 0, 128),rgb(128, 0, 0))`;
  colorsChanged("hue");
};
const colorsChanged = (type: HSLType): void => {
  if (type !== "hue") {
    gradients.hue = `linear-gradient(to right, 
    rgb(${generateRGBString({ ...hslPercentage.value, hue: 0 })}), 
    rgb(${generateRGBString({ ...hslPercentage.value, hue: 0.2 })}), 
    rgb(${generateRGBString({ ...hslPercentage.value, hue: 0.4 })}), 
    rgb(${generateRGBString({ ...hslPercentage.value, hue: 0.6 })}), 
    rgb(${generateRGBString({ ...hslPercentage.value, hue: 0.8 })}), 
    rgb(${generateRGBString({ ...hslPercentage.value, hue: 1 })}))`;
  }
  if (type !== "saturation") {
    gradients.saturation = `linear-gradient(to right, rgb(${generateRGBString({
      ...hslPercentage.value,
      saturation: 0,
    })}), rgb(${generateRGBString({
      ...hslPercentage.value,
      saturation: 1,
    })}))`;
  }
  if (type !== "lightness") {
    gradients.lightness = `linear-gradient(to right, rgb(${generateRGBString({
      ...hslPercentage.value,
      lightness: 0.05,
    })}), rgb(${generateRGBString({
      ...hslPercentage.value,
      lightness: 0.95,
    })}))`;
  }
};

const store = useGradientsStore();
const sendCustomData = (): void => {
  const internal = 0.3;
  const data: HSLInfo = {
    hue: {
      min: hslPercentage.value.hue - internal,
      max: hslPercentage.value.hue + internal,
    },
    saturation: {
      min: hslPercentage.value.saturation - internal,
      max: hslPercentage.value.saturation + internal,
    },
    lightness: {
      min: hslPercentage.value.lightness - internal,
      max: hslPercentage.value.lightness + internal,
    },
  };
  store.setData(data);
  emit("dataUpdated");
};
</script>

<template>
  <el-dialog
    :lock-scroll="false"
    :show-close="false"
    :style="{ '--el-dialog-bg-color': 'var(--color-dialog-background)' }"
    top="30vh"
    width="100%"
    v-model="visible"
  >
    <color-range
      title="Hue"
      :max="360"
      :value="hsl.hue"
      :gradients="gradients.hue"
      @update:value="
        hsl.hue = $event;
        colorsChanged('hue');
      "
    ></color-range>
    <color-range
      title="Saturation"
      :value="hsl.saturation"
      :gradients="gradients.saturation"
      @update:value="
        hsl.saturation = $event;
        colorsChanged('saturation');
      "
    ></color-range>
    <color-range
      title="Lightness"
      :value="hsl.lightness"
      :gradients="gradients.lightness"
      @update:value="
        hsl.lightness = $event;
        colorsChanged('lightness');
      "
    ></color-range>
    <div class="btn-line flex-between">
      <kazi-btn @click="initDefaultGradients">RESET</kazi-btn>
      <kazi-btn @click="sendCustomData" class="primary">GENERATE</kazi-btn>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">
.btn-line {
  margin-top: 2rem;
}
</style>
<style lang="scss">
.el-overlay {
  background-color: rgba(0, 0, 0, 0.1) !important;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(1px);
}

.el-dialog {
  background-color: var(--color-dialog-background);
  max-width: 56rem;
  border-radius: 16px !important;

  .el-dialog__header {
    padding: 8px;
  }

  .el-dialog__body {
    color: var(--color-text);
    padding: 1.2rem 1.2rem 2.4rem;
  }
}
</style>
