import { UsuarioModel } from 'src/app/models/usuario.model';

import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  // Tamado de engranaje-> configuracion del proyecto -> Clave API web
  private apikey = ' AIzaSyCok6Hv6npmV-d_JsN-hI24WlRxjKNMyvw ';

  // Ruta de donde se saco los links
  // https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password

  // Crear nuevo usuario
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]

  // login
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]


  constructor(private http: HttpClient ) { }

  logout(){

  }

  login(usuario: UsuarioModel){

  }

  nuevoUsuario( usuario: UsuarioModel){

  }
}
