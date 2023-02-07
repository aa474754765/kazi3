<script setup lang="ts">
import { computed, type CSSProperties, onMounted } from "vue";
import type { BoxInfo } from "@/types";
import { useShare } from "@/components/share";

const { isStar, setStarStatus, star, unStar, downloadHtml } = useShare();

interface Props {
  info?: BoxInfo;
}
const props = withDefaults(defineProps<Props>(), {
  info: () => ({ deg: 0, colors: [] }),
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

const like = (): void => {
  if (isStar.value === false) {
    star(props.info);
  } else {
    unStar(props.info);
    emit("unstar");
  }
};
</script>
<template>
  <div :style="elStyle" class="gradients-box" :class="{ star: isStar }">
    <el-icon color="white" size="28" @click.stop="download">
      <Download />
    </el-icon>
    <svg-icon
      class="like-icon"
      @click.stop="like"
      :class="{ like: isStar }"
      name="heart"
    ></svg-icon>
  </div>
</template>

<style scoped lang="scss">
.el-icon {
  display: none;
  position: absolute;
  cursor: pointer;
  right: 1.2rem;
  top: 0.8rem;

  &:hover {
    animation: star 0.3s;
    transform: scale(1.2);
  }
}

.gradients-box {
  width: 100%;
  padding-top: 100%;
  position: relative;
  border-radius: 1rem;
  margin: 1.6rem 0;
  cursor: pointer;
}

.gradients-box.overview-mode:hover .el-icon,
.gradients-box.overview-mode.star .like-icon,
.gradients-box.overview-mode:hover .like-icon {
  display: unset;
}

@keyframes star {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.2);
  }
}

.like-icon {
  display: none;
  position: absolute;
  width: 25%;
  height: 25%;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  color: #ffffff;

  &.like {
    color: var(--like-color);
    transform: translateX(-50%) translateY(-50%) scale(1.1);
    filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 0.2));
  }

  &:not(.like):hover {
    color: var(--like-color);
    transform: translateX(-50%) translateY(-50%) scale(1.1);
    animation: like 0.5s ease-in-out;
    filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 0.2));
  }
}

@keyframes like {
  0% {
    color: #ffffff;
    transform: translateX(-50%) translateY(-50%) scale(1);
  }

  100% {
    color: var(--like-color);
    transform: translateX(-50%) translateY(-50%) scale(1.1);
  }
}
</style>
