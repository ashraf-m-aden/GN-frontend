import { AuthService } from 'src/app/core/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";

import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';
import { BehaviorSubject } from 'rxjs';
import { Patient } from '../allpatients/patient.model';
import { PatientService } from '../../services/patient.service';

interface TreeMenu {
  name: string;
  disabled?: boolean;
  id: string;
  children?: TreeMenu[];
}
// const TREE_DATA: TreeMenu[] = [
//   {
//     name: 'Consultation',
//     id: "1",
//     children: [{ name: 'GN', id: "11" }, { name: 'Externe', id: "12" },
//     { name: 'Consulter', id: "13" }]
//   },
//   {
//     name: 'Exploration',
//     id: "2",
//     children: [
//       {
//         name: 'Biologique',
//         id: "21",
//         children: [{ name: 'Hemathologie', id: "211" }, { name: 'Biochimie', id: "212" }]
//       },
//       {
//         name: 'Radiologique',
//         id: "22",
//         children: [{ name: 'Standard', id: "221" }, { name: 'TDM', id: "222" }, { name: 'IRM', id: "223" }]
//       }
//     ]
//   },
//   {
//     name: 'Commentaires',
//     id: '3'
//   }
// ];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  id: string;
  level: number;
  disabled: boolean;
}

@Component({
  selector: "app-patient-profile",
  templateUrl: "./patient-profile.component.html",
  styleUrls: ["./patient-profile.component.scss"],
})
export class PatientProfileComponent implements AfterViewInit, OnInit, OnDestroy {
  @Output() page = new EventEmitter<string>();
  @Output() type = new EventEmitter<string>();
  @Output() id = new EventEmitter<string>();
  private readonly API_URL = "assets/data/menu-tree.json";
  isTblLoading = true;
  dataChange: BehaviorSubject<TreeMenu[]> = new BehaviorSubject<
    TreeMenu[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  subs: UnsubscribeOnDestroyAdapter;
  patient: Patient;
  idPatient: string;
  private transformer = (node: TreeMenu, level: number): ExampleFlatNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    id: node.id,
    level,
    disabled: !!node.disabled
  })

  // tslint:disable-next-line:member-ordering
  selectListSelection = new SelectionModel<ExampleFlatNode>();

  // tslint:disable-next-line:member-ordering
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  );

  // tslint:disable-next-line:member-ordering
  treeFlattener = new NzTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  // tslint:disable-next-line:member-ordering
  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);
  // tslint:disable-next-line:max-line-length
  constructor(private httpClient: HttpClient, private router: Router,
              private authS: AuthService, private patientService: PatientService, private activated: ActivatedRoute) {
    //  this.dataSource.setData(TREE_DATA);
    activated.params.subscribe((data) => {
      this.idPatient = data.id;
      localStorage.setItem('idPatient', data.id);
      this.patientService.getOnePatient(data.id).subscribe((patient: Patient) => {
        this.patient = patient;
      }, (error: HttpErrorResponse) => {
        console.log(error.status);

        if (error.status === 401) {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('token');
          this.router.navigate(["/authentication/signin"]);        }
      });
    });
    this.getAllTreeMenu();

  }

  ngOnInit(): void {


  }
  get data(): TreeMenu[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllTreeMenu(): void {
    this.httpClient
      .get<TreeMenu[]>(this.API_URL)
      .subscribe(
        (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data);
          this.dataSource.setData(data);
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
      );
  }

  hasChild = (_: number, node: ExampleFlatNode): boolean => node.expandable;

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   // tslint:disable-next-line:no-non-null-assertion
    //   this.treeControl.expand(this.getNode('Exploration')!);
    // }, 300);
  }

  getNode(name: string): ExampleFlatNode | null {
    return this.treeControl.dataNodes.find(n => n.name === name) || null;
  }

  changePage(page, type) {
    this.page.emit(page);
    this.type.emit(type);


  }
  checkConsultation(event) {
    console.log(event);

    this.id.emit(event.value);
    this.page.emit('14');
  }

  ngOnDestroy(): void {
    localStorage.removeItem('idPatient');
  }
}

