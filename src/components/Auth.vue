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
        v-if="!isAuth"
        v-model="email"
        :rules="[emailValidate]"
        label="Email"
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

      <v-text-field
        v-if="!isAuth"
        v-model="repeatPassword"
        :append-icon="passFieldShow ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min, comparePass]"
        :type="passFieldShow ? 'text' : 'password'"
        name="repeatPassword"
        label="Повторите пароль"
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

      <div
        :class="[
          b('footer'),
          'd-flex',
          'justify-center',
          'align-center',
          'mt-4',
        ]"
      >
        <template v-if="isAuth">
          <div class="mr-2">Нет аккаунта?</div>
          <a href="#" @click.prevent="changeFormType">Зарегистрироваться</a>
        </template>
        <template v-else>
          <div class="mr-2">Уже зарегистрированы?</div>
          <a href="#" @click.prevent="changeFormType">Авторизация</a>
        </template>
      </div>
    </v-form>
  </div>
</template>

<script>
import AUTH_API from "@api/auth.ts";
import formMixin from "@/mixins/formMixin.vue";
import authMixin from "@/mixins/authMixin.vue";
import VueRecaptcha from "vue-recaptcha";

export default {
  name: "auth",
  mixins: [formMixin, authMixin],

  components: { VueRecaptcha },

  data: () => ({
    cardType: "auth",
    username: null,
    email: null,
    password: "",
    repeatPassword: "",
    passFieldShow: false,
    recaptchaToken: "",
    rules: {
      required: (value) => !!value || "Обязательно",
      min: (value) => value.length >= 4 || "Минимум 4 символа",
    },
  }),

  computed: {
    isAuth() {
      return this.cardType === "auth";
    },

    recaptchaKey() {
      return process.env.VUE_APP_RECAPTCHA_KEY;
    },
  },

  methods: {
    changeFormType() {
      this.cardType = this.cardType === "auth" ? "reg" : "auth";
    },

    comparePass(value) {
      return value === this.password || "Пароли не совпадают";
    },

    emailValidate(value) {
      var reg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return reg.test(value) || "Введите корректный e-mail";
    },

    verifyRecaptcha(recaptchaToken) {
      this.recaptchaToken = recaptchaToken;
    },

    async logIn() {
      if (!this.comparePass(this.repeatPassword)) {
        this.responseNotify({
          message: "Пароли не совпадают!",
          type: "error",
        });

        return;
      }

      const API_METHOD = this.isAuth ? "login" : "registration";

      try {
        const response = await AUTH_API[API_METHOD]({
          username: this.username,
          password: this.password,
          email: this.email,
          recaptchaToken: this.recaptchaToken,
        });

        const { data } = response;

        localStorage.setItem("username", this.username);
        localStorage.setItem("authToken", data.token);

        this.$router.push({ name: "posts" });
      } catch (error) {
        console.info(error);
        this.onResponseError(error);
        this.$refs.recaptcha.reset();
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
  width: 360px;
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