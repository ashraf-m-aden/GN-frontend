import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
import { UploadComponent } from '../patients/upload/upload.component';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  url;
  constructor(private storage: AngularFireStorage
  ) { }

  deleteFileStorage(url: string) {
    return this.storage.refFromURL(url).delete();
  }
}
