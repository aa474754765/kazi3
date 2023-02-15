import { ElNotification } from "element-plus";
import { useClipboard } from "@vueuse/core";
import type { BoxInfo } from "@/types";
import { starKey, Storager } from "@/utils/storage";
import { ref } from "vue";

declare const html2canvas: any;

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

  const notify = (message: string) => {
    ElNotification({
      message: message,
      type: "success",
      duration: 2000,
    });
  };

  const { copy } = useClipboard();
  const copyText = (text: string) => {
    copy(text);
    notify("Copy Success");
  };

  const downJpgByCanvas = (canvas: HTMLCanvasElement) => {
    const oA = document.createElement("a");
    const time = new Date().getTime();
    oA.download = "img_" + time + ".jpg";
    oA.href = canvas.toDataURL("image/jpeg");
    document.body.appendChild(oA);
    oA.click();
    oA.remove();
  };

  const downloadHtml = (target: HTMLElement) => {
    document.body.append(target);
    html2canvas(target, { scale: 4 }).then(
      (canvas: HTMLCanvasElement): void => {
        downJpgByCanvas(canvas);
        target.remove();
      }
    );
  };

  return {
    isStar,
    setStarStatus,
    star,
    unStar,
    notify,
    copyText,
    downloadHtml,
  };
}
