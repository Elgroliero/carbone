import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TravelRepoService {
  private readonly BASE_URL: string = 'http://localhost:8080';

  constructor() { }
}
