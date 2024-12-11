import { Component } from '@angular/core';
import {CarbonFootprintComponent} from "../carbon-footprint/carbon-footprint.component";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    CarbonFootprintComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {

}
