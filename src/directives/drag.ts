import type { Directive, DirectiveBinding } from "vue";

const vDrag: Directive = {
  mounted(el: HTMLElement, bindings: DirectiveBinding): void {
    el.onmousedown = (e: MouseEvent) => {
      const offsetX = e.clientX - el.offsetLeft;
      const offsetY = e.clientY - el.offsetTop;
      const containerWidth = (el.parentElement as HTMLElement).clientWidth;
      const containerHeight = (el.parentElement as HTMLElement).clientHeight;
      document.onmousemove = (e) => {
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
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  },
  beforeUnmount(el: HTMLElement): void {
    el.onmousedown = null;
  },
};
export default vDrag;
