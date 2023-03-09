import { Injectable } from '@angular/core';
import { collectionData, Firestore, collection, addDoc, doc, deleteDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';

import Usuario from '../interfaces/user.interface';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore, private auth: Auth) { }

  addUsuario(usuario:Usuario){
    const usuarioRef= collection(this.firestore, 'usuarios');
    return addDoc(usuarioRef, usuario);
  }
  getUsuarios():Observable<Usuario[]>{
    const usuarioRef= collection(this.firestore, 'usuarios');
    return collectionData(usuarioRef,{idField:'id'}) as Observable<Usuario[]>;
  }
  deleteUsuario(usuario:Usuario){
    const usuarioDocRef = doc(this.firestore,`usuarios/${usuario.id}`);
    return deleteDoc(usuarioDocRef);
  }
  AddAdmin({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
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
  logout() {
    return signOut(this.auth);
  }
}
