import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintComputeService {

  private travels: any[]

  constructor() {
    this.travels = [
      {distanceKm: 50, consumptionFor100: 5, quantityCo2: 5.75},
      {distanceKm: 150, consumptionFor100: 6, quantityCo2: 20.7},
      {distanceKm: 250, consumptionFor100: 7, quantityCo2: 40.25},
      {distanceKm: 350, consumptionFor100: 8, quantityCo2: 64.4},
      {distanceKm: 450, consumptionFor100: 9, quantityCo2: 93.15}
    ]
  }

  public getTravels() {
    return this.travels;
  }

  public addTravel(travel: any) {
    switch (travel.travelType){
      case 'car':
        travel.quantityCo2 = Math.ceil(travel.distanceKm * travel.consumptionFor100 * 2.3 / 100)
        break;
      case 'train':
        travel.quantityCo2 = Math.ceil(travel.distanceKm * 0.03)
        break;
      case 'plane':
        travel.quantityCo2 = Math.ceil(travel.distanceKm * 200)
        break;
    }

    this.travels.push(travel)
  }

  public getResumeTravels() {
    let totalDistance = 0;
    let averageConsumption = 0;
    let quantityCo2Total = 0;

    for (const travel of this.travels) {
      totalDistance += travel.distanceKm;
      averageConsumption += travel.consumptionFor100 * travel.distanceKm
      quantityCo2Total += travel.quantityCo2
    }

    return {
      "totalDistance": totalDistance,
      "averageConsumption": averageConsumption / totalDistance,
      "quantityCo2Total" : quantityCo2Total
    }
  }


}
