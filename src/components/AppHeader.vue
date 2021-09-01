<template>
  <v-app-bar app dark :class="b()">
    <div :class="[b('inner'), 'dx-auto d-flex align-center']">
      <div class="d-flex align-center">
        <div class="d-flex align-center mr-2">
          <v-icon color="red" large dark> mdi-fire </v-icon>
        </div>

        <v-btn to="/posts" small text class="ml-4"> Записи </v-btn>

        <v-btn to="/add" small text class="ml-4"> Добавить </v-btn>
      </div>

      <div class="d-flex align-center ml-auto">
        <template v-if="isLogged">
          <v-btn small depressed color="primary">
            <v-icon left dark small> mdi-account </v-icon>
            {{ userData.username }}
          </v-btn>
          <v-btn small text class="ml-4" @click="logOut">
            Выйти
            <v-icon right dark small> mdi-logout </v-icon>
          </v-btn>
        </template>

        <v-btn to="/auth" small text class="ml-4" v-else>
          <v-icon left dark small> mdi-account </v-icon>
          Авторизация
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import authMixin from "@/mixins/authMixin.vue";

export default {
  name: "app-header",
  components: {},
  mixins: [authMixin],

  data: () => ({}),

  methods: {},
};
</script>

<style lang="scss" scoped>
.app-header {
  &__inner {
    width: 700px;
    margin: 0 auto;
  }
}
</style>