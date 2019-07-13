import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;
  constructor( private _authService: AuthService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(formulario: NgForm){

    // loadig con sweet alert
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor! '
    });
    Swal.showLoading();

    if(formulario.invalid){
      return ;
    }
    // console.log(this.usuario);
    // console.log(formulario);
    this._authService.login(this.usuario).subscribe( resp =>
      {
          console.log(resp);
          Swal.close();
          this.router.navigateByUrl('/home');
          if(this.recordarme){
            localStorage.setItem('email', this.usuario.email);
          }
    }, (err) =>
    {
      console.log(err.error.error.message)
      Swal.fire({
        type: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message
      });
    })

  }
}
