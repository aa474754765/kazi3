<script setup lang="ts">
import { debounce } from "lodash";
import { onMounted, onUnmounted, ref } from "vue";
import GradientsBox from "@/components/GradientsBox/index.vue";
import CustomizeDialog from "@/components/CustomizeDialog/index.vue";
import type { BoxInfo, GradientsType } from "@/types";
import { useGradientsStore } from "@/stores/gradients";
import { randowArr } from "@/utils";
import { randomDeg, generateRandomRGBByType } from "@/utils/transformers";

const gradientType = ref<GradientsType>("STRONG");
const gradients = ref<BoxInfo[]>([]);
const store = useGradientsStore();

const getRandomBoxs = (type: GradientsType, length: number): BoxInfo[] => {
  const customData = type === "CUSTOMIZE" ? store.customizeData : undefined;
  return randowArr(length).map(() => ({
    deg: randomDeg(),
    colors: [
      generateRandomRGBByType(type, customData),
      generateRandomRGBByType(type, customData),
    ],
  }));
};
// when scroll to the bottom, it should add the new gradients to the last
const loadNewGradients = () => {
  let viewHeight = document.documentElement.clientHeight;
  let offsetHeight = document.documentElement.offsetHeight;
  let scrollTop = document.documentElement.scrollTop;

  if (viewHeight + scrollTop + 300 > offsetHeight) {
    gradients.value = gradients.value.concat(
      getRandomBoxs(gradientType.value, 8)
    );
  }
};
const changeGradientType = (type: GradientsType): void => {
  gradientType.value = type;
  gradients.value = getRandomBoxs(type, 16);
};
const onscroll = debounce(loadNewGradients, 200);

onMounted(() => {
  changeGradientType(gradientType.value);
  window.document.addEventListener("scroll", onscroll);
});
onUnmounted(() => {
  window.document.removeEventListener("scroll", onscroll);
});

//customize part
const modalVisible = ref(false);
const openCustumizeDialog = (): void => {
  modalVisible.value = true;
};
</script>
<template>
  <h1>Generate your gradients</h1>
  <el-row class="flex-center">
    <kazi-btn
      @click="changeGradientType('STRONG')"
      :active="gradientType === 'STRONG'"
      >STRONG</kazi-btn
    >
    <kazi-btn
      @click="changeGradientType('PASTEL')"
      :active="gradientType === 'PASTEL'"
      >PASTEL</kazi-btn
    >
    <kazi-btn
      @click="changeGradientType('COOL')"
      :active="gradientType === 'COOL'"
      >COOL</kazi-btn
    >
    <kazi-btn
      @click="changeGradientType('BRIGHT')"
      :active="gradientType === 'BRIGHT'"
      >BRIGHT</kazi-btn
    >
    <kazi-btn
      @click="openCustumizeDialog"
      :active="gradientType === 'CUSTOMIZE'"
    >
      CUSTOMIZE</kazi-btn
    >
  </el-row>
  <el-row :gutter="32">
    <el-col
      :xs="24"
      :sm="12"
      :md="8"
      :lg="6"
      :xl="6"
      v-for="info in gradients"
      :key="info.colors"
    >
      <GradientsBox :info="info" class="grid-content" />
    </el-col>
  </el-row>
  <KeepAlive>
    <customize-dialog
      @data-updated="changeGradientType('CUSTOMIZE')"
      v-model:visible="modalVisible"
    ></customize-dialog>
  </KeepAlive>
</template>

<style scoped lang="scss">
.el-row {
  margin-bottom: 2.4rem;

  button {
    margin-right: 1.2rem;
  }
}

.el-col {
  border-radius: 4px;
  margin-bottom: 3.2rem;
}

.grid-content {
  position: relative;
  border-radius: 1rem;
  min-height: 20rem;
}
</style>
