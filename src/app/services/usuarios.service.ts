import { Usuario } from './../models/usuario';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor() { }

  async registro(
    usuario: string,
    contrasenia: string,
    nombre:string,
    apellido: string,
    rut: string,
    region:string,
    comuna:string,
    escuela: string,
    carrera: string): Promise<boolean> {

    try {
      if (await this.usuarioExistente(usuario)) {
        return false;
      }

      const nuevoUsuario: Usuario = {
        usuario: usuario,
        contrasenia: contrasenia,
        nombre: nombre,
        apellido: apellido,
        rut: rut,
        region:region,
        comuna:comuna,
        escuela: escuela,
        carrera: carrera
      };

      const usuariosExistente = await Preferences.get({ key: 'usuarios' });
      let usuarios: Usuario[] = usuariosExistente.value ? JSON.parse(usuariosExistente.value) : [];

      usuarios.push(nuevoUsuario);

      await Preferences.set({ key: 'usuarios', value: JSON.stringify(usuarios) });
      // await Preferences.set({ key: 'email', value: email });
      // await Preferences.set({ key: 'contrasenia', value: contrasenia });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }


  async usuarioExistente(usuario: string): Promise<boolean> {
    const usuariosExistente = await Preferences.get({ key: 'usuarios' });
    const usuarios: Usuario[] = usuariosExistente.value ? JSON.parse(usuariosExistente.value) : [];

    return usuarios.some(u => u.usuario === usuario);

  }

  async buscarUsuario(usuario: string): Promise<string | null> {
    const usuariosExistente = await Preferences.get({ key: 'usuarios' });
    const usuarios: Usuario[] = usuariosExistente.value ? JSON.parse(usuariosExistente.value) : [];

    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario);

    if (usuarioEncontrado) {
      return usuarioEncontrado.contrasenia;
    } else {
      return null;
    }
  }

  async validarUsuario(usuario: string, contrasenia: string): Promise<boolean> {
    const usuariosExistente = await Preferences.get({ key: 'usuarios' });
    const usuarios: Usuario[] = usuariosExistente.value ? JSON.parse(usuariosExistente.value) : [];

    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario);

    if (usuarioEncontrado) {
      return usuarioEncontrado.contrasenia === contrasenia;
    }
    return false;
  }

  async setUsuarioActual(usuario: Usuario): Promise<void> {
    await Preferences.set({ key: 'usuarioActual', value: JSON.stringify(usuario) });
  }

  async getUsuarioActual(): Promise<Usuario | null> {
    const usuarioActualString = await Preferences.get({ key: 'usuarioActual' });
    if (usuarioActualString.value) {
      const usuarioActual: Usuario = JSON.parse(usuarioActualString.value);
      return usuarioActual;
    }
    return null;
  }
  async getDatosUsuario(usuario: string): Promise<Usuario | null> {
    const usuarioString = await Preferences.get({ key: 'usuarios' });
    const usuarios: Usuario[] = usuarioString.value ? JSON.parse(usuarioString.value) : [];

    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario);

    return usuarioEncontrado || null;
  }

  async cerrarUsuarioActual() {
    await Preferences.remove({ key: 'usuarioActual' });
  }

}
