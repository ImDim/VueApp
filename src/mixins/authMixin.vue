<script>
import formMixin from "@/mixins/formMixin.vue";

export default {
  mixins: [formMixin],

  computed: {
    // Авторизован ли пользователь
    isLogged() {
      return (
        !!localStorage.getItem("username") &&
        !!localStorage.getItem("authToken")
      );
    },

    // Обьект с информацией о пользователе
    userData() {
      return {
        username: localStorage.getItem("username"),
      };
    },
  },

  methods: {
    logOut() {
      localStorage.removeItem("username");
      localStorage.removeItem("authToken");
      this.$router.go();
    },
  },
};
</script>