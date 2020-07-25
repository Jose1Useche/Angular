import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // encapsulation: ViewEncapsulation.None, //Angular por defecto encapsula los tags de sus componentes para que los estilos que se
  //apliquen pues sean parte del componente en sí y nada mas. Esto lo hace Angular colocando un atributo único a los tags para que
  //los estilos sean aplicados a éstos y no de forma global. Sin embargo, la propiedad encapsulation: ViewEncapsulation.None, nos
  //permite eliminar estos atributos a los tags y además todos aquellos estilos que incluyamos en el .CSS de este componente serán
  //ejecutados globalmente (ver el .css de este componente como ejemplo).
})
export class ServerElementComponent implements OnInit {
  @Input('srvElement') element: {type: string, name: string, content: string};

  constructor() { }

  ngOnInit(): void {
  }

}
