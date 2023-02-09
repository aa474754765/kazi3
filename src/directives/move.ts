import type { Directive, DirectiveBinding } from "vue";

const vMove: Directive = {
  beforeUpdate: (el: HTMLElement) => {
    el.dataset.info = JSON.stringify(el.getBoundingClientRect());
    el.style.transition = "unset";
  },
  updated: (el: HTMLElement, binding?: DirectiveBinding) => {
    //origin positon info
    const { top, left, width } = JSON.parse(el.dataset.info as string);
    //current positon info
    const { top2, left2 } = {
      top2: el.getBoundingClientRect().top,
      left2: el.getBoundingClientRect().left,
    };
    el.style.width = `${width}px`;
    el.style.paddingTop = `${width}px`;
    el.style.transform =
      `translateX(${left - left2}px) ` + `translateY(${top - top2}px)`;
    setTimeout(() => {
      el.style.transition = `all ${
        (binding?.value || 500) / 1000
      }s ease-in-out`;
      el.style.width = `100%`;
      el.style.paddingTop = `100%`;
      el.style.transform = "unset";
    }, 0);
  },
};

export default vMove;
