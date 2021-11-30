import { Exploration } from './../analyse.model';
import { AnalyseTypeTypeService } from './../../../services/analyse-type.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-analyse',
  templateUrl: './add-analyse.component.html',
  styleUrls: ['./add-analyse.component.scss']
})
export class AddAnalyseComponent implements OnInit {

  @Output() analyseArray = new EventEmitter<Exploration>();
  selectedRowData: selectRowInterface;

  rows = [];
  data = [];
  filteredData = [];
  editForm: FormGroup;
  register: FormGroup;
  selectedOption: string;
  index: number;
  id: number;
  isLinear = false;
  HFormGroup1: FormGroup;
  newAnalyse: Exploration = { _id: undefined,
     analyses: [], typeI: '', typeII: '', typeIII: '', typeIV: '', resultat: false, resultatUrl: '' };
  array1 = [{
    name: "SANGUIN",
    id: 21,
  }, {
    name: "NON-SANGUIN",
    id: 22,
  }, {
    name: "RADIOLOGIQUE",
    id: 23,
  }]; // l'array du type 1
  array2 = [
    {
      name: "Hematologique",
      id: 211,
      idParent: 21
    }, {
      name: "Biochimique",
      id: 212, idParent: 21
    }, {
      name: "Bilan Hormonal",
      id: 213, idParent: 21
    },
    {
      name: "Infectieux",
      id: 214, idParent: 21
    }, {
      name: "Urinaire",
      id: 221, idParent: 22
    }, {
      name: "Fecale",
      id: 222, idParent: 22
    }, {
      name: "Standard",
      id: 231, idParent: 23
    }, {
      name: "TDM",
      id: 232, idParent: 23
    }, {
      name: "IRM",
      id: 233, idParent: 23
    }]; // l'array du type 2
  array3 = [
    {
      name: "Numeration",
      id: 2111, idParent: 211
    }, {
      name: "Hemostase",
      id: 2112, idParent: 211
    }, {
      name: "Fonction renale",
      id: 2121, idParent: 212
    }, {
      name: "Fonction hepatique",
      id: 2122, idParent: 212
    }, {
      name: "Bilan pancreatique",
      id: 2123, idParent: 212
    },
    {
      name: "Bilan lipidique",
      id: 2124, idParent: 212
    }, {
      name: "Diabete",
      id: 2125, idParent: 212
    }, {
      name: "Inflammatoire",
      id: 2126, idParent: 212
    }, {
      name: "Thyroide",
      id: 2131, idParent: 213
    }, {
      name: "Surennale",
      id: 2132, idParent: 213
    }, {
      name: "Reproduction",
      id: 2133, idParent: 213
    }, {
      name: "Viral",
      id: 2141, idParent: 214
    }, {
      name: "Parasitaire",
      id: 2142, idParent: 214
    }, {
      name: "Bacterien",
      id: 2143, idParent: 214
    }, {
      name: "Proteinurie",
      id: 2211, idParent: 221
    }, {
      name: "Albuminurie",
      id: 2212, idParent: 221
    }, {
      name: "ECBU",
      id: 2213, idParent: 221
    }, {
      name: "KAOP",
      id: 2221, idParent: 222
    }, {
      name: "Coproculture",
      id: 2222, idParent: 222
    }, {
      name: "Thorax",
      id: 2311, idParent: 231
    }, {
      name: "ASP",
      id: 2312, idParent: 231
    }, {
      name: "Bassin",
      id: 2313, idParent: 231
    }, {
      name: "OPN",
      id: 2314, idParent: 231
    }, {
      name: "Arcad dentaire",
      id: 2315, idParent: 231
    }, {
      name: "Extremité",
      id: 2316, idParent: 231
    }, {
      name: "Cerebrale",
      id: 2321, idParent: 232
    }, {
      name: "Cervicale",
      id: 2322, idParent: 232
    },
    {
      name: "Thoracique",
      id: 2323, idParent: 232
    }, {
      name: "Abdominale",
      id: 2324, idParent: 232
    },
    {
      name: "Extremité",
      id: 2325, idParent: 232
    }
    , {
      name: "Cerebrale",
      id: 2331, idParent: 233
    }, {
      name: "Cervicale",
      id: 2332, idParent: 233
    },
    {
      name: "Thoracique",
      id: 2333, idParent: 233
    }, {
      name: "Abdominale",
      id: 2334, idParent: 233
    },
    {
      name: "Extremité",
      id: 2335, idParent: 235
    }]; // l'array du type 3
  array4 = [
    , {
      name: "NFS",
      id: 21111, idParent: 2111
    }, {
      name: "TP , TCK, INR,",
      id: 21121, idParent: 2112
    },
    {
      name: "D-dimere",
      id: 21122, idParent: 2112
    }, {
      name: "iono",
      id: 21211, idParent: 2121
    },
    {
      name: "calcium",
      id: 21212, idParent: 2121
    },
    {
      name: "Urée, creat",
      id: 21213, idParent: 2121
    },
    {
      name: "ASAT, ALAT",
      id: 21221, idParent: 2122
    },
    {
      name: "BT, BC",
      id: 21222, idParent: 2122
    },
    {
      name: "GT, PAL",
      id: 21223, idParent: 2122
    },
    {
      name: "Proteine totale",
      id: 21224, idParent: 2122
    },
    {
      name: "Albumine",
      id: 21225, idParent: 2122
    }, {
      name: "Amylase",
      id: 21231, idParent: 2123
    }, {
      name: "Lipasémie",
      id: 21232, idParent: 231
    }, {
      name: "Triglycéride",
      id: 21241, idParent: 2124
    }, {
      name: "Cholestérol total",
      id: 21242, idParent: 2124
    }, {
      name: "HDL-C",
      id: 21243, idParent: 2124
    }, {
      name: "LDL-C",
      id: 21244, idParent: 2124
    }, {
      name: "Glycemie a jeun",
      id: 21251, idParent: 2125
    }, {
      name: "Hemoglobine glyquée",
      id: 21252, idParent: 2125
    }, {
      name: "autre",
      id: 21253, idParent: 2125
    }, {
      name: "CRP",
      id: 21261, idParent: 2126
    }, {
      name: "TSH",
      id: 21311, idParent: 2131
    }, {
      name: "T4 L",
      id: 21312, idParent: 2131
    }, {
      name: "T3",
      id: 21313, idParent: 2131
    }, {
      name: "PTH",
      id: 21314, idParent: 2131
    }, {
      name: "Aldosterone",
      id: 21321, idParent: 2132
    }, {
      name: "cortisol",
      id: 21322, idParent: 2132
    }, {
      name: "ADH",
      id: 21323, idParent: 2132
    }, {
      name: "FSH",
      id: 21331, idParent: 2133
    }, {
      name: "LH",
      id: 21332, idParent: 2133
    }, {
      name: "Estrogene total",
      id: 21333, idParent: 2133
    }, {
      name: "Prolactine ",
      id: 21334, idParent: 2133
    }, {
      name: "Testosterone",
      id: 21335, idParent: 2133
    }, {
      name: "IgMAnti-HAV",
      id: 21411, idParent: 2141
    }, {
      name: "IgG Anti-HAV",
      id: 21412, idParent: 2141
    }, {
      name: "Ag HBs",
      id: 21413, idParent: 2141
    }, {
      name: "Ac Anti-HBs",
      id: 21414, idParent: 2141
    }, {
      name: "Ac Anti-HBe",
      id: 21415, idParent: 2141
    },
    {
      name: "Ac Anti-HBc",
      id: 21416, idParent: 2141
    }, {
      name: "Ac Anti-HCV",
      id: 21417, idParent: 2141
    }, {
      name: "Seologie α",
      id: 21418, idParent: 2141
    }, {
      name: "CMV",
      id: 21419, idParent: 2141
    }, {
      name: "HSV",
      id: 214110, idParent: 2141
    },
    , {
      name: "Serologie rubeole",
      id: 214111, idParent: 2141
    },
    , {
      name: "Serologie toxoplasmose",
      id: 214112, idParent: 2141
    },
    , {
      name: "Goutte epaisse ",
      id: 21421, idParent: 2142
    },
    , {
      name: "Hemoculture aerobique",
      id: 21431, idParent: 2143
    },
    {
      name: "Hemoculture anaerobique",
      id: 21432, idParent: 2143
    }

  ]; // l'array du type 4

