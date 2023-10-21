import { Component, OnInit } from '@angular/core';
import { AlertController, IonSelect, ModalController  } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { UsuariosService } from '../services/usuarios.service';
import { RegionesService } from '../services/regiones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
    usuario = '';
    nombre = '';
    apellido = '';
    rut = '';
    region = '';
    comuna = '';
    escuela = '';
    carrera = '';
    contrasenia = '';

  opcionesCarrera: string[] = [];

  regiones: any[] = [];
  regionSeleccionada: any;

  constructor(private UsuariosService: UsuariosService,private router: Router,private alertController: AlertController, private modalController: ModalController,
    private regionesService: RegionesService, private http: HttpClient) {

   }

  ngOnInit() {
    this.obtenerRegiones();
  }


  obtenerRegiones() {
    this.regionesService.obtenerRegiones().subscribe(
      (data) => {
        this.regiones = data.data;
      },
      (error) => {
        console.error('Error no se pueden obtener las regiones: ', error);
      }
    );
  }
  async registro() {
    if (this.nombre.length < 3 || this.nombre.length > 12) {
      this.alertaCampos('Nombre inválido', 'El nombre debe tener entre 3 y 12 caracteres.');
      return;
    }
    if (this.apellido.length < 3 || this.apellido.length > 12) {
      this.alertaCampos('Apellido inválido', 'El apellido debe tener entre 3 y 12 caracteres.');
      return;
    }
    if (this.rut.length < 8 || this.rut.length > 9) {
      this.alertaCampos('Rut inválido', 'El rut debe tener entre 8 y 9 caracteres.');
      return;
    }

    // if (this.usuario.length < 3 || this.usuario.length > 8) {
    //   this.alertaCampos('Nombre de usuario inválido', 'El nombre de usuario debe tener entre 3 y 8 caracteres.');
    //   return;
    // }

    if (this.contrasenia.length < 5 || this.contrasenia.length > 12) {
      this.alertaCampos('Contraseña inválido', 'La contraseña debe tener entre 5 y 12 caracteres.');
      return;
    }

    if (await this.UsuariosService.usuarioExistente(this.usuario)) {
      this.alertaUsuarioExistente();
      return;
    }
    var usuario = this.nombre.charAt(0).toLowerCase() + '.' + this.apellido.toLowerCase();


    const regionId = this.regionSeleccionada;
  const regionSeleccionada = this.regiones.find(region => region.id === regionId);
  const nombreRegion = regionSeleccionada.nombre;
  this.comuna = '';

  const numeros = this.rut.replace(/\./g, '');
    const rutFormateado = numeros.slice(0, -1).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '-' + numeros.slice(-1);
  const success = await this.UsuariosService.registro(
    usuario, this.contrasenia, this.nombre, this.apellido, rutFormateado,
    nombreRegion, this.comuna,this.escuela, this.carrera
  );
    if (success) {
      this.router.navigate(['/home']);
    } else {
      this.alertaCampos('Error en el registro', 'Ocurrió un error al intentar registrarse. Por favor, inténtelo de nuevo más tarde.');
    }

    const alert = await this.alertController.create({
      header: '¡Registro exitoso!',
      subHeader: 'Tu nombre de usuario es:',
      message: usuario,
      buttons: ['OK']
    });

  await alert.present();


  }
  onRegionChange(event: any) {
    this.regionSeleccionada = event.detail.value;
  }

  async alertaCampos(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async alertaUsuarioExistente() {
    const alert = await this.alertController.create({
      header: 'Nombre de usuario en uso',
      message: 'El nombre de usuario ya está registrado. Por favor, elige otro nombre de usuario.',
      buttons: ['OK']
    });

    await alert.present();
  }
  // async registrar(){
  //   console.log("Guardar")
  //   var form = this.formRegistro.value;

  //   if(this.formRegistro.invalid){
  //     const alert = await this.alertController.create({
  //       header: 'Alert',
  //       message: 'Tiene que completar todos los datos',
  //       buttons: ['Aceptar'],
  //     });

  //     await alert.present();
  //     return;
  //   }

  //   const rutFormateado = this.formatearRUT(form.rut);
  //   var usuario = form.nombre.charAt(0).toLowerCase() + '.' + form.apellido.toLowerCase();

  //   var nuevoUsuario: Usuario = {
  //     nombre: form.nombre.charAt(0).toUpperCase() + form.nombre.slice(1).toLowerCase(),
  //     apellido: form.apellido.charAt(0).toUpperCase() + form.apellido.slice(1).toLowerCase(),
  //     rut: rutFormateado,
  //     escuela: form.escuela,
  //     carrera: form.carrera,
  //     // correo: form.correo,
  //     contraseña: form.contraseña,
  //     usuario: usuario
  //   };
  //   this.usuarios.push(nuevoUsuario);

  //   localStorage.setItem('usuarios', JSON.stringify(this.usuarios));

  //   const nombreUsuario = nuevoUsuario.usuario;
  //   this.formRegistro.reset();
  //   const alert = await this.alertController.create({
  //     header: '¡Registro exitoso!',
  //     subHeader: 'Tu nombre de usuario es:',
  //     message: nombreUsuario,
  //     buttons: ['OK']
  //   });

  // await alert.present();
  // }

  formatearRUT(rut: string): string {
    const numeros = rut.replace(/\./g, '');
    const rutFormateado = numeros.slice(0, -1).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '-' + numeros.slice(-1);

    return rutFormateado;
  }

  //Esto es lo de la escuela
  onEscuelaChange(event: any) {
    const escuelaSeleccionada = event.detail.value;

    if (escuelaSeleccionada === 'Administracion y Negocio') {
      this.opcionesCarrera = [
        'Administracion de Empresas',
        'Auditoria',
        'Comercio Exterior',
        'Contabilidad Tributaria',
      ];
    } else if (escuelaSeleccionada === 'Comunicacion') {
      this.opcionesCarrera = [
        'Actuación',
        'Animación Digital',
        'Comunicación Audiovisual',
        'Ingeniera en Sonido',
        'Técnico Audiovisual',
        'Ingeniería en Sonido',
      ];
    } else if (escuelaSeleccionada === 'Gastronomia') {
      this.opcionesCarrera = [
        'Gastronomia',
        'Gastronomia Internacional',
      ];
    } else if (escuelaSeleccionada === 'Informatica y Telecomunicaciones') {
      this.opcionesCarrera = [
        'Analista Programador',
        'Desarrollo de Aplicaciones',
        'Ingeniera en Informatica',
        'Ingenieria en Infraestructura Tecnológicas',
      ];
    } else if (escuelaSeleccionada === 'Salud') {
      this.opcionesCarrera = [
        'Informatica Biomedica',
        'Tecnico en Enfermeria',
        'Tecnico en Quimica y Farmacia',
      ];
    } else if (escuelaSeleccionada === 'Turismo y Hoteleria') {
      this.opcionesCarrera = [
        'Aministración Hotelera',
        'Ecoturismo',
        'Turismo y Hoteleria',
      ];
    } else {
      this.opcionesCarrera = []; // Reinicia las opciones de carrera si no se ha seleccionado una escuela válida
    }
  }
}
