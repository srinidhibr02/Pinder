import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private afs:AngularFirestore) { }

  userRef:any;

  createUserCollection(userId:any){
    this.userRef = this.afs.collection('users').doc(userId).set({});
  }

}
