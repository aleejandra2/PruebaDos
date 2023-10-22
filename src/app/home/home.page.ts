import { Usuario } from './../models/usuario';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario: string = '';
  contrasenia: string = '';

  constructor(
    private usuariosService: UsuariosService,
    private alertController: AlertController,
    private router: Router) {


  }
  async guardar() {
    const usuarioValido = await this.usuariosService.validarUsuario(this.usuario, this.contrasenia);

    if (usuarioValido) {
      // Obtener los datos del usuario del localStorage
      const usuarioDatos = await this.usuariosService.getDatosUsuario(this.usuario);

      if (usuarioDatos) {
        // Almacenar los datos del usuario actual en el servicio UsuariosService
        this.usuariosService.setUsuarioActual(usuarioDatos);
        this.router.navigate(['/qr']);
      } else {
        // Manejar el caso en que los datos del usuario no se encuentren
        console.error('Datos del usuario no encontrados');
      }
    } else {
      this.alertaDatos();
      console.error('Usuario y/o contraseña no válidos');
    }
  }

  async alertaDatos() {
    const alert = await this.alertController.create({
      header: 'Datos Incorrectos',
      message: 'Usuario y/o contraseña incorrectos',
      buttons: ['OK'],
    });

    await alert.present();
  }

  resetPass() {
    this.router.navigate(['/recuperar']);
  }

}
