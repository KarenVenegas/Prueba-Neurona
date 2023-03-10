import { Injectable } from '@angular/core';
import { collectionData, Firestore, collection, addDoc, doc, deleteDoc, query, where, getDocs} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';

import Usuario from '../interfaces/user.interface';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore, private auth: Auth) { }

  // Agregar usuario
  async addUsuario(usuario:Usuario){
    if (!usuario.nombre || !usuario.apellido || !usuario.cedula) {
      throw new Error('Todos los campos son obligatorios.');
    }
    const usuarioRef= collection(this.firestore, 'usuarios');
    const querySnapshot = await getDocs(query(usuarioRef, where('cedula', '==', usuario.cedula)));
    if (!querySnapshot.empty) {
      throw new Error('La cédula de identidad ya está registrada.');
    } return addDoc(usuarioRef, usuario);
  }

  getUsuarios():Observable<Usuario[]>{
    const usuarioRef= collection(this.firestore, 'usuarios');
    return collectionData(usuarioRef,{idField:'id'}) as Observable<Usuario[]>;
  }

  //Elimina el usuario
  deleteUsuario(usuario:Usuario){
    const usuarioDocRef = doc(this.firestore,`usuarios/${usuario.id}`);
    return deleteDoc(usuarioDocRef);
  }


  // Agrega el administrador
  async AddAdmin({ email, password }: any) {
    if (!email || !password) {
      throw new Error('Todos los campos son obligatorios');
    }
    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
    const methods = await fetchSignInMethodsForEmail(this.auth, email);
    if (methods.length > 0) {
       throw new Error('El correo electrónico ya está registrado');
    } const response = await createUserWithEmailAndPassword(this.auth, email, password);
  }

  //Ingreso al sistema
  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
      })
      .catch(error => {
        let errorMessage = 'Usuario y contraseña invalidos';
        if (error.code === 'auth/wrong-password') {
          errorMessage = 'Contraseña incorrecta';
        } else if (error.code === 'auth/user-not-found') {
          errorMessage = 'Usuario no encontrado';
        }
        throw new Error(errorMessage);
      });
  }
  //Salida del sistema
  logout() {
    return signOut(this.auth);
  }
}
