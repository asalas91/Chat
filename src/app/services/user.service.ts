import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  friends: User[];
  constructor() {
    const users: User[] = [
      {nick: 'Eduardo', subnick: 'Mi mensaje personal', age: 28, email: 'eduardo@platzi.com', friend: true, status: 'online', uid: 1},
      {nick: 'Yuliana', subnick: 'Mi mensaje personal', age: 25, email: 'yuliana@platzi.com', friend: true, status: 'offline', uid: 2},
      {nick: 'Freddy', subnick: 'Mi mensaje personal', age: 28, email: 'freddy@platzi.com', friend: false, status: 'busy', uid: 3},
      {nick: 'Luis Carlos', subnick: 'Mi mensaje personal', age: 20, email: 'luis@platzi.com', friend: false, status: 'away', uid: 4}
    ];
    this.friends = users;
  }

  getFriends() {
    return this.friends;
  }
}
