<script>
import { pageEvents } from "@/events.js";

export default {
  methods: {
    // Показываем ошибки с сервера
    onResponseError({ response }) {
      const message = response?.data?.message;

      pageEvents.$emit("show-alert", {
        message,
        type: "error",
      });
    },

    // Кастомное уведомление
    responseNotify(options = {}) {
      const { message, type } = options;

      pageEvents.$emit("show-alert", {
        message,
        type,
      });
    },
  },
};
</script>