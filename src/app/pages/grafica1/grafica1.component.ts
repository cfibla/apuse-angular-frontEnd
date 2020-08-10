import { Component } from '@angular/core';

import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: []
})
export class Grafica1Component {

  public labels1: string[] = ['No assoliment', 'Assoliment suficient', 'Assoliment notable', 'Assoliment excel·lent'];
  public data1 = [
    [340, 350, 227, 256]
  ];

}
