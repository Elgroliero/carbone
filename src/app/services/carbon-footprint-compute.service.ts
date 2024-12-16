import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Travel, TravelType} from "../models/travel";
import {BehaviorSubject, map, Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintComputeService {

  private travelsSubject = new BehaviorSubject<Travel[]>([])
  public travels$ = this.travelsSubject.asObservable()

  private readonly BASE_URL: string = "http://localhost:8080"

  constructor(private http: HttpClient) {
  }

  public refreshTravels() {
    this.getTravels().subscribe(
      travels => {
        this.travelsSubject.next(travels)
      }
    )
  }

  public getTravels() {
    return this.http.get<any[]>(`${this.BASE_URL}/tousMesVoyages/1`).pipe(
      map(
        response => response.map(
          item => {
            const t: Travel = {
              distance: item.distance,
              consumptionFor100Km: item.consommation,
              travelType: item.travelType,
              quantityCo2: item.co2
            }
            return t;
          }
        )
      )
    )
  }

  public addTravel(travel: Travel) {
    console.log(travel)
    // let travelTest: Travel = {travelType: TravelType.Plane, distance: 100, consumptionFor100Km: 10}
    return this.calculateCo2(travel).pipe(
      switchMap(
        quantityCo2 => {

          const data = {
            consommation: travel.consumptionFor100Km ?? 0,
            userId: 1,
            co2: quantityCo2,
            travelType: travel.travelType,
            distance: travel.distance
          }

          return this.http.post<{ success: boolean }>(`${this.BASE_URL}/ajouterUnVoyage`, data).pipe(
            switchMap(
              response => {
                if (response.success) {
                  this.refreshTravels()
                }
                return this.travels$
              }
            )
          )
        }
      )
    )

  }

  public calculateCo2(travel: Travel): Observable<number> {

    switch (travel.travelType) {
      case TravelType.Car:
        return this.getQuantityCo2ByCar(travel)
      case TravelType.Plane:
        return this.getQuantityCo2ByPlane(travel)
      default:
        return this.getQuantityCo2ByTrain(travel)
    }
  }


  public getQuantityCo2ByCar(travel: Travel): Observable<number> {
    const params = new HttpParams()
      .set('distanceKm', travel.distance)
      .set('consommationPour100Km', travel.consumptionFor100Km)

    return this.http.get<{ empreinteCarbone: number }>(`${this.BASE_URL}/calculerTrajetVoiture`, {params}).pipe(
      map(
        response => response.empreinteCarbone
      )
    )
  }

  public getQuantityCo2ByTrain(travel: Travel) {
    const params = new HttpParams()
      .set('distanceKm', travel.distance)

    return this.http.get<{ empreinteCarbone: number }>(`${this.BASE_URL}/calculerTrajetTrain`, {params}).pipe(
      map(
        response => response.empreinteCarbone
      )
    )
  }

  public getQuantityCo2ByPlane(travel: Travel) {
    const params = new HttpParams()
      .set('distanceKm', travel.distance)

    return this.http.get<{ empreinteCarbone: number }>(`${this.BASE_URL}/calculerTrajetAvion`, {params}).pipe(
      map(
        response => response.empreinteCarbone
      )
    )
  }


  public getResumeTravels() {
    let totalDistance = 0;
    let averageConsumption = 0;
    let quantityCo2Total = 0;
    //
    // for (const travel of this.travels) {
    //   totalDistance += travel.distanceKm;
    //   averageConsumption += travel.consumptionFor100 * travel.distanceKm
    //   quantityCo2Total += travel.quantityCo2
    // }

    return {
      "totalDistance": totalDistance,
      "averageConsumption": averageConsumption / totalDistance,
      "quantityCo2Total": quantityCo2Total
    }
  }


}
