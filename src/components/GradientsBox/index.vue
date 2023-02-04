<script setup lang="ts">
import { computed, type CSSProperties, ref } from "vue";
import { randomDeg, generateRandomRGBByType } from "@/utils/transformers";
import type { GradientsType } from "@/types";
import { Storager, starKey } from "@/utils/storage";
import { useGradientsStore } from "@/stores/gradients";

interface Props {
  type?: GradientsType;
  gradients?: string;
  starred?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  type: "COOL",
  gradients: "",
  starred: false,
});
const emit = defineEmits<{
  (e: "unstar"): void;
}>();

const store = useGradientsStore();
const elStyle = computed((): CSSProperties => {
  return {
    "background-image":
      props.gradients ||
      `linear-gradient(${randomDeg()}deg, rgb(${generateRandomRGBByType(
        props.type,
        store.customizeData
      )}), rgb(${generateRandomRGBByType(props.type, store.customizeData)}))`,
  };
});

const starred = ref(props.starred);
const star = () => {
  starred.value = true;
  Storager.add(starKey, { value: elStyle.value["background-image"] });
};
const unStar = () => {
  starred.value = false;
  Storager.remove(starKey, { value: elStyle.value["background-image"] });
  emit("unstar");
};
</script>
<template>
  <div :style="elStyle" class="gradients-box" :class="{ star: starred }">
    <el-icon color="white" size="36">
      <Star v-if="!starred" @click="star" />
      <StarFilled v-else @click="unStar" />
    </el-icon>
  </div>
</template>

<style scoped lang="scss">
.el-icon {
  display: none;
  position: absolute;
  cursor: pointer;
  right: 1.2rem;
  top: 0.8rem;
  animation: star 0.5s;

  &:hover {
    transform: scale(1.1);
  }
}
.gradients-box.star .el-icon,
.gradients-box:hover .el-icon {
  display: unset;
}

@keyframes star {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
