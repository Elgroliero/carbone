import {Component} from '@angular/core';
import {CarbonFootprintFormComponent} from "../carbon-footprint-form/carbon-footprint-form.component";
import {CarbonFootprintResultComponent} from "../carbon-footprint-result/carbon-footprint-result.component";
import {DecimalPipe, NgClass, NgStyle} from "@angular/common";

@Component({
  selector: 'app-carbon-footprint',
  standalone: true,
  imports: [
    CarbonFootprintFormComponent,
    CarbonFootprintResultComponent,
    NgStyle,
    DecimalPipe,
    NgClass
  ],
  templateUrl: './carbon-footprint.component.html',
  styleUrl: './carbon-footprint.component.css'
})
export class CarbonFootprintComponent {

  public readonly maxConsumption: number = 7
  public readonly minConsumption: number = 4
  public distanceKm!: number
  public consumptionFor100!: number
  public travels: any[] = []

  ngOnInit() {
    this.distanceKm = 50;
    this.consumptionFor100 = 5;

    this.travels = [
      {distanceKm: 50, consumptionFor100: 5},
      {distanceKm: 150, consumptionFor100: 6},
      {distanceKm: 250, consumptionFor100: 7},
      {distanceKm: 350, consumptionFor100: 8},
      {distanceKm: 450, consumptionFor100: 9}
    ]

    this.calculateDistanceAndAverage()
  }

  public add100Km() {
    this.distanceKm += 100;
  }

  addTravel() {
    const distance = Math.floor(Math.random() * 1000)
    const consumption = Math.floor(Math.random() * 10)
    this.travels.push({distanceKm: distance, consumptionFor100: consumption})
    this.calculateDistanceAndAverage()
  }

  public calculateDistanceAndAverage() {
    let totalDistance  = 0;
    let average = 0;

    for(const travel of this.travels){
      totalDistance += travel.distanceKm;
      average += travel.consumptionFor100
    }
    this.distanceKm = totalDistance;
    this.consumptionFor100 = average / this.travels.length
  }


}
