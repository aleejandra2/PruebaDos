import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController  } from '@ionic/angular';
import { UsuariosService } from '../services/usuarios.service';
// import { Usuario } from '../registrar/registrar.page';


@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  usuarioEncontrado: string = '';
  usuario: string = '';

  constructor(private usuariosService: UsuariosService,private alertController: AlertController, private modalController: ModalController) {

  }



  ngOnInit() {
  }
  async mostrarContrasenia() {
    if (this.usuario) {
      const contraseñaUsuario = await this.usuariosService.buscarUsuario(this.usuario);

      if (contraseñaUsuario) {
        const alert = await this.alertController.create({
              header: 'Su contraseña es:',
              subHeader: contraseñaUsuario,
              buttons: ['OK']
            });
        await alert.present();
      } else{
            const alert = await this.alertController.create({
            header: 'Usuario no encontrado',
            message: 'El usuario no existe',
            buttons: ['Aceptar'],
          });
          await alert.present();
          }

    } else {
      const alert = await this.alertController.create({
        header: 'Usuario no ingresado',
        message: 'Por favor, ingresa un usuario.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }

  }


}
