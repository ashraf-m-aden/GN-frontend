import { AnalyseTypeTypeService } from './../../../services/analyse-type.service';
import { Analyse } from './analyse.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-analyse',
  templateUrl: './add-analyse.component.html',
  styleUrls: ['./add-analyse.component.scss']
})
export class AddAnalyseComponent implements OnInit {
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
  newAnalyse = new Analyse('', '', '', '', '', '', '', '');
  array1 = [{
    name: "SANGUIN",
    id: "21",
  }, {
    name: "NON-SANGUIN",
    id: "22",
  }, {
    name: "RADIOLOGIQUE",
    id: "23",
  }]; // l'array du type 1
  array2 = [{
    name: "Hematologique",
    id: "211",
    idParent: 21
  }, {
    name: "Biochimique",
    id: "212", idParent: 21
  }, {
    name: "Bilan Hormonal",
    id: "212", idParent: 21
  },
  {
    name: "Infectieux",
    id: "212", idParent: 21
  }, {
    name: "Urinaire",
    id: "212", idParent: 21
  }, {
    name: "Fecale",
    id: "212", idParent: 21
  }, {
    name: "Standard",
    id: "212", idParent: 21
  }, {
    name: "TDM",
    id: "212", idParent: 21
  }, {
    name: "IRM",
    id: "212", idParent: 21
  }]; // l'array du type 2
  array3 = [{
    name: "Numeration",
    id: "212", idParent: 21
  }, {
    name: "Hemostase",
    id: "212", idParent: 21
  }, {
    name: "Fonction renale",
    id: "212", idParent: 21
  }, {
    name: "Fonction hepatique",
    id: "212", idParent: 21
  }, {
    name: "Bilan pancreatique",
    id: "212", idParent: 21
  },
  {
    name: "Bilan lipidique",
    id: "212", idParent: 21
  }, {
    name: "Diabete",
    id: "212", idParent: 21
  }, {
    name: "Inflammatoire",
    id: "212", idParent: 21
  }, {
    name: "Thyroide",
    id: "212", idParent: 21
  }, {
    name: "Surennale",
    id: "212", idParent: 21
  }, {
    name: "Reproduction",
    id: "212", idParent: 21
  }, {
    name: "Viral",
    id: "212", idParent: 21
  }, {
    name: "Parasitaire",
    id: "212", idParent: 21
  }, {
    name: "Bacterien",
    id: "212", idParent: 21
  }, {
    name: "Proteinurie",
    id: "212", idParent: 21
  }, {
    name: "Albuminurie",
    id: "212", idParent: 21
  }, {
    name: "ECBU",
    id: "212", idParent: 21
  }, {
    name: "KAOP",
    id: "212", idParent: 21
  }, {
    name: "Coproculture",
    id: "212", idParent: 21
  }, {
    name: "Thorax",
    id: "212", idParent: 21
  }, {
    name: "ASP",
    id: "212", idParent: 21
  }, {
    name: "Bassin",
    id: "212", idParent: 21
  }, {
    name: "OPN",
    id: "212", idParent: 21
  }, {
    name: "Arcad dentaire",
    id: "212", idParent: 21
  }, {
    name: "Extremité",
    id: "212", idParent: 21
  }, {
    name: "Cerebrale",
    id: "212", idParent: 21
  }, {
    name: "Cervicale",
    id: "212", idParent: 21
  },
  {
    name: "Thoracique",
    id: "212", idParent: 21
  }, {
    name: "Abdominale",
    id: "212", idParent: 21
  },
  {
    name: "Extremité",
    id: "212", idParent: 21
  }
    , {
    name: "Cerebrale",
    id: "212", idParent: 21
  }, {
    name: "Cervicale",
    id: "212", idParent: 21
  },
  {
    name: "Thoracique",
    id: "212", idParent: 21
  }, {
    name: "Abdominale",
    id: "212", idParent: 21
  },
  {
    name: "Extremité",
    id: "212", idParent: 21
  }]; // l'array du type 3
  array4 = [
    , {
      name: "NFS",
      id: "212", idParent: 21
    }, {
      name: "TP , TCK, INR,",
      id: "212", idParent: 21
    },
    {
      name: "D-dimere",
      id: "212", idParent: 21
    }, {
      name: "iono",
      id: "212", idParent: 21
    },
    {
      name: "calcium",
      id: "212", idParent: 21
    },
    {
      name: "Urée, creat",
      id: "212", idParent: 21
    },
    {
      name: "ASAT, ALAT",
      id: "212", idParent: 21
    },
    {
      name: "BT, BC",
      id: "212", idParent: 21
    },
    {
      name: "GT, PAL",
      id: "212", idParent: 21
    },
    {
      name: "Proteine totale",
      id: "212", idParent: 21
    },
    {
      name: "Albumine",
      id: "212", idParent: 21
    }, {
      name: "Amylase",
      id: "212", idParent: 21
    }, {
      name: "Lipasémie",
      id: "212", idParent: 21
    }, {
      name: "Triglycéride",
      id: "212", idParent: 21
    }, {
      name: "Cholestérol total",
      id: "212", idParent: 21
    }, {
      name: "HDL-C",
      id: "212", idParent: 21
    }, {
      name: "LDL-C",
      id: "212", idParent: 21
    }, {
      name: "Glycemie a jeun",
      id: "212", idParent: 21
    }, {
      name: "Hemoglobine glyquée",
      id: "212", idParent: 21
    }, {
      name: "autre",
      id: "212", idParent: 21
    }, {
      name: "CRP",
      id: "212", idParent: 21
    }, {
      name: "TSH",
      id: "212", idParent: 21
    }, {
      name: "T4 L",
      id: "212", idParent: 21
    }, {
      name: "T3",
      id: "212", idParent: 21
    }, {
      name: "PTH",
      id: "212", idParent: 21
    }, {
      name: "Aldosterone",
      id: "212", idParent: 21
    }, {
      name: "cortisol",
      id: "212", idParent: 21
    }, {
      name: "ADH",
      id: "212", idParent: 21
    }, {
      name: "FSH",
      id: "212", idParent: 21
    }, {
      name: "LH",
      id: "212", idParent: 21
    }, {
      name: "Estrogene total",
      id: "212", idParent: 21
    }, {
      name: "Prolactine ",
      id: "212", idParent: 21
    }, {
      name: "Testosterone",
      id: "212", idParent: 21
    }, {
      name: "IgMAnti-HAV",
      id: "212", idParent: 21
    }, {
      name: "IgG Anti-HAV",
      id: "212", idParent: 21
    }, {
      name: "Ag HBs",
      id: "212", idParent: 21
    }, {
      name: "Ac Anti-HBs",
      id: "212", idParent: 21
    }, {
      name: "Ac Anti-HBe",
      id: "212", idParent: 21
    },
    {
      name: "Ac Anti-HBc",
      id: "212", idParent: 21
    }, {
      name: "Ac Anti-HCV",
      id: "212", idParent: 21
    }, {
      name: "Seologie α",
      id: "212", idParent: 21
    }, {
      name: "CMV",
      id: "212", idParent: 21
    }, {
      name: "HSV",
      id: "212", idParent: 21
    },
    , {
      name: "Serologie rubeole",
      id: "212", idParent: 21
    },
    , {
      name: "Serologie toxoplasmose",
      id: "212", idParent: 21
    },
    , {
      name: "Goutte epaisse ",
      id: "212", idParent: 21
    },
    , {
      name: "Hemoculture aerobique",
      id: "212", idParent: 21
    },
    {
      name: "Hemoculture anaerobique",
      id: "212", idParent: 21
    }

  ]; // l'array du type 4
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
      analyse: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
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
    this.showNotification(
      "bg-black",
      "Edit Record Successfully",
      "bottom",
      "right"
    );
  }
  editRow(row, rowIndex, content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
    this.editForm.setValue({
      analyse: row.analyse,
    });
    this.selectedRowData = row;
  }
  getId(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  checkAnalyse() {

    // this.router.navigateByUrl("/doctor/patients/analyse");
    window.open("#/doctor/patients/analyse", "_blank");

  }
  deleteRow(row) {
    this.data = this.arrayRemove(this.data, row.id);
    this.showNotification(
      "bg-red",
      "Delete Record Successfully",
      "bottom",
      "right"
    );
  }
  arrayRemove(array, id) {
    return array.filter((element) => {
      return element.id !== id;
    });
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this._snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
// tslint:disable-next-line:class-name
export interface selectRowInterface {
  analyse: string;
}
