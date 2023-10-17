import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController  } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Usuario } from '../registrar/registrar.page';


@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  formRecuperar!: FormGroup;
  usuarios: Usuario[] = [];

  constructor(public formBuilder: FormBuilder,private alertController: AlertController, private modalController: ModalController) { 

    this.formRecuperar = this.formBuilder.group({
      'usuario': new FormControl("",Validators.required),
      // 'correo': new FormControl("",[Validators.required, Validators.email]),
      // 'nuevaContrasenia': new FormControl("",Validators.required),
      // 'confirmarNuevaContrasenia': new FormControl("",Validators.required)
    })
  }

  
  
  ngOnInit() {
  }

  async mostrarContrasenia(){
    const form = this.formRecuperar.value;
    const usuarioString = localStorage.getItem('usuarios');
    
    if (usuarioString) {
      this.usuarios = JSON.parse(usuarioString);
    const usuarioEncontrado = this.usuarios.find(usuario => usuario.usuario === form.usuario);

    if (usuarioEncontrado) {
      const contraseñaUsuario = usuarioEncontrado.contraseña;

      const alert = await this.alertController.create({
        header: 'Su contraseña es:',
        subHeader: contraseñaUsuario,
        buttons: ['OK']
      });

      await alert.present();

      }else{
        const alert = await this.alertController.create({
        header: 'Usuario no encontrado',
        message: 'El usuario no existe',
        buttons: ['Aceptar'],
      });
      await alert.present();
      }
    }
  }
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
