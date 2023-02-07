import type { BoxInfo } from "@/types";
import { starKey, Storager } from "@/utils/storage";
import { ref } from "vue";

export function useShare() {
  const isStar = ref(false);

  const setStarStatus = (info: BoxInfo): void => {
    const storeData = Storager.get<BoxInfo>(starKey);
    isStar.value = !!storeData.find(
      (i) => JSON.stringify(i.value) === JSON.stringify(info)
    );
  };
  const star = (info: BoxInfo): void => {
    isStar.value = true;
    Storager.add(starKey, { value: info });
  };
  const unStar = (info: BoxInfo): void => {
    isStar.value = false;
    Storager.remove(starKey, { value: info });
  };

  return {
    isStar,
    setStarStatus,
    star,
    unStar,
  };
}
