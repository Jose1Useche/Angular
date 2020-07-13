import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css'] //fijate que a diferencia de templateUrl, styleUrls se construye con un array porque puedes anexar
                                        //mas estilos dentro del array. [estiloA,estiloB,estiloC...]
  styles: [`
    h1 {
      color: dodgerblue;
    }
  `]  //Misma analogía que la propiedad template...
})
export class AppComponent {
}
