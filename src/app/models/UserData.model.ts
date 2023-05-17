export class UserData {
  public username: string;
  public displayName: string;
  public roles: Array<string>;

  constructor(username: string, password: string, roles: Array<string>) {
    this.username = username;
    this.displayName = password;
    this.roles = roles;
  }
}
