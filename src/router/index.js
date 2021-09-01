import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: "/",
    alias: "/posts",
    name: "posts",
    component: () => import("@/components/PostsList")
  },
  {
    path: "/posts/:id",
    name: "post-details",
    component: () => import("@/components/Post")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("@/components/AddPost")
  },
  {
    path: "/auth",
    name: "auth",
    meta: {
      layout: 'Empty'
    },
    component: () => import("@/components/Auth")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router