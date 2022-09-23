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

  constructor() { }

  ngOnInit(): void {
    this.initIroColorPicker()
  }

  initIroColorPicker() {
    this.colorPicker = iro.ColorPicker('#picker', {
      // Set the size of the color picker
      width: 320,
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
