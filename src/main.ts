import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "virtual:svg-icons-register";

import App from "./App.vue";
import router from "./router";
import Btn from "@/components/Button/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

import "element-plus/dist/index.css";
import "./assets/main.scss";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.component("svg-icon", SvgIcon);
app.component("kazi-btn", Btn);
app.use(createPinia());
app.use(router);
app.use(ElementPlus, { size: "medium", zIndex: 3000 });

app.mount("#kazi");
