import {
  Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter, ElementRef,
  Renderer2
} from '@angular/core';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.css']
})
export class RangeSliderComponent implements OnInit, OnChanges {
  @Input() data;
  @Input() type: any;

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  width: string = '50%';

  color: string = '#000000';

  percentContainer;
  colorLine;
  optHandle;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    const data = changes['data'];
    if (data && data.currentValue) {
      this.width = data.currentValue.opacity * 100 + '%';
    }
    const type = changes['type'];
    if (type && type.currentValue) {
      this.type = type.currentValue;
    }
    this.initValue();
  }

  initValue() {
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
    const percentContainerLeft = (document.documentElement.scrollWidth || document.body.scrollWidth) - 207,
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
      this.data.opacity = percent / 100;
      this.valueChange.emit(this.data);
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }

  countPercent(event: any) {
    // console.log(event);
    const percentContainerLeft = (document.documentElement.scrollWidth || document.body.scrollWidth) - 207,
      percentContainerWidth = this.percentContainer.offsetWidth,
      percentContainerRight = percentContainerWidth + percentContainerLeft,
      left = event.clientX;
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
    this.data.opacity = percent / 100;
    this.valueChange.emit(this.data);
  }

}
