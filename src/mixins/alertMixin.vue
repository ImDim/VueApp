<script>
import { pageEvents } from "@/events.js";

export default {
  data: () => ({
    alertVisible: false,
    alertMessage: "",
    alertType: "success",
    alertTimeoutId: null,
    alertTimeout: 3000,
  }),

  methods: {
    // Показываем и прячем уведомление
    showAlert(options = {}) {
      const { message, type } = options;

      this.alertVisible = true;
      this.alertMessage = message || "";
      this.alertType = type || this.alertType;

      clearTimeout(this.alertTimeoutId);

      this.alertTimeoutId = setTimeout(() => {
        this.alertVisible = false;
      }, this.alertTimeout);
    },
  },

  created() {
    pageEvents.$on("show-alert", this.showAlert);
  },

  beforeDestroy() {
    pageEvents.$off("show-alert", this.showAlert);
  },
};
</script>

<style scoped lang="scss">
.app-alert-wrapper {
  position: fixed;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .app-alert {
    max-width: 600px;
  }
}
</style>