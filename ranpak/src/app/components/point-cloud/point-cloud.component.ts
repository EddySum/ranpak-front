import { Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-point-cloud',
  templateUrl: './point-cloud.component.html',
  styleUrls: ['./point-cloud.component.css']
})
export class PointCloudComponent implements OnInit {
  pcbFile: File | null = null;
  
  
  
  constructor() { }

  ngOnInit(): void {
  }

  async uploadPcb(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if(!fileList) throw Error('file list missing');

    this.pcbFile = fileList[0];
  }

 
}
