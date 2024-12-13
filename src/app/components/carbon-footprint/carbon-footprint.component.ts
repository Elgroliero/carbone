import {Component} from '@angular/core';
import {CarbonFootprintFormComponent} from "../carbon-footprint-form/carbon-footprint-form.component";
import {CarbonFootprintResultComponent} from "../carbon-footprint-result/carbon-footprint-result.component";
import {DecimalPipe, NgClass, NgStyle} from "@angular/common";
import {CarbonFootprintComputeService} from "../../services/carbon-footprint-compute.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-carbon-footprint',
  standalone: true,
  imports: [
    CarbonFootprintFormComponent,
    CarbonFootprintResultComponent,
    NgStyle,
    DecimalPipe,
    NgClass,
    HttpClientModule
  ],
  providers: [CarbonFootprintComputeService],
  templateUrl: './carbon-footprint.component.html',
  styleUrl: './carbon-footprint.component.css'
})
export class CarbonFootprintComponent {

  public readonly maxConsumption: number = 7
  public readonly minConsumption: number = 4
  public distanceKm!: number
  public consumptionFor100!: number
  public quantityCo2!: number
  public travels: any[] = []

  constructor(private cfpcs: CarbonFootprintComputeService) {
  }

  ngOnInit() {
    this.cfpcs.refreshTravels()
    this.cfpcs.travels$.subscribe(
      travels => this.travels = travels
    )
    this.calculateDistanceAndAverage()
  }

  public add100Km() {
    this.distanceKm += 100;
  }

  addTravel() {
    const distance = Math.ceil(Math.random() * 1000)
    const consumption = Math.ceil(Math.random() * 10)
    const quantityCo2 = distance * consumption / 100 * 2.3
    this.cfpcs.addTravel({distance: distance, consumptionFor100Km: consumption, quantityCo2: quantityCo2}).subscribe(
      response => console.log(response)
    )
    this.calculateDistanceAndAverage()
  }

  public calculateDistanceAndAverage() {
    const resume = this.cfpcs.getResumeTravels()
    this.distanceKm = resume.totalDistance;
    this.consumptionFor100 = resume.averageConsumption
    this.quantityCo2 = resume.quantityCo2Total
  }


}
