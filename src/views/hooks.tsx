
import { debounce } from "lodash";
import { onMounted, onUnmounted, ref } from "vue";
import type { BoxInfo, GradientsType, ViewMode } from "@/types";
import { useGradientsStore } from "@/stores/gradients";
import { randowArr } from "@/utils";
import { randomDeg, generateRandomRGBByType } from "@/utils/transformers";

export function useView() {
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
    const viewHeight = document.documentElement.clientHeight;
    const offsetHeight = document.documentElement.offsetHeight;
    const scrollTop = document.documentElement.scrollTop;

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

  // preview mode <--> overview mode
  const viewMode = ref<ViewMode>("overview");
  const changeMode = () => {
    viewMode.value = viewMode.value === "overview" ? "preview" : "overview";
  };

  return {
    gradientType,
    gradients,
    loadNewGradients,
    changeGradientType,
    viewMode,
    changeMode,
  };
}
