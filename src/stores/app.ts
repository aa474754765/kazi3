import { computed } from "vue";
import { useBreakpoints } from "@vueuse/core";
import { createGlobalState } from "@vueuse/core";

export const useGlobalState = createGlobalState(() => {
  const breakpoints = useBreakpoints({
    phone: 640,
    tablet: 768,
    laptop: 1024,
    desktop: 1280,
  });
  const phone = breakpoints.smaller("phone");
  const device = computed(() => {
    return phone.value ? "mobile" : "desktop";
  });

  return { device };
});
