import {AfterContentChecked, AfterViewChecked, AfterViewInit, Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {CarbonFootprintComputeService} from "../../services/carbon-footprint-compute.service";


@Component({
  selector: 'app-carbon-footprint-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './carbon-footprint-form.component.html',
  styleUrl: './carbon-footprint-form.component.css'
})
export class CarbonFootprintFormComponent {

  public travelForm: FormGroup = new FormGroup({})

  constructor(private carbonService: CarbonFootprintComputeService) {
  }

  ngOnInit() {
    this.travelForm = new FormGroup({
      distanceKm: new FormControl(null, [Validators.required, Validators.min(1)]),
      consumptionFor100: new FormControl(null),
      date: new FormControl(null, Validators.required),
      travelType: new FormControl('car', [Validators.pattern("(car|train|plane)"), control => this.travelTypeValidator(control)])
    })
  }


  public travelTypeValidator(control: AbstractControl) {

    const travelType = control.value

    if (travelType == 'car') {
      this.travelForm.get('consumptionFor100')?.setValidators([Validators.required, Validators.min(1)])

    } else {
      this.travelForm.get('consumptionFor100')?.clearValidators()
      this.travelForm.get('consumptionFor100')?.setValue(0)
    }

    this.travelForm.get('consumptionFor100')?.updateValueAndValidity()

    return null
  }

  onTravelFormSubmit() {
    console.log(this.travelForm)
    if (this.travelForm.valid) {
      this.carbonService.addTravel(this.travelForm.value)
    }

  }


}










