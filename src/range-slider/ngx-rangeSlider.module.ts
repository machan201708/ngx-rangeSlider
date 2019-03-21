import {CommonModule} from "@angular/common";
import {NgModule} from '@angular/core';
import {RangeSliderComponent} from './range-slider.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RangeSliderComponent],
  entryComponents: [RangeSliderComponent],
  exports: [RangeSliderComponent],
  providers: []
})
export class NgxRangeSliderModule {

}