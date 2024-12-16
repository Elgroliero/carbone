export enum TravelType {
  Car = 'car',
  Train = 'train',
  Plane = 'plane'
}

export interface Travel {
  id?: number,
  distance: number,
  consumptionFor100Km: number,
  quantityCo2?: number,
  date?: Date,
  travelType?: TravelType,
  userId? : number

}
