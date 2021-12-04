import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.sass']
})
export class UploadComponent implements OnInit {
  key: string;
  name: string;
  url = '';
  file: File;

  constructor(file: File) {
    this.file = file;
  }

  ngOnInit(): void {
  }

}
