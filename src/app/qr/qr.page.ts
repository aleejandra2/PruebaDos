import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { UsuariosService } from '../services/usuarios.service';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

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
  private zoomFactor = 1;
  @ViewChild('scanner', { static: false }) zxingScanner!: ZXingScannerComponent;
  // datoUsuario: Usuario = {
  //   nombre: '',
  //   apellido: '',
  //   rut: '',
  //   escuela: '',
  //   carrera: '',
  //   // correo: '',
  //   contraseña: '',
  //   usuario: ''
  // };
  // usuarios: Usuario[] = [];
  usuarioActual: Usuario | null = null;

  constructor(private usuariosService: UsuariosService,private route: ActivatedRoute,private router: Router) { }

  async ngOnInit() {
    // const usuarioActualString = localStorage.getItem('usuarioActual');
    this.usuarioActual = await this.usuariosService.getUsuarioActual();

  // if (usuarioActualString) {
  //   this.datoUsuario = JSON.parse(usuarioActualString);
  // }

  }
  handlePinch(event: any) {
    const newZoomFactor = this.zoomFactor * event.scale;

    // Limita el zoom a un rango específico si es necesario
    if (newZoomFactor >= 1 && newZoomFactor <= 5) {
      this.zoomFactor = newZoomFactor;

      // Accede al elemento de video directamente desde codeReader
      const videoElement = this.zxingScanner.codeReader as any;

      if (videoElement && videoElement.videoElement) {
        videoElement.videoElement.style.transform = `scale(${this.zoomFactor})`;
      }
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
    // Eliminar la información del usuario actual de las preferencias compartidas
    this.usuariosService.cerrarUsuarioActual();
    this.router.navigate(['/home']);
  }
  // cerrarSesion() {
  //   localStorage.removeItem('usuarioActual');
  //   this.router.navigate(['/home']);
  // }

}
