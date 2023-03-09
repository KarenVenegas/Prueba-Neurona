import { Injectable } from '@angular/core';
import { collectionData, Firestore, collection, addDoc, doc, deleteDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Usuario from '../interfaces/user.interface';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore) { }

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
}
