import { Component } from '@angular/core';
import {CarbonFootprintFormComponent} from "../carbon-footprint-form/carbon-footprint-form.component";
import {CarbonFootprintResultComponent} from "../carbon-footprint-result/carbon-footprint-result.component";

@Component({
  selector: 'app-carbon-footprint',
  standalone: true,
  imports: [
    CarbonFootprintFormComponent,
    CarbonFootprintResultComponent
  ],
  templateUrl: './carbon-footprint.component.html',
  styleUrl: './carbon-footprint.component.css'
})
export class CarbonFootprintComponent {
  ngOnInit() {
    console.log('Le composant a été initialisé.');
  }

  ngOnDestroy() {
    console.log('Le composant a été détruit.');
  }

  ngAfterContentInit() {
    console.log('Le contenu du composant a été initialisé.');
  }

  ngAfterContentChecked() {
    console.log('Le contenu du composant est vérifié.');
  }

  ngAfterViewInit() {
    console.log('La vue du composant a été initialisée.');
  }

  ngAfterViewChecked() {
    console.log('La vue du composant a été vérifiée.');
  }



}
