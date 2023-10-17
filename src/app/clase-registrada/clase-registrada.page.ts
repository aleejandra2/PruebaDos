import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../registrar/registrar.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-clase-registrada',
  templateUrl: './clase-registrada.page.html',
  styleUrls: ['./clase-registrada.page.scss'],
})
export class ClaseRegistradaPage implements OnInit {
  resultado!: string;
  usuarios: Usuario[] = [];
  datoUsuario: Usuario = {
    nombre: '',
    apellido: '',
    rut: '',
    escuela: '',
    carrera: '',
    // correo: '',
    contraseña: '',
    usuario: ''
  };
  
  

  constructor(private route: ActivatedRoute,private alertController: AlertController,private router: Router) { 
    this.route.queryParams.subscribe(params => {
      this.resultado = params['resultado'];
    });
  }

  ngOnInit() {
    const usuarioActualString = localStorage.getItem('usuarioActual');

  if (usuarioActualString) {
    this.datoUsuario = JSON.parse(usuarioActualString);
  }
    this.datosUsuario();
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

  datosUsuario() {

    const usuarioId = this.route.snapshot.paramMap.get('usuarioId'); 
    const usuarioString = localStorage.getItem('usuarios');
    if (usuarioString) {
      this.usuarios = JSON.parse(usuarioString);
      const usuarioEncontrado = this.usuarios.find(usuario => usuario.usuario === usuarioId); 
      if (usuarioEncontrado) {
        this.datoUsuario = usuarioEncontrado;
      }
    }
    
  }
  cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    this.router.navigate(['/home']);
  }

}
