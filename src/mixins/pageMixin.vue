<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      searchTitle: "",
      currentPage: 1,
      pageSize: 5,
      pageSizes: [5, 10, 15],
    };
  },

  computed: {
    ...mapGetters(["totalPages", "totalItems"]),
  },

  methods: {
    // Меняем текущую страницу
    handlePageChange(value) {
      this.currentPage = value;
      this.getAll();
    },

    // Меняем кол-во записей на страницу
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.getAll();
    },

    // Формируем параметры для запроса
    getRequestParams(searchTitle, currentPage, pageSize) {
      let params = {};

      if (searchTitle) {
        params["title"] = searchTitle;
      }

      if (currentPage) {
        params["page"] = currentPage - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },
  },
};
</script>