<template>
  <div v-if="post" class="edit-form py-3 mt-10">
    <p class="headline">Редактировать запись</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="post.title"
        :rules="[(v) => !!v || 'Название обязательно']"
        label="Title"
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

      <label><strong>Статус:</strong></label>
      {{ post.published ? "Опубликовано" : "Ожидает" }}

      <v-divider class="my-5"></v-divider>

      <v-btn
        @click="updatePublished(!post.published)"
        color="primary"
        small
        class="mr-2"
        depressed
      >
        {{ post.published ? "В очередь" : "Опубликовать" }}
      </v-btn>

      <v-btn depressed color="error" small class="mr-2" @click="deletePost">
        Удалить
      </v-btn>

      <v-btn depressed color="success" small @click="updatePost">
        Обновить
      </v-btn>
    </v-form>
  </div>

  <div v-else>
    <p>Пожалуйста выберите пост...</p>
  </div>
</template>

<script>
import POST_API from "@api/posts.ts";
import formMixin from "@/mixins/formMixin.vue";

export default {
  name: "post",
  mixins: [formMixin],

  data() {
    return {
      post: null,
      message: "",
    };
  },

  methods: {
    async getPost(id) {
      try {
        const response = await POST_API.get(id);
        this.post = response.data;
        console.log(response.data);
      } catch (error) {
        this.onResponseError(error);
        return;
      }
    },

    async updatePublished(status) {
      var post = {
        id: this.post.id,
        title: this.post.title,
        description: this.post.description,
        published: status,
      };

      try {
        const response = await POST_API.update(this.post.id, post);
        this.post.published = status;
        console.log(response);
      } catch (error) {
        this.onResponseError(error);
        return;
      }

      this.responseNotify({
        message: "Статус успешно обновлен!",
      });
    },

    async updatePost() {
      try {
        const response = await POST_API.update(this.post.id, this.post);
        console.log(response);
      } catch (error) {
        this.onResponseError(error);
        return;
      }

      this.responseNotify({
        message: "Запись успешно обновлена!",
      });
    },

    async deletePost() {
      try {
        await this.$dialog({
          title: "Вы уверены?",
          message: "Запись будет удалена",
        });
      } catch (error) {
        console.log(error);
        return;
      }

      try {
        const response = await POST_API.delete(this.post.id);
        console.log(response);
        this.$router.push({ name: "posts" });
      } catch (error) {
        this.onResponseError(error);
        return;
      }
    },
  },
  mounted() {
    this.message = "";
    this.getPost(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 700px;
  margin: auto;
}
</style>