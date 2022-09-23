import { Component, Input, OnInit } from '@angular/core';
import iro from '@jaames/iro';

@Component({
  selector: 'app-point-cloud-viewer',
  templateUrl: './point-cloud-viewer.component.html',
  styleUrls: ['./point-cloud-viewer.component.css']
})
export class PointCloudViewerComponent implements OnInit {
  @Input() pcbFile!: File;

  colorPicker: iro.ColorPicker | null = null; 

  selectedColor = ''

  pointSize: number | null = null;
  fov: number | null = 75
  cameraZ: number | null = null;
  cameraY: number | null = null;
  near: number | null = 0.1;
  far: number | null = 1000;

  constructor() { }

  ngOnInit(): void {
    this.initIroColorPicker()
  }

  initIroColorPicker() {
    this.colorPicker = iro.ColorPicker('#picker', {
      width: 350,
      boxHeight: 252,
      margin: 24,
      sliderSize: 12,
      layout: [
        {  
          component: iro.ui.Box,
          options: {}
        },
        { 
          component: iro.ui.Slider,
          options: {
            // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
            sliderType: 'hue'
          }
        }
      ],
      // Set the initial color to pure red
      color: "#fff"
    })

    this.colorPicker?.on('color:change', (color: iro.Color) => { this.onColorChange(color) });
  }
  
  onColorChange(color: iro.Color) {
    const { hexString } = color;
    this.selectedColor = hexString;
  }

  ngOnDestroy() {
    this.colorPicker?.off('color:change', this.onColorChange);
  }

}
