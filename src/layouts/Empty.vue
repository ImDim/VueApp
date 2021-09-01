<template>
  <v-app>
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

export default {
  name: "Empty",
  components: {
    uiDialog,
  },
  mixins: [alertMixin],

  data: () => ({}),

  methods: {},
};
</script>
