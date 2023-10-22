import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { AlertController } from '@ionic/angular';
import { Usuario } from '../models/usuario';
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

    latitude: number = 0; // Valor inicial
    longitude: number = 0; // Valor inicial

    imageSource:any;
    takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source:CameraSource.Prompt
    });

    // this.imageSource = 'data:image/jpeg;base64,' + image.base64String;
    // console.log(this.imageSource)
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
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
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
    // Redirige al usuario a la página de inicio de sesión u otra página según tu flujo de la aplicación
    this.router.navigate(['/home']);
  }

}
