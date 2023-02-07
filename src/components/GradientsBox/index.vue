<script setup lang="ts">
import { computed, type CSSProperties, onMounted } from "vue";
import type { BoxInfo } from "@/types";
import { useShare } from "@/components/share";

const { isStar, setStarStatus, star, unStar, downloadHtml } = useShare();

interface Props {
  info?: BoxInfo;
  showTools?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  info: () => ({ deg: 0, colors: [] }),
  showTools: true,
});
const emit = defineEmits<{
  (e: "unstar"): void;
}>();

const elStyle = computed((): CSSProperties => {
  return {
    "background-image": `linear-gradient(${
      props.info.deg
    }deg, ${props.info.colors.join(",")})`,
  };
});

onMounted(() => {
  setStarStatus(props.info);
});

const download = () => {
  const target = document.createElement("div");
  target.style.width = "1920px";
  target.style.height = "1200px";
  target.style.backgroundImage = elStyle.value["background-image"] as string;
  downloadHtml(target);
};
</script>
<template>
  <div :style="elStyle" class="gradients-box" :class="{ star: isStar }">
    <el-icon
      v-if="props.showTools"
      color="white"
      size="24"
      class="download-icon"
      @click.stop="download"
    >
      <Download />
    </el-icon>
    <el-icon color="white" size="24" class="star-icon">
      <Star v-if="!isStar" @click.stop="star(info)" />
      <StarFilled v-else @click.stop="unStar(info), emit('unstar')" />
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
.download-icon {
  right: 4.8rem;
}
.gradients-box {
  width: 100%;
  padding-top: 100%;
  position: relative;
  border-radius: 1rem;
  margin: 1.6rem 0;
  cursor: pointer;
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
