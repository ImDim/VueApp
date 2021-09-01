<template>
  <v-row align="center" class="list px-3 mx-auto mt-4">
    <v-col cols="8" md="10">
      <v-text-field
        v-model="searchTitle"
        label="Найти по названию"
        @keydown.enter="searchByTitle"
      ></v-text-field>
    </v-col>

    <v-col cols="4" md="2">
      <v-btn depressed block color="primary" @click="searchByTitle">
        Найти
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" outlined>
        <v-card-title>Записи</v-card-title>

        <v-data-table
          :headers="headers"
          :items="displayedPosts"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editPost(item.id)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deletePost(item.id)">mdi-delete</v-icon>
          </template>

          <template v-slot:[`item.status`]="{ item }">
            <v-chip
              small
              :color="item.published ? 'green' : 'orange'"
              text-color="white"
            >
              {{ item.status }}
            </v-chip>
          </template>
        </v-data-table>
      </v-card>

      <div class="d-flex align-center mt-4">
        <!--         <v-select
          v-model="pageSize"
          :items="pageSizes"
          label="Количество на страницу"
          @change="handlePageSizeChange"
        ></v-select> -->

        <v-pagination
          depressed
          v-model="currentPage"
          :length="totalPages"
          @input="handlePageChange"
        ></v-pagination>

        <v-btn
          depressed
          color="error"
          @click="removeAll"
          v-if="allPosts.length"
          class="ml-auto"
        >
          Удалить все
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import API from "@/api";
import { mapGetters, mapActions } from "vuex";
import formMixin from "@/mixins/formMixin.vue";
import pageMixin from "@/mixins/pageMixin.vue";

export default {
  name: "posts-list",
  mixins: [formMixin, pageMixin],
  data() {
    return {
      headers: [
        { text: "Название", align: "start", sortable: false, value: "title" },
        { text: "Описание", value: "description", sortable: false },
        { text: "Статус", value: "status", sortable: false },
        { text: "Действие", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters(["allPosts"]),

    displayedPosts() {
      return this.allPosts.map((post) => {
        return {
          id: post.id,
          title:
            post.title.length > 30
              ? post.title.substr(0, 30) + "..."
              : post.title,
          description:
            post.description.length > 30
              ? post.description.substr(0, 30) + "..."
              : post.description,
          status: post.published ? "Опубликовано" : "На рассмотрении",
          published: post.published,
        };
      });
    },
  },

  methods: {
    ...mapActions(["getPosts", "removeAllPosts", "searchPost"]),

    getAll() {
      const params = this.getRequestParams(
        this.searchTitle,
        this.currentPage,
        this.pageSize
      );

      this.getPosts(params);
    },

    async removeAll() {
      try {
        await this.$dialog();
      } catch (error) {
        return;
      }

      this.removeAllPosts();
    },

    searchByTitle() {
      this.searchPost({
        title: this.searchTitle,
      });
    },

    refreshList() {
      this.getAll();
    },

    editPost(id) {
      this.$router.push({ name: "post-details", params: { id } });
    },

    async deletePost(id) {
      try {
        await this.$dialog({
          title: "Вы уверены?",
          message: "Запись будет удалена",
        });
      } catch (error) {
        return;
      }

      try {
        await API.posts.delete(id);
        this.refreshList();
      } catch (error) {
        this.onResponseError(error);
        return;
      }

      this.responseNotify({
        message: "Запись успешно удалена!",
      });
    },
  },
  mounted() {
    this.getAll();
  },
};
</script>

<style lang="scss">
.list {
  max-width: 750px;
}

* [depressed] {
  .v-pagination {
    &__navigation,
    &__item,
    &__item--active {
      box-shadow: none !important;
    }
  }
}
</style>