import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { AlertController } from '@ionic/angular';
import { Usuario, Clase } from '../models/usuario';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-clase-registrada',
  templateUrl: './clase-registrada.page.html',
  styleUrls: ['./clase-registrada.page.scss'],
})
export class ClaseRegistradaPage implements OnInit {
  resultado!: string;
  usuarioActual: any;
    usuario = '';
    nombre = '';
    apellido = '';
    rut = '';
    region = '';
    comuna = '';
    escuela = '';
    carrera = '';
    contrasenia = '';

    latitude: number = 0;
    longitude: number = 0;

    imageSource:any;
    takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source:CameraSource.Prompt
    });

    this.imageSource= this.domSanitizer.bypassSecurityTrustUrl(image.webPath ? image.webPath : "")
  };
  getPhoto(){
    return this.imageSource
  }


  constructor(
    private usuariosService: UsuariosService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
    private domSanitizer:DomSanitizer) {
    this.route.queryParams.subscribe(params => {
      this.resultado = params['resultado'];
    });

  }

  async ngOnInit() {
    this.usuarioActual = await this.usuariosService.getUsuarioActual();
    if (this.usuarioActual && this.resultado) {
      // Divide el resultado del escaneo y obtiene los datos
      const resultadoDividido = this.splitResultado();

      // Verifica si las propiedades necesarias existen en resultadoDividido
      if (
        resultadoDividido['Nombre Profesor'] &&
        resultadoDividido['Hora'] &&
        resultadoDividido['sala'] &&
        resultadoDividido['Dia']
      ) {
        // Actualiza el atributo clase del usuario actual
        this.usuarioActual.clase = {
          profesor: resultadoDividido['Nombre Profesor'],
          hora: resultadoDividido['Hora'],
          sala: resultadoDividido['sala'],
          dia: resultadoDividido['Dia']
        };

        // Llama al servicio para actualizar el usuario actual
        await this.usuariosService.setUsuarioActual(this.usuarioActual);

        // Asegúrate de que se actualice el usuario en el almacenamiento
        await this.usuariosService.actualizarUsuarioRegistrado(this.usuarioActual);
      } else {
        console.error('No se encontraron todos los datos necesarios en el resultado del escaneo.');
      }
    }
  }


  splitResultado() {
    const partes = this.resultado.split(',');

    const resultadoDividido: { [key: string]: string } = {};

    partes.forEach(parte => {
      const [nombre, valor] = parte.split(': ');
      if (nombre && valor) {
        resultadoDividido[nombre.trim()] = valor.trim();
      }
    });
    return resultadoDividido;
  }

  getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        const usuarioActual = await this.usuariosService.getUsuarioActual();
        if (usuarioActual) {
          // Actualiza la latitud y longitud del usuario actual
          usuarioActual.latitude = this.latitude;
          usuarioActual.longitude = this.longitude;

          // Llama al servicio para actualizar el usuario actual
          await this.usuariosService.setUsuarioActual(usuarioActual);

          await this.usuariosService.actualizarUsuarioRegistrado(usuarioActual);
        } else {
          console.error('Usuario actual no encontrado');
        }
      }, (error) => {
        console.error('Error obteniendo la ubicación', error);
      });
    } else {
      console.error('Geolocalización no es compatible en este dispositivo');
    }
  }


  async cerrarSesion() {
    // Llama al método de servicio para cerrar la sesión
    await this.usuariosService.cerrarUsuarioActual();
    this.router.navigate(['/home']);
  }

}
