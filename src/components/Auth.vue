<template>
  <div :class="b()">
    <div class="d-flex align-center justify-center mb-10">
      <v-icon color="red" :class="b('icon')" dark> mdi-fire </v-icon>
    </div>
    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="username"
        :rules="[(v) => !!v || 'Введите логин']"
        label="Логин"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="passFieldShow ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="passFieldShow ? 'text' : 'password'"
        name="password"
        label="Введите пароль"
        hint="Не менее 4 симвлов и не более 10"
        counter
        @click:append="passFieldShow = !passFieldShow"
        class="mt-2"
      ></v-text-field>

      <vue-recaptcha
        ref="recaptcha"
        :class="b('recaptcha')"
        :sitekey="recaptchaKey"
        @verify="verifyRecaptcha"
        @expired="onCaptchaExpired"
      />

      <v-btn
        depressed
        block
        large
        :disabled="false && !recaptchaToken"
        color="primary"
        class="mt-4"
        @click="logIn"
      >
        Войти
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import API from "@/api";
import formMixin from "@/mixins/formMixin.vue";
import authMixin from "@/mixins/authMixin.vue";
import VueRecaptcha from "vue-recaptcha";

export default {
  name: "auth",
  mixins: [formMixin, authMixin],

  components: { VueRecaptcha },

  data: () => ({
    username: null,
    password: "",
    passFieldShow: false,
    rules: {
      required: (value) => !!value || "Обязательно",
      min: (v) => v.length >= 4 || "Минимум 4 символа",
    },
    recaptchaToken: "",
  }),

  computed: {
    recaptchaKey() {
      return process.env.VUE_APP_RECAPTCHA_KEY;
    },
  },

  methods: {
    verifyRecaptcha(recaptchaToken) {
      this.recaptchaToken = recaptchaToken;
    },

    async logIn() {
      try {
        const response = await API.auth.login({
          username: this.username,
          password: this.password,
          recaptchaToken: this.recaptchaToken,
        });

        console.info(response);

        const { data } = response;

        localStorage.setItem("username", this.username);
        localStorage.setItem("authToken", data.token);

        this.$router.push({ name: "posts" });
      } catch (error) {
        console.info(error);
        this.onResponseError(error);
        return;
      }
    },

    onCaptchaExpired() {
      this.$refs.recaptcha.reset();
    },
  },

  created() {
    if (this.isLogged) {
      this.$router.push({ name: "posts" });
      return;
    }
  },
};
</script>

<style lang="scss" scoped>
.auth {
  position: relative;
  top: 200px;
  width: 400px;
  margin: 0 auto;
  padding: 25px;
  border: 1px solid #ececec;
  border-radius: 4px;
  box-shadow: 0px 10px 14px 0px rgb(1 1 1 / 5%);

  &__icon {
    font-size: 80px;
  }

  &__recaptcha {
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
  }
}
</style>