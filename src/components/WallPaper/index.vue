<script setup lang="ts">
import { ref, watch } from "vue";
import type { WallpaperInfo } from "@/types";
import vDrag from "@/directives/drag";
import vTouch from "@/directives/touch";
import EventBus from "@/utils/eventBus";

const props = defineProps<{ data: WallpaperInfo }>();

const backGroundImage = ref("");
watch(
  props.data.bgImage,
  (value) => {
    backGroundImage.value = value
      .map(
        (bg) =>
          `linear-gradient(${bg.deg}deg, ${bg.colors
            .map((c) => c.text + " " + c.percentage + "%")
            .join(", ")})`
      )
      .join(",");
  },
  { immediate: true }
);

const textClicked = (id: string) => {
  EventBus.emit("text", id);
};
</script>

<template>
  <div
    :style="{
      'background-image': backGroundImage,
      '--default-size': '16px',
    }"
    id="kazi-wallpaper"
    class="kazi-wallpaper scale-enter-active"
  >
    <a
      v-for="t in props.data.texts"
      @click="textClicked(t.id)"
      :key="t.text"
      :style="{
        fontFamily: t.font,
        fontSize: t.size + 'px',
        rotate: t.rotate + 'deg',
        color: t.color,
      }"
      v-drag
      v-touch
      >{{ t.text }}</a
    >
  </div>
</template>

<style scoped lang="scss">
.kazi-wallpaper {
  position: relative;
  font-size: var(--default-size);
  width: 100%;
  height: 0;
  margin-bottom: 2rem;
  padding-top: 56.25%;
  border-radius: 2rem;
  background-blend-mode: overlay;
  overflow: hidden;

  &.fullscreen {
    border-radius: 0;
  }
}

.paper {
  position: absolute;
  width: 100%;
  height: 100%;
  mix-blend-mode: color;
}

a {
  box-sizing: content-box;
  cursor: pointer;
  position: absolute;
  color: red;
  top: 0;
  left: 0;
  transform-origin: center center;
}
</style>
