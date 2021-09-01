<template>
  <div>
    <component :is="layout"> </component>
  </div>
</template>

<script>
import Main from "@/layouts/Main.vue";
import Empty from "@/layouts/Empty.vue";

export default {
  name: "App",
  components: {
    Main,
    Empty,
  },

  computed: {
    layout() {
      return this.$route.meta.layout || "Main";
    },
  },

  data: () => ({}),

  methods: {},
};
</script>
