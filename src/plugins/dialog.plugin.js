import {
  pageEvents
} from "@/events.js";

export default {
  install(Vue) {
    // Плагин диалога на промисах
    // Через шину слушаем обработчик
    Vue.prototype.$dialog = function (options) {
      pageEvents.$emit("open-dialog", options);

      return new Promise((resolve, reject) => {
        pageEvents.$on("confirm-dialog", resolve);
        pageEvents.$on("cancel-dialog", reject);
      });
    }
  }
}