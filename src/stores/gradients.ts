import { ref } from "vue";
import { defineStore } from "pinia";
import type { HSLInfo } from "@/types";

export const useGradientsStore = defineStore("gradients", () => {
  const customizeData = ref<HSLInfo | undefined>(undefined);
  function setData(data: HSLInfo) {
    customizeData.value = data;
  }

  return { customizeData, setData };
});
