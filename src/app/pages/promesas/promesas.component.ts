import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then(usuarios => {
      console.log(usuarios);
    });
    // PROMESAS - IMPORTANTE!
    // const promesa = new Promise((resolve, reject) => {
    //   // esto se resuelve a tiempo real
    //   if (false) {
    //     resolve('Fin asíncrono');
    //   } else {
    //     reject ('Ha habido un error');
    //   }
    // });

    //  // esto es asíncrono
    // promesa
    //   .then( (mensaje) => {
    //     console.log(mensaje);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // console.log('Fin ngOnInit');
  }

  getUsuarios() {
    return new Promise(resolve => {

      fetch('https://reqres.in/api/users')
        .then( resp => resp.json())
        .then( body => resolve(body.data));

    });

  }

}
