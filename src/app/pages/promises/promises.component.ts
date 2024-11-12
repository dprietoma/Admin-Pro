import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrl: './promises.component.css'
})
export class PromisesComponent implements OnInit {
  ngOnInit(): void {
    const promesa = new Promise<string>((resolve, reject) => {
      if (true) {
        resolve('hola mundo');
      } else {
        reject('Error');
      }
    });

    promesa
    .then((mensaje: string) => {
      console.log(mensaje);
    })
    .catch( error => console.log('Algo salio mal', error));

    console.log('Fin del Init');

    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
    });

  }

  getUsuarios(){
    return new Promise<string>((resolve, reject) => {
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => resolve(json))
    })
  }




}
