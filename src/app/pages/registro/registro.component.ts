//import { Swal } from 'sweetalert2';
import Swal from "sweetalert2";
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { UsuarioModel } from "src/app/models/usuario.model";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"]
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;
  constructor(private _authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // console.log("Formulario enviado");
    // console.log(this.usuario);
    // console.log(form);
    Swal.fire({
      allowOutsideClick: false,
      type: "info",
      text: "Espere por favor!"
    });
    Swal.showLoading();

    this._authService.nuevoUsuario(this.usuario).subscribe(
      resp => {
        console.log(resp);
        Swal.close();
        this.router.navigateByUrl("/home");
        if(this.recordarme){
          localStorage.setItem('email', this.usuario.email)
        }
      },
      err => {
        console.log(err.error.error.message);
        Swal.fire({
          type: "error",
          title: "Error al registrar!!",
          text: err.error.error.message
        });
      }
    );
  }
}
