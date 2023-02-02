<script setup lang="ts">
import { debounce } from "lodash";
import { onMounted, onUnmounted, ref } from "vue";
import GradientsBox from "@/components/GradientsBox/index.vue";
import Btn from "@/components/Button/index.vue";
import type { GradientsType } from "@/types";
import { randowArr } from "@/utils";

const gradientType = ref<GradientsType>("PASTEL");
const gradients = ref(randowArr(16));
// when scroll to the bottom, it should add the new gradients to the last
const loadNewGradients = () => {
  let viewHeight = document.documentElement.clientHeight;
  let offsetHeight = document.documentElement.offsetHeight;
  let scrollTop = document.documentElement.scrollTop;

  if (viewHeight + scrollTop + 300 > offsetHeight) {
    gradients.value = gradients.value.concat(randowArr(8));
  }
};
const onscroll = debounce(loadNewGradients, 200);
onMounted(() => {
  window.document.addEventListener("scroll", onscroll);
});
onUnmounted(() => {
  window.document.removeEventListener("scroll", onscroll);
});

function changeGradientType(type: GradientsType) {
  gradients.value = randowArr(16);
  gradientType.value = type;
}
</script>
<template>
  <h1>Generate your gradients</h1>
  <el-row>
    <btn
      gradients-type="PASTEL"
      @click="changeGradientType('PASTEL')"
      :active="gradientType === 'PASTEL'"
      >PASTEL</btn
    >
    <btn
      gradients-type="COOL"
      @click="changeGradientType('COOL')"
      :active="gradientType === 'COOL'"
      >COOL</btn
    >
    <btn
      gradients-type="STRONG"
      @click="changeGradientType('STRONG')"
      :active="gradientType === 'STRONG'"
      >STRONG</btn
    >
    <btn
      gradients-type="BRIGHT"
      @click="changeGradientType('BRIGHT')"
      :active="gradientType === 'BRIGHT'"
      >BRIGHT</btn
    >
    <btn
      gradients-type="CUSTOMIZE"
      @click="changeGradientType('CUSTOMIZE')"
      :active="gradientType === 'CUSTOMIZE'"
    >
      CUSTOMIZE</btn
    >
  </el-row>
  <el-row :gutter="32">
    <el-col
      :xs="24"
      :sm="12"
      :md="8"
      :lg="6"
      :xl="6"
      v-for="i in gradients"
      :key="i"
    >
      <GradientsBox :type="gradientType" class="grid-content" />
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
h1 {
  text-align: center;
  margin: 2.4rem 0;
  opacity: 0.7;
}

.el-row {
  margin-bottom: 2.4rem;
  justify-content: center;

  button {
    margin-right: 1.2rem;
  }
}

.el-col {
  border-radius: 4px;
  margin-bottom: 3.2rem;
}

.grid-content {
  border-radius: 1rem;
  min-height: 20rem;
}
</style>
