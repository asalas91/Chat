import { AuthenticationService } from './../services/authentication.service';
import { ConversationService } from './../services/conversation.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  today: number = Date.now();
  friendId: any;
  friend: User;
  user: User;
  conversationId: string;
  textMessage: string;
  conversation: any[];
  shake: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private conversationService: ConversationService,
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit() {
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    console.log(this.friendId);
    this.authenticationService.getStatus().subscribe((session) => {
      this.userService.getUserById(session.uid).valueChanges().subscribe((user: User) => {
        this.user = user;
        this.userService.getUserById(this.friendId).valueChanges().subscribe((data: User) => {
          this.friend = data;
          const ids = [this.user.uid, this.friend.uid].sort();
          this.conversationId = ids.join('|');
          // console.log('this.conversationId :', this.conversationId);
          this.getConverstaion();
        }, (error) => {
          console.log(error);
        });
      });
    });
  }

  sendMessage() {
    const message = {
      uid: this.conversationId,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'text'
    };
    this.conversationService.createConversation(message).then(() => {
      this.textMessage = '';
    });
  }
  sendZumbido() {
    const message = {
      uid: this.conversationId,
      timestamp: Date.now(),
      text: null,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'zumbido'
    };
    this.conversationService.createConversation(message).then(() => {});
    this.doZumbido ();
  }

  doZumbido() {
      const audio = new Audio ('assets/sound/zumbido.m4a');
      audio.play();
      this.shake = true;
      window.setTimeout(() => {
        this.shake = false;
      }, 1000);
  }

  getConverstaion( ) {
    console.log('this.conversationId :', this.conversationId);
    this.conversationService.getConversation(this.conversationId).valueChanges().subscribe((data) => {
      this.conversation = data;
      this.conversation.forEach((message) => {
        if (!message.seen) {
          if (message.type == 'text') {
            const audio = new Audio ('assets/sound/new_message.m4a');
            audio.play();
          } else if(message.type == 'zumbido') {
            this.doZumbido();
          }
          message.seen = true;
          this.conversationService.editConversation(message);
        }
      });
      console.log('Data :', data);
    }, (error) => {
      console.log('Error :', error);
    });
  }

  getUserNickById(id) {
    if (id === this.friend.uid) {
      return this.friend.nick;
    } else {
      return this.user.nick;
    }
  }
}
