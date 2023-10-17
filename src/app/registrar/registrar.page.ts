import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, ModalController  } from '@ionic/angular';



export interface Usuario {
  nombre: string;
  apellido: string;
  rut: string;
  escuela: string;
  carrera: string;
  // correo: string;
  contraseña: string;
  usuario: string;
  
}
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  formRegistro!: FormGroup;
  usuarios: Usuario[] = [];

  // Esto es lo de las escuelas hay algo que le falta 
  // porque las opciones de las carreras no sale
  // realmente no se como le tienes con los "nombres" puesto a cada cosa
  
  // carrera: string = '';
  // escuela: string = '';
  opcionesCarrera: string[] = [];

  constructor(public formBuilder: FormBuilder,private alertController: AlertController, private modalController: ModalController) {
    this.formRegistro = this.formBuilder.group({
      'nombre': new FormControl("", Validators.required),
      'apellido': new FormControl("", Validators.required),
      'rut': new FormControl("", Validators.required),
      'escuela': new FormControl("", Validators.required),
      'carrera': new FormControl("", Validators.required),
      // 'correo': new FormControl("", [Validators.required, Validators.email]),
      'contraseña': new FormControl("", Validators.required)
    });
   }

  ngOnInit() {
    const usuariosRegistrados = localStorage.getItem('usuarios');
    if (usuariosRegistrados) {
      this.usuarios = JSON.parse(usuariosRegistrados);
    }
  }


  async registrar(){
    console.log("Guardar")
    var form = this.formRegistro.value;

    if(this.formRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Tiene que completar todos los datos',
        buttons: ['Aceptar'],
      });
  
      await alert.present();
      return;
    }

    const rutFormateado = this.formatearRUT(form.rut);
    var usuario = form.nombre.charAt(0).toLowerCase() + '.' + form.apellido.toLowerCase();

    var nuevoUsuario: Usuario = {
      nombre: form.nombre.charAt(0).toUpperCase() + form.nombre.slice(1).toLowerCase(),
      apellido: form.apellido.charAt(0).toUpperCase() + form.apellido.slice(1).toLowerCase(),
      rut: rutFormateado,
      escuela: form.escuela,
      carrera: form.carrera,
      // correo: form.correo,
      contraseña: form.contraseña,
      usuario: usuario
    };
    this.usuarios.push(nuevoUsuario);

    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    
    const nombreUsuario = nuevoUsuario.usuario;
    this.formRegistro.reset();
    const alert = await this.alertController.create({
      header: '¡Registro exitoso!',
      subHeader: 'Tu nombre de usuario es:',
      message: nombreUsuario,
      buttons: ['OK']
    });

  await alert.present();
  }

  formatearRUT(rut: string): string {
    const numeros = rut.replace(/\./g, '');
    const rutFormateado = numeros.slice(0, -1).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '-' + numeros.slice(-1);

    return rutFormateado;
  }

  //Esto es lo de la escuela
  onEscuelaChange() {

    const escuelaSeleccionada = this.formRegistro.get('escuela')?.value;

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
    } 
    else if (escuelaSeleccionada === 'Gastronomia') {
      this.opcionesCarrera = [
        'Gastronomia',
        'Gastronomia Internacional',
      ];
    } 
    else if (escuelaSeleccionada === 'Informatica y Telecomunicaciones') {
      this.opcionesCarrera = [
        'Analista Programador',
        'Desarrollo de Aplicaciones',
        'Ingeniera en Informatica',
        'Ingenieria en Infraestructura Tecnológicas',
      ];
    }
    else if (escuelaSeleccionada === 'Salud') {
      this.opcionesCarrera = [
        'Informatica Biomedica',
        'Tecnico en Enfermeria',
        'Tecnico en Quimica y Farmacia',
      ];
    }else if (escuelaSeleccionada === 'Turismo y Hoteleria') {
      this.opcionesCarrera = [
        'Aministración Hotelera',
        'Ecoturismo',
        'Turismo y Hoteleria',
      ];
    }
    else {
      this.opcionesCarrera = []; // Reinicia las opciones de carrera si no se ha seleccionado una escuela válida
    }
  }
}
