import instance from './instance.js';

class PostApi {
  private api = instance;

  public getPosts(params: any) {
    return this.api.get("/posts", {
      params
    });
  }

  public get(id: number) {
    return this.api.get(`/posts/${id}`);
  }

  public create(data: any) {
    return this.api.post("/posts", data);
  }

  public update(id: number, data: any) {
    return this.api.put(`/posts/${id}`, data);
  }

  public delete(id: number) {
    return this.api.delete(`/posts/${id}`);
  }

  public deleteAll() {
    return this.api.delete(`/posts`);
  }

  public findByTitle(title: string) {
    return this.api.get(`/posts?title=${title}`);
  }
}

export default new PostApi();