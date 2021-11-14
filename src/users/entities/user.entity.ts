export class User {
  readonly id: number;
  readonly email: string;
  readonly name: string | null;

  constructor(props: User) {
    const { id, email, name } = props;

    this.id = id;
    this.email = email;
    this.name = name;
  }

  private static create<PropsT extends User>(props: PropsT): User {
    return new User(props);
  }
}
