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

  pushFileToStorage(fileUpload: UploadComponent, basePath): Observable<number> {
    const filePath = `${basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  deleteFileStorage(url: string) {
    return this.storage.refFromURL(url).delete();
  }
}
