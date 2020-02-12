import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor(
      private userService: UserService,
      private authenticationService: AuthenticationService
    ) {
      this.authenticationService.getStatus().subscribe((status) => {
        this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
          this.user = data;
          console.log('this.user :', this.user);
        }, (error) => {
          console.log('Error :', error);
        });
      }, (error) => {
        console.log('Error :', error);
      });
    }

  saveSettings() {
    this.userService.editUser(this.user).then(() => {
      alert('Camgios guardados');
    }).catch((error) => {
      alert('Hubo un error');
    });
  }

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

  ngOnInit() {
  }

}
