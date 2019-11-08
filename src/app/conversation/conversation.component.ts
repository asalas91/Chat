import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.sass']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friends: User[];
  friend: User;
  constructor(private activatedRoute: ActivatedRoute) {
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    console.log(this.friendId);

    const users: User[] = [
      {nick: 'Eduardo', subnick: 'Mi mensaje personal', age: 28, email: 'eduardo@platzi.com', friend: true, uid: 1},
      {nick: 'Yuliana', subnick: 'Mi mensaje personal', age: 25, email: 'yuliana@platzi.com', friend: true, uid: 2},
      {nick: 'Freddy', subnick: 'Mi mensaje personal', age: 28, email: 'freddy@platzi.com', friend: false, uid: 3}
    ];
    this.friends = users;
    this.friend = this.friends.find((record) => {
      return record.uid === this.friendId;
    });
    console.log(this.friend);
  }

  ngOnInit() {
  }

}
