import type { Directive, DirectiveBinding } from "vue";

const vTouch: Directive = {
  mounted(el: HTMLElement, bindings: DirectiveBinding): void {
    el.ontouchstart = (e: TouchEvent) => {
      const offsetX = e.touches[0].clientX - el.offsetLeft;
      const offsetY = e.touches[0].clientY - el.offsetTop;
      const containerWidth = (el.parentElement as HTMLElement).clientWidth;
      const containerHeight = (el.parentElement as HTMLElement).clientHeight;
      document.ontouchmove = (e: TouchEvent) => {
        if (bindings.modifiers.preventColor) {
          (
            el.querySelector(".el-color-picker__trigger") as HTMLElement
          ).style.pointerEvents = "none";
        }
        let left = bindings.modifiers.preventX
          ? el.offsetLeft
          : e.touches[0].clientX - offsetX;
        let top = bindings.modifiers.preventY
          ? el.offsetTop
          : e.touches[0].clientY - offsetY;
        if (left < 0) {
          left = 0;
        } else if (left + el.clientWidth > containerWidth) {
          left = containerWidth - el.clientWidth;
        }
        if (top < 0) {
          top = 0;
        } else if (top + el.clientHeight > containerHeight) {
          top = containerHeight - el.clientHeight;
        }
        el.style.left = (left * 100) / containerWidth + "%";
        el.style.top = (top * 100) / containerHeight + "%";
        el.style.zIndex = "999";

        //calculate the left percentage and set in attribute for ease compute
        const percentX = (left / (containerWidth - el.clientWidth)) * 100 + "";
        el.setAttribute("per", percentX);
      };
      document.ontouchend = () => {
        if (bindings.modifiers.preventColor) {
          (
            el.querySelector(".el-color-picker__trigger") as HTMLElement
          ).style.pointerEvents = "auto";
        }
        document.ontouchmove = null;
        document.ontouchstart = null;
        el.style.zIndex = "auto";
      };
    };
  },
  beforeUnmount(el: HTMLElement): void {
    el.ontouchend = null;
  },
};
export default vTouch;
