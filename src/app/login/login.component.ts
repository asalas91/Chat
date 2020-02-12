import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  operation: string = 'login';
  email: string = null;
  password: string = null;
  nick: string = null;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  login() {
    this.authenticationService.loginWithEmail(this.email, this.password).then(
    (data) => {
      alert('Loggeado correctamente');
      console.log('data :', data);
      this.router.navigate(['home']);
    }).catch((error) => {
      alert('Ocurrio un error');
      console.log('error :', error);
    });
  }

  register() {
    this.authenticationService.registerWithEmail(this.email, this.password).then(
    (data) => {
      const user = {
        uid: data.user.uid,
        email: this.email,
        nick: this.nick
      };
      this.userService.createUser(user).then((data2) => {
        alert('Registrado correctamente');
        console.log('data :', data2);
      }).catch((error) => {
        alert('Ocurrio un error');
        console.log(error);
      });
    }).catch((error) => {
      alert('Ocurrio un error');
      console.log('error :', error);
    });
  }

  loginWithFacebook() {
    this.authenticationService.loginWithFacebook()
      .then( data => {
        alert('Logeado con Facebook correctamente');
        console.log(data);
      })
      .catch( error => {
        alert('Ocurrió un error');
        console.log(error);
      });
  }
}
