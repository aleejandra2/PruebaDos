import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from './services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class RutasGuard implements CanActivate {

  constructor(private usuariosService: UsuariosService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const allowUnauthenticatedAccess = route.data['allowUnauthenticatedAccess'] as boolean;

    if (allowUnauthenticatedAccess) {
      // Permite el acceso sin autenticación
      return true;
    } else if (this.usuariosService.isAuthenticated()) {
      // El usuario está autenticado, permitir el acceso a la ruta
      return true;
    } else {
      // El usuario no está autenticado, redirigir al inicio de sesión o a otra página
      return this.router.createUrlTree(['/e404']); // Redirige al inicio de sesión, ajusta la ruta según tu configuración
    }
  }

}
