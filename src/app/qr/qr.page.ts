import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../registrar/registrar.page';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QRPage implements OnInit {
  title = 'qr-reader';
  public cameras:MediaDeviceInfo[]=[];
  public myDevice!: MediaDeviceInfo;
  public scannerEnabled=false;
  public results:string[]=[];
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
  usuarios: Usuario[] = [];

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    const usuarioActualString = localStorage.getItem('usuarioActual');

  if (usuarioActualString) {
    this.datoUsuario = JSON.parse(usuarioActualString);
  }
    
  }
  

  camerasFoundHandler(cameras: MediaDeviceInfo[]){
    this.cameras=cameras;
    this.selectCamera(this.cameras[0].label);
  }

  scanSuccessHandler(event: string) {
    console.log(event);
    this.results.unshift(event);
    this.checkAndNavigate(); 
  }

  selectCamera(cameraLabel: string){    
    this.cameras.forEach(camera=>{
      if(camera.label.includes(cameraLabel)){
        this.myDevice=camera;
        console.log(camera.label);
        this.scannerEnabled=true;
      }
    })    
  }
  private checkAndNavigate() {
    if (this.results.length > 0) {
      const result = this.results[0]; 
      console.log(result);
      this.router.navigate(['/clase-registrada'], { queryParams: { resultado: result } });
      
  }}

  

  cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    this.router.navigate(['/home']);
  }

}
