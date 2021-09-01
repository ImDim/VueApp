import inststance from "./instance";
import postsModule from "./posts";
import authModule from "./auth";

export default {
  posts: postsModule(inststance),
  auth: authModule(inststance)
}