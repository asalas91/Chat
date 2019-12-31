import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  operation: string = 'login';
  email: string = null;
  password: string = null;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  login() {
    this.authenticationService.loginWithEmail(this.email, this.password).then(
    (data) => {
      alert('Loggeado correctamente');
      console.log('data :', data);
    }).catch((error) => {
      alert('Ocurrio un error');
      console.log('error :', error);
    });
  }

  register() {
    this.authenticationService.registerWithEmail(this.email, this.password).then(
    (data) => {
      alert('Registrado correctamente');
      console.log('data :', data);
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
