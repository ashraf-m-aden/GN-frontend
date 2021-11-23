import { AnalyseType } from './../patients/tree-menu-page/type.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyseTypeTypeService {
  private readonly API_URL = "assets/data/menu-tree.json";
  isTblLoading = true;
  dataChange: BehaviorSubject<AnalyseType[]> = new BehaviorSubject<
    AnalyseType[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
  }
  get data(): AnalyseType[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAnalyseType(): any {
    return this.httpClient
      .get<AnalyseType[]>(this.API_URL);
      // .subscribe(
      //   (data) => {
      //     this.isTblLoading = false;
      //     this.dataChange.next(data);
      //   },
      //   (error: HttpErrorResponse) => {
      //     this.isTblLoading = false;
      //     console.log(error.name + " " + error.message);
      //   }
      // );
  }

}