  filteredArray1 = []; // les array filtré une fois le type choisis
  filteredArray2 = [];
  filteredArray3 = [];
  // tslint:disable-next-line:variable-name
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private modalService: NgbModal,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private analyseS: AnalyseTypeTypeService
  ) {
    this.editForm = this.fb.group({
      analyse: new FormControl(),
    });
  }
  ngOnInit() {

    this.register = this.fb.group({
      analyse: ["", [Validators.required]],
    });
  }

  addRow(content) {
    this.modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      windowClass: "modal"
    });
    this.register.patchValue({
      id: this.getId(10, 100),
    });
  }
  onAddRowSave(form: FormGroup) {
    this.data.push(form.value);
    this.data = [...this.data];
    // console.log(this.data);
    this.newAnalyse.analyses = this.data;
    this.analyseArray.emit(this.newAnalyse);
    form.reset();
    this.modalService.dismissAll();
    this.showNotification(
      "bg-green",
      "Add Record Successfully",
      "bottom",
      "right"
    );
  }
  onEditSave(form: FormGroup) {
    this.data = this.data.filter((value, key) => {
      if (value.id === form.value.id) {
        value.analyse = form.value.analyse;
      }
      this.modalService.dismissAll();
      return true;
    });
    this.newAnalyse.analyses = this.data;
    this.analyseArray.emit(this.newAnalyse);
    this.showNotification(
      "bg-black",
      "Edit Record Successfully",
      "bottom",
      "right"
    );
  }

  getId(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  checkAnalyse() {

    // this.router.navigateByUrl("/admin/patients/analyse");
    window.open("#/admin/patients/analyse", "_blank");

  }
  deleteRow(item) {
    this.data = this.arrayRemove(this.data, item);
    this.showNotification(
      "bg-red",
      "Delete Record Successfully",
      "bottom",
      "right"
    );
    this.newAnalyse.analyses = this.data;
    this.analyseArray.emit(this.newAnalyse);
  }
  arrayRemove(array, data) {
    return array.filter(item => {
      return item !== data;
    });
  }
  editRow(data, content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
    this.editForm.setValue({
      analyse: data.analyse,
    });
    this.selectedRowData = data;
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this._snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }


  selectType(id) { // apres avoir selectionné le type cett fonction filtre l'array 2
    this.filteredArray1 = this.array2.filter(item => {
      return item.idParent === id;
    });
    this.filteredArray2 = [];
    this.filteredArray3 = [];
  }
  selectType2(id) { // apres avoir selectionné le type cett fonction filtre l'array 2
    this.filteredArray2 = this.array3.filter(item => {
      return item.idParent === id;
    });
    this.filteredArray3 = [];

  }
  selectType3(id) { // apres avoir selectionné le type cett fonction filtre l'array 2
    this.filteredArray3 = this.array4.filter(item => {
      return item.idParent === id;
    });
  }
}

// tslint:disable-next-line:class-name
export interface selectRowInterface {
  analyse: string;
}
