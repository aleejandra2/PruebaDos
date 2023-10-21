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

  // async mostrarContrasenia(){
  //   const form = this.formRecuperar.value;
  //   const usuarioString = localStorage.getItem('usuarios');

    // if (usuarioString) {
    //   this.usuarios = JSON.parse(usuarioString);
    // const usuarioEncontrado = this.usuarios.find(usuario => usuario.usuario === form.usuario);

    // if (usuarioEncontrado) {
    //   const contraseñaUsuario = usuarioEncontrado.contraseña;

    //   const alert = await this.alertController.create({
    //     header: 'Su contraseña es:',
    //     subHeader: contraseñaUsuario,
    //     buttons: ['OK']
    //   });

    //   await alert.present();

    //   }else{
    //     const alert = await this.alertController.create({
    //     header: 'Usuario no encontrado',
    //     message: 'El usuario no existe',
    //     buttons: ['Aceptar'],
    //   });
    //   await alert.present();
    //   }
    // }
  // }
  // async cambiarContrasenia(){
  //   const form = this.formRecuperar.value;
  //   const usuarioString = localStorage.getItem('usuarios');

  //   if (usuarioString) {
  //     this.usuarios = JSON.parse(usuarioString);
  //   const usuarioEncontrado = this.usuarios.find(usuario => usuario.correo === form.correo);

  //   if (usuarioEncontrado) {

  //     if (form.nuevaContrasenia === form.confirmarNuevaContrasenia) {

  //       usuarioEncontrado.contraseña = form.nuevaContrasenia;
  //       localStorage.setItem('usuarios', JSON.stringify(this.usuarios));

  //       const alert = await this.alertController.create({
  //         header: 'Éxito',
  //         message: 'Contraseña cambiada con éxito',
  //         buttons: ['Aceptar'],
  //       });
  //       await alert.present();
  //     } else {
  //       const alert = await this.alertController.create({
  //         header: 'Error',
  //         message: 'Las contraseñas no coinciden',
  //         buttons: ['Aceptar'],
  //       });
  //       await alert.present();
  //     }
  //   } else {
  //     const alert = await this.alertController.create({
  //       header: 'Usuario no encontrado',
  //       message: 'El usuario no existe',
  //       buttons: ['Aceptar'],
  //     });
  //     await alert.present();
  //   }}
  // }

}
