import { Component, OnInit } from '@angular/core';

import { RegionesService } from 'src/app/services/regiones.service';

@Component({
  selector: 'app-regiones',
  templateUrl: './regiones.component.html',
  styleUrls: ['./regiones.component.scss'],
})
export class RegionesComponent  implements OnInit {

  regiones: any[] = [];
  regionSeleccionada: any;

  constructor(private regionesService: RegionesService) { }

  ngOnInit() {
    // this.obtenerRegiones();
  }

  // obtenerRegiones() {
  //   this.regionesService.obtenerRegiones().subscribe(
  //     (data) => {
  //       this.regiones = data.data;
  //     },
  //     (error) => {
  //       console.error('Error no se pueden obtener las regiones: ', error);
  //     }
  //   );
  // }

}
