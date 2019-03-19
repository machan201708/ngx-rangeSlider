import {
  Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter, ElementRef,
  Renderer2
} from '@angular/core';

export const RANGEMODE = {
  single: 1,
  double: 2
};

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.css']
})
export class RangeSliderComponent implements OnInit, OnChanges {
  @Input() data;
  @Input() mode: number = RANGEMODE.single;
  @Input() isPercent: boolean = true; // 是否为百分比显示
  @Input() max: number = 100;
  @Input() min: number = 0;

  @Input() color: string = '#000000';

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  width: string = '50%';

  percentContainer;
  colorLine;
  optHandle;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    const data = changes['data'];
    if (data && data.currentValue) {
      const value = data.currentValue || 100;
      this.width = value + '%';
    }

    const mode = changes['mode'];
    if (mode && mode.currentValue) {
      this.mode = mode.currentValue || 1;
    }

    const color = changes['color'];
    if (color && color.currentValue) {
      this.color = color.currentValue || '#000000';
    }

    this.initValue();
  }

  initValue() {
    if (this.mode === RANGEMODE.double) { // 两端操作模式
    } else {   // 默认单操作
      if (this.isPercent) {

      }
    }
    this.percentContainer = this.elementRef.nativeElement.querySelector(`#percentContainer`);
    this.colorLine = this.elementRef.nativeElement.querySelector(`#colorLine`);
    this.optHandle = this.elementRef.nativeElement.querySelector(`#optHandle`);
    this.formatStyles();
  }

  formatStyles() {
    const left = `calc(${this.width} - 10px)`;
    this.renderer.setStyle(this.colorLine, 'width', this.width);
    this.renderer.setStyle(this.colorLine, 'background', this.color);
    this.renderer.setStyle(this.colorLine, 'opacity', this.data.opacity);
    this.renderer.setStyle(this.optHandle, 'left', left);
  }

  mousedown(event: any) {
    const percentContainerLeft = this.percentContainer.offsetLeft,
      percentContainerWidth = this.percentContainer.offsetWidth,
      percentContainerRight = percentContainerWidth + percentContainerLeft;
    // console.log(percentContainerLeft, percentContainerRight);
    document.onmousemove = (e) => {
      const left = e.clientX;
      let percent = 0;
      if (left >= percentContainerLeft && left <= percentContainerRight) {
        percent = Math.round((left - percentContainerLeft) / percentContainerWidth * 100);
      } else if (left < percentContainerLeft) {
        percent = 0;
      } else if (left > percentContainerRight) {
        percent = 100;
      }
      this.width = percent + '%';
      this.formatStyles();
      // this.valueChange.emit(this.data);
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }
}
