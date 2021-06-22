export class User {
  id?: number;
  name?: string;

  static mapHttpUser(httpUser: User): User {
    const user = new User();
    user.id = httpUser.id;
    user.name = httpUser.name;
    return user;
  }
}
