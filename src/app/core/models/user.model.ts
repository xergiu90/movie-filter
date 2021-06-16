import { IUser } from '@core/interfaces/user.interface';

export class User {
  id: number;
  username: string;
  email: string;

  constructor(userData: IUser) {
    this.id = userData.id;
    this.username = userData.username;
    this.email = userData.email;
  }

  public toDTO(): object {
    return {
      uuid: this.id,
      username: this.username,
      email: this.email,
    };
  }
}
