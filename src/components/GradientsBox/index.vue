<script setup lang="ts">
import { computed, type CSSProperties, ref } from "vue";
import type { BoxInfo } from "@/types";
import { Storager, starKey } from "@/utils/storage";

interface Props {
  starred?: boolean;
  info?: BoxInfo;
}
const props = withDefaults(defineProps<Props>(), {
  starred: false,
  info: () => ({ deg: 0, colors: [] }),
});
const emit = defineEmits<{
  (e: "unstar"): void;
}>();

const elStyle = computed((): CSSProperties => {
  const colors = props.info.colors.map(
    (i) => `rgb(` + Object.values(i).join(",") + ")"
  );
  return {
    "background-image": `linear-gradient(${props.info.deg}deg, ${colors})`,
  };
});

const starred = ref(props.starred);
const star = () => {
  starred.value = true;
  Storager.add(starKey, { value: props.info });
};
const unStar = () => {
  starred.value = false;
  Storager.remove(starKey, { value: props.info });
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
.gradients-box {
  width: 100%;
  padding-top: 100%;
  position: relative;
  border-radius: 1rem;
  margin-bottom: 3.2rem;
}
.gradients-box:not(.preview-mode).star .el-icon,
.gradients-box:not(.preview-mode):hover .el-icon {
  display: unset;
}

@keyframes star {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
