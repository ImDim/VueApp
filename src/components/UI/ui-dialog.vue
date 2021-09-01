<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>

      <v-card-text>
        {{ message }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn small color="darken-1" text @click="cancel"> Отмена </v-btn>

        <v-btn small depressed color="error" @click="confirm">
          Подтвердить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { pageEvents } from "@/events.js";

export default {
  name: "ui-dialog",
  data() {
    return {
      title: "Вы уверены?",
      message: "Вы точно хотите выполнить это действие?",
      dialog: false,
    };
  },

  methods: {
    confirm() {
      this.dialog = false;
      pageEvents.$emit("confirm-dialog");
    },

    cancel() {
      this.dialog = false;
      pageEvents.$emit("cancel-dialog");
    },

    open(options) {
      this.title = options?.title || this.title;
      this.message = options?.message || this.message;

      this.dialog = true;
    },
  },

  created() {
    pageEvents.$on("open-dialog", this.open);
  },

  beforeDestroy() {
    pageEvents.$off("open-dialog", this.open);
  },
};
</script>