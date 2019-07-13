import { UsuarioModel } from "src/app/models/usuario.model";

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
  // Tamado de engranaje-> configuracion del proyecto -> Clave API web
  private apikey = " AIzaSyCok6Hv6npmV-d_JsN-hI24WlRxjKNMyvw ";

  userToken: string;

  // Ruta de donde se saco los links
  // https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password

  // Crear nuevo usuario
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]

  // login
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logout() {
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http
      .post(`${this.url}/verifyPassword?key=${this.apikey}`, authData)
      .pipe(
        map(resp => {
          console.log("Entro en el map del rxjs");
          this.guardarToken(resp["idToken"]);
          return resp;
        })
      );
  }

  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http
      .post(`${this.url}/signupNewUser?key=${this.apikey}`, authData)
      .pipe(
        map(resp => {
          console.log("Entro en el map del rxjs");
          this.guardarToken(resp["idToken"]);
          return resp;
        })
      );
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem("token", idToken);
    let hoy = new Date();
    hoy.setSeconds( 3600 );
    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken() {
    if (localStorage.getItem("token")) {
      this.userToken = localStorage.getItem("token");
    } else {
      this.userToken = "";
    }
    return this.userToken;
  }

  estaAutenticado(): boolean {
    if(this.userToken.length < 2){
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setDate(expira);

    if(expiraDate > new Date()){
      return true;
    }else{
      return false;
    }

  }
}
