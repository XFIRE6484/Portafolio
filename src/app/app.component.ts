import { Component, OnInit } from '@angular/core';
import { Proyect } from 'src/models/proyect.model';
import { FirebaseService } from 'src/services/firebase.service';
import 'bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  proyects: Proyect[] = [];

  constructor(private firebaseService: FirebaseService) { }
  async ngOnInit(): Promise<void> {
    (await this.firebaseService.getProyects()).forEach((doc) => {
      const proyect = doc.data() as Proyect;
      this.proyects.push(proyect);
      console.table(this.proyects);
    });
  }
  async openIframe(url: string) {
    const iframe = `<iframe src="${url}" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>`;        
    const newTab = window.open('', '_blank') as Window;
    newTab.document.body.innerHTML = iframe;
    //const client = await window.appetize.getClient("#appetize");
  }
}