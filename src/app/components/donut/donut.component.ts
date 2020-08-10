import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';
@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: []
})
export class DonutComponent {

  @Input() title = 'Sin título';
  @Input('labels') doughnutChartLabels: Label[] = ['No assoliment', 'Assoliment suficient', 'Assoliment notable', 'Assoliment excel·lent'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [270, 350, 450, 100]
  ];
  public colors: Color[] = [
    {backgroundColor: ['red', 'blue', 'green', 'yellow']}
    // {backgroundColor: ['#9E120E', '#FF5800', '#FFb414', '#B4F3C4']}
  ];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
