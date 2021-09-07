import instance from './instance.js';

class AuthApi {
  private api = instance;

  public async registration(body: any) {
    const response = await this.api.post("/auth/registration", body);
    return response;
  }

  public async login(data: any) {
    const response = await this.api.post("/auth/login", data);
    return response;
  }

  public async users() {
    const response = await this.api.get("/auth/users");
    return response;
  }
}

export default new AuthApi();
