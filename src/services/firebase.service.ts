import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, DocumentData, CollectionReference, query, orderBy } from "firebase/firestore";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Proyect } from 'src/models/proyect.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  proyectCollection: CollectionReference<DocumentData, DocumentData>;
  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);
    this.proyectCollection = collection(db, "proyectos");
  }
  async getProyects() {
    const q = query(this.proyectCollection, orderBy("order"));
    return await getDocs(q);
  }
}