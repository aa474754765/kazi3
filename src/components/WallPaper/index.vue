<script setup lang="ts">
import { computed } from "vue";
import type { WallpaperInfo } from "@/types";
import vDrag from "@/directives/drag";

const props = defineProps<{ data: WallpaperInfo }>();

const backGroundImage = computed<string>(() => {
  const gradients = props.data.bgImage.map(
    (bg) =>
      `linear-gradient(${bg.deg}deg, ${bg.colors
        .map((c) => c.text + " " + c.percentage + "%")
        .join(", ")})`
  );
  return gradients.join(",");
});
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
  padding-top: 60%;
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
