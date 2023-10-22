import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunaService {

  private apiUrl = 'https://dev.matiivilla.cl/duoc/location/comuna'; // URL base para obtener las comunas

  constructor(private http: HttpClient) {}

  getComunas(regionId: number): Observable<any> {
    // Realiza una solicitud GET a la API de comunas, pasando el ID de la región
    return this.http.get(`${this.apiUrl}/${regionId}`);
  }
}
