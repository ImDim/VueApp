<template>
  <v-app>
    <app-header />

    <v-main>
      <router-view />
    </v-main>

    <ui-dialog />

    <div class="app-alert-wrapper">
      <v-alert
        v-if="alertVisible"
        transition="fade-transition"
        dense
        class="app-alert"
        :type="alertType"
        >{{ alertMessage }}</v-alert
      >
    </div>
  </v-app>
</template>

<script>
import alertMixin from "@/mixins/alertMixin.vue";
import uiDialog from "@/components/UI/ui-dialog.vue";
import appHeader from "@/components/AppHeader.vue";

export default {
  name: "Main",
  components: {
    uiDialog,
    appHeader,
  },
  mixins: [alertMixin],

  data: () => ({}),

  methods: {},
};
</script>
