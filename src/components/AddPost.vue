<template>
  <div class="submit-form mt-10 mx-auto">
    <p class="headline">Новая запись</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="post.title"
          :rules="[(v) => !!v || 'Название обязательно']"
          label="Название"
          required
        ></v-text-field>

        <v-textarea
          class="mt-4"
          outlined
          name="description"
          v-model="post.description"
          :rules="[(v) => !!v || 'Описание обязательно']"
          label="Описание"
        ></v-textarea>
      </v-form>

      <v-btn depressed color="primary" class="mt-3" @click="savePost"
        >Добавить</v-btn
      >
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title> Запись успешно добавлена! </v-card-title>

        <v-card-subtitle> Добавьте еще записи. </v-card-subtitle>

        <v-card-actions>
          <v-btn depressed color="success" @click="newPost">Добавить</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import API from "@/api";
import formMixin from "@/mixins/formMixin.vue";

export default {
  name: "add-post",
  mixins: [formMixin],

  data() {
    return {
      post: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    async savePost() {
      var post = {
        title: this.post.title,
        description: this.post.description,
      };

      try {
        const response = await API.posts.create(post);
        const { data } = response;
        this.post.id = data.id;
        this.submitted = true;
      } catch (error) {
        this.onResponseError(error);
        return;
      }
    },

    newPost() {
      this.submitted = false;
      this.post = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 700px;
}
</style>
