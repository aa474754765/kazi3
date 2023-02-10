import type { DirectiveBinding } from "vue";

const vInit = {
  mounted: (el: HTMLElement, bindings: DirectiveBinding) => {
    const defaultLeft =
      (((el.parentElement as HTMLElement).clientWidth - el.clientWidth) / 100) *
      bindings.value;
    el.style.left = defaultLeft + "px";
  },
};

export default vInit;
