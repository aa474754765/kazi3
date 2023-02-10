import type { Directive, DirectiveBinding } from "vue";

const vDrag: Directive = {
  mounted(el: HTMLElement, bindings: DirectiveBinding): void {
    el.onmousedown = (e: MouseEvent) => {
      const offsetX = e.clientX - el.offsetLeft;
      const offsetY = e.clientY - el.offsetTop;
      const containerWidth = (el.parentElement as HTMLElement).clientWidth;
      const containerHeight = (el.parentElement as HTMLElement).clientHeight;
      document.onmousemove = (e) => {
        if (bindings.modifiers.preventColor) {
          (
            el.querySelector(".el-color-picker__trigger") as HTMLElement
          ).style.pointerEvents = "none";
        }
        let left = bindings.modifiers.preventX
          ? el.offsetLeft
          : e.clientX - offsetX;
        let top = bindings.modifiers.preventY
          ? el.offsetTop
          : e.clientY - offsetY;
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
        el.style.left = left + "px";
        el.style.top = top + "px";
        el.style.zIndex = "999";

        //calculate the left percentage and set in attribute for ease compute
        const percentX =
          (left /
            ((el.parentElement as HTMLElement).clientWidth - el.clientWidth)) *
            100 +
          "";
        el.setAttribute("per", percentX);
      };
      document.onmouseup = () => {
        if (bindings.modifiers.preventColor) {
          (
            el.querySelector(".el-color-picker__trigger") as HTMLElement
          ).style.pointerEvents = "auto";
        }
        document.onmousemove = null;
        document.onmouseup = null;
        el.style.zIndex = "auto";
      };
    };
  },
  beforeUnmount(el: HTMLElement): void {
    el.onmousedown = null;
  },
};
export default vDrag;
