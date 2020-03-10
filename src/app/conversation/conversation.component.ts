import { AuthenticationService } from './../services/authentication.service';
import { ConversationService } from './../services/conversation.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private conversationService: ConversationService,
    private authenticationService: AuthenticationService
    ) {
      this.friendId = this.activatedRoute.snapshot.params['uid'];
      console.log(this.friendId);
      this.authenticationService.getStatus().subscribe((session) => {
        this.userService.getUserById(session.uid).valueChanges().subscribe((user: User) => {
          this.user = user;
          this.userService.getUserById(this.friendId).valueChanges().subscribe((data: User) => {
            this.friend = data;
            const ids = [this.user.uid, this.friend.uid].sort();
            this.conversationId = ids.join('|');
          }, (error) => {
            console.log(error);
          });
        });
      });
    }

  ngOnInit() {
  }

  sendMessage() {
    const message = {
      uid: this.conversationId,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid
    };
    this.conversationService.createConversation(message).then(() => {
      this.textMessage = '';
    });
  }
}
