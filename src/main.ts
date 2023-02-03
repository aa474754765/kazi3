import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";

import App from "./App.vue";
import router from "./router";
import Btn from "@/components/Button/index.vue";

import "./assets/main.scss";
import "element-plus/dist/index.css";

const app = createApp(App);

app.component("kazi-btn", Btn);
app.use(createPinia());
app.use(router);
app.use(ElementPlus, { size: "medium", zIndex: 3000 });

app.mount("#kazi");
