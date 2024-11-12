import { Component, OnDestroy } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css'
})
export class RxjsComponent implements OnDestroy {


  public intervalSubs: Subscription;

  constructor() {
    // this.retornaObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   valor => console.log('Subs:', valor),
    //   error => console.error('Error:', error),
    //   () => console.log('Obs Completo')
    // );

   this.intervalSubs = this.retornarIntervalo().subscribe( console.log )
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornarIntervalo(): Observable<number> {
    return interval(100)
    .pipe(
      take(10),
      map( valor => { return valor + 1; }),
      filter( valor => ( valor % 2 === 0 ) ? true : false),
    );
  }


  retornaObservable(): Observable<number>{
    let i = -1;

    return new Observable<number>( observer => {
      
      const intervalo = setInterval( () => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval( intervalo );
          observer.complete();
        }


        if (i === 2) {
          observer.error('i llego al error');
        }
       
      }, 1000);

    })
  }


}
