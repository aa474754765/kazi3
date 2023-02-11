<script setup lang="ts">
import { ref, watch } from "vue";
import type { WallpaperInfo } from "@/types";
import vDrag from "@/directives/drag";

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
</script>

<template>
  <div
    :style="{ 'background-image': backGroundImage }"
    id="kazi-wallpaper"
    class="kazi-wallpaper"
  >
    <a
      v-for="t in data.texts"
      :key="t.text"
      :style="{
        fontFamily: t.font,
        fontSize: t.size + 'px',
        rotate: t.rotate + 'deg',
        color: t.color,
      }"
      v-drag
      >{{ t.text }}</a
    >
  </div>
</template>

<style scoped lang="scss">
.kazi-wallpaper {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  border-radius: 2rem;
  background-blend-mode: overlay;
  overflow: hidden;
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
  transform-origin: 0% 0%;
}
</style>
