import { NgxSpinnerService } from "ngx-spinner";

export class BaseComponent {
  /**
   *
   */
  constructor(private spinner: NgxSpinnerService) {
  }
  showSpinner(spinnerType : SpinnerType) {
    this.spinner.show(spinnerType)
  }

  hideSpinner(spinnerType: SpinnerType) {
    this.spinner.hide(spinnerType)
  }
}

export enum SpinnerType {
  BallRunningDots = "spinner2",
  BallScaleMultiple = "spinner3",
  Ball8bits = "spinner1",
  AkLab = "spinner4"
}
