import { Component, OnInit } from '@angular/core';
import { Proyect } from 'src/models/proyect.model';
import { FirebaseService } from 'src/services/firebase.service';

import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  proyects: Proyect[] = [];
  isPaused = true;
  unpauseOnArrow = true;
  pauseOnIndicator = true;
  pauseOnHover = true;

  constructor(private firebaseService: FirebaseService)
  {
    addEventListener("fullscreenchange", (event) =>
    {
      if (document.fullscreenElement)
      {
        console.log("Entered fullscreen mode!");
      } else
      {
        console.log("Exited fullscreen mode.");
        document.querySelectorAll('.sliderImage-fullscreen').forEach(img =>
        {
          img.classList.add('sliderImage');
          img.classList.remove('sliderImage-fullscreen');
        }
        );
      }
    });
  }
  async ngOnInit(): Promise<void>
  {
    (await this.firebaseService.getProyects()).forEach((doc) =>
    {
      const proyect = doc.data() as Proyect;
      this.proyects.push(proyect);
    });
    console.table(this.proyects);
  }
  async openIframe(url: string)
  {
    const iframe = `<iframe src="${url}" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>`;
    const newTab = window.open('', '_blank') as Window;
    newTab.document.body.innerHTML = iframe;
    //const client = await window.appetize.getClient("#appetize");
  }

  requestFullscreen(element: Element, id: number): void
  {
    const carousel = document.getElementById(`carousel${id}`);
    if (carousel)
    {
      if (document.fullscreenElement)
      {
        document.exitFullscreen();
        carousel.querySelectorAll('.sliderImage-fullscreen').forEach(img =>
        {
          img.classList.add('sliderImage');
          img.classList.remove('sliderImage-fullscreen');
        }
        );
      } else
      {
        carousel.requestFullscreen();
        carousel.querySelectorAll('.sliderImage').forEach(img =>
        {
          img.classList.add('sliderImage-fullscreen');
          img.classList.remove('sliderImage');
        }
        );
      }
    }
  }

  togglePaused(carousel: NgbCarousel)
  {
    if (this.isPaused)
    {
      carousel.cycle();
    } else
    {
      carousel.pause();
    }
    this.isPaused = !this.isPaused;
  }

  onSlide(slideEvent: NgbSlideEvent, carousel: NgbCarousel)
  {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    )
    {
      this.togglePaused(carousel);
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR)
    {
      this.togglePaused(carousel);
    }
  }
}