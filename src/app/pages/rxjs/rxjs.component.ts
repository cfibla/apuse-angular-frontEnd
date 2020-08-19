import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() {

    // RETORNAINTERVALO
    this.intervalSubs = this.retornaIntervalo().subscribe(
                                                  (valor) => console.log(valor)
                                                );

    // RETORNAOBSERVABLE
    // this.retornaObservable().pipe(
    //   // Si hay error, lo intenta 1 vez más.
    //   retry(1)
    // ).subscribe(
    //   valor => {
    //     console.log('subscribe: ', valor);
    //   },
    //   error => {
    //     console.error('Error: ', error);
    //   },
    //   () => {
    //     console.log('Obs$ FIN');
    //   }
    // );
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaObservable(): Observable<number> {
    let i = 0;

    const obs$ = new Observable<number>(observer => {

      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 5) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i === 2) {

          observer.error ('i es igual a 2');
        }
      }, 1000);
    });
    return obs$;
  }

  retornaIntervalo(): Observable<number> {
    return interval(100)
              .pipe(
                // Con map, se manipula el contenido de lo que llega
                map( (valor) => {return valor + 1}),
                // Si es par -> true, si no false
                filter( (valor) => (valor % 2 === 0) ? true : false),
                // Take dice cuantas emisiones del observable necesita
                // si no, serían infinitas
                take(100)
              );
  }

}
