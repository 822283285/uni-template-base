import { createSSRApp } from "vue";
import router from './router'
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  app.use(router)
  return {
    app,
  };
}
