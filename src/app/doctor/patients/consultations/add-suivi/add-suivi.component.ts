import { Consultation } from './../consultation.model';
import { ConsultationService } from 'src/app/doctor/services/consultation.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Exploration } from '../../analyses/analyse.model';
import { UploadComponent } from '../../upload/upload.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileUploadService } from 'src/app/doctor/services/file-upload.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-add-suivi',
  templateUrl: './add-suivi.component.html',
  styleUrls: ['./add-suivi.component.scss']
})
export class AddSuiviComponent implements OnInit, OnChanges {
  @Output() page = new EventEmitter<string>();
  @Input() idConsultation: string;
  @Output() sendData = new EventEmitter<Array<string>>(); // il envoit l'id de la consultation souhaité et si c initial ou pas

  consultation: Consultation = {
    _id: undefined,
    idUser: '',
    idPreviousConsultation: undefined,
    idNextConsultation: undefined,
    initial: false,
    previous: false,
    idPatient: '',
    doctor: '',
    patient: '',
    motif: '',
    antecedents: '',
    examen: '',
    hypotheses: '',
    evaluation: '',
    isGN: false,
    referer: false,
    ordonnance: false,
    analyse: false,
    resultat: false,
    createdAt: '',
    date: '',
    refererList: [],
    medicaments: [],
    explorations: [],
    enabled: true
  };
  oldConsultation: Consultation;

  arrayExpo = []; // c'est pour compter le nombre de tableau analyse

  loading = false; // une fois que submit a eté cliqué le bouton loading apparait
  docProfile: User = JSON.parse(localStorage.getItem('currentUser'));
  rows = [];
  consultationForm: FormGroup; // form

  basePath = '/patients/resultats'; // le nom du dossier pour l'upload des photo patients

  selectedFiles: FileList;
  currentFileUpload: UploadComponent;
  percentage: number;

  arrayLoading: Array<boolean> = []; // c'est pour separer le pourcentage de chargement de chaque fichier

  // tslint:disable-next-line:variable-name
  constructor(private consultS: ConsultationService,
              public httpClient: HttpClient,
              public dialog: MatDialog,
              private router: Router, private storage: AngularFireStorage,
              private modalService: NgbModal, private uploadService: FileUploadService,
    // tslint:disable-next-line:variable-name
              private _snackBar: MatSnackBar,
              private fb: FormBuilder, private activ: ActivatedRoute
  ) {
    this.consultationForm = this.fb.group({
      // tslint:disable-next-line:variable-name
      evaluation: ["", [Validators.required]],
      isCheckedReferer: false, // dit si on doit envoyer ailleurs ou pas
      isCheckedOM: false, // si on doit faire une ordonnance medicale
      isCheckedOP: false, // dit si on doit faire une ordonnance prescriptive

    });
  }

  ngOnChanges(): void {


    this.consultS.getOneConsultation(this.idConsultation).subscribe(consultation => {
      this.oldConsultation = consultation;
      this.consultation.idPreviousConsultation = consultation._id;
      this.consultation.previous = this.oldConsultation.initial;
      for (let index = 0; index < consultation.explorations.length; index++) {
        this.arrayLoading[index] = false;

      }
    });

  }

  ngOnInit() {
  }
  checkOrdonnance() {

    window.open("#/doctor/patients/ordonnance", "_blank");
  }
  async onSubmit() {

    this.loading = true;
    // une fois le bouton sauvegarder cliqué
    this.consultation.evaluation = this.consultationForm.get('evaluation').value;
    this.consultation.referer = this.consultationForm.get('isCheckedReferer').value;
    this.consultation.ordonnance = this.consultationForm.get('isCheckedOM').value;
    this.consultation.analyse = this.consultationForm.get('isCheckedOP').value;
    this.consultation.idUser = this.docProfile._id;
    this.consultation.doctor = this.docProfile.name;
    this.consultation.date = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
    this.consultation.idPatient = localStorage.getItem('idPatient');
    this.consultation.explorations = this.oldConsultation.explorations;
    this.consultation.hypotheses = this.oldConsultation.hypotheses;
    this.consultation.previous = this.oldConsultation.initial;


    await this.consultS.addConsultation(this.consultation).subscribe(() => {
      this.showNotification(
        "bg-green",
        "Consultation enregistrée",
        "bottom",
        "right"
      );
      this.goToAllConsultation();
      this.loading = true;
    }, (error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.router.navigate(["/authentication/signin"]);
      }
      else {
        this.showNotification(
          "bg-red",
          "Un probleme est survenu, veuillez reessayer",
          "bottom",
          "right"
        );
      }
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
  addNewMedoc(array) {
    // cette fonction ajoute un medicament au tableau des medoc de la consultation elle est connecté au
    // props des medocs
    this.consultation.medicaments = array;
  }
  addNewExploration(analyses: Exploration) {
    // cette fonction ajoute une exploration au tableau des exploration de la consultation elle est connecté au
    // props des explorations
    this.consultation.explorations[this.consultation.explorations.length - 1].analyses = analyses.analyses;
    this.consultation.explorations[this.consultation.explorations.length - 1].typeI = analyses.typeI;
    this.consultation.explorations[this.consultation.explorations.length - 1].typeII = analyses.typeII;
    this.consultation.explorations[this.consultation.explorations.length - 1].typeIII = analyses.typeIII;
    this.consultation.explorations[this.consultation.explorations.length - 1].typeIV = analyses.typeIV;

  }

  goToAllConsultation() { // une fois la consultation enregistrer on change de page pour aller à l'historique
    this.page.emit('1');
  }

  addRowReferer(): void {
    this.consultation.refererList = [
      ...this.consultation.refererList,
      {
        refererType: '',
        refererContent: '',
        _id: undefined,
      }
    ];
  }

  addRowExpo(): void {
    this.consultation.explorations = [
      ...this.consultation.explorations,
      {
        analyses: [],
        typeI: '',
        typeII: '',
        typeIII: '',
        typeIV: '',
        resultat: false,
        resultatUrl: '',
        _id: undefined
      }
    ];
  }

  deleteRowReferer(content: string): void {
    this.consultation.refererList = this.consultation.refererList.filter(d => d.refererContent !== content);
  }

  deleteRowExpo(content): void {
    this.consultation.explorations = this.consultation.explorations.filter(d => d.analyses !== content);
  }

  async selectFile(event, explo, index) { // j'ajoute l'id de l'exploration pour que le resultat soit attaché à une exploration
    this.selectedFiles = event.target.files;
    await this.upload(explo, index);

  }

  upload(explo, i) { // je mets en parametre l'exploration a lakel je veux ajouter un resultat et l'index dans le tableau
    this.arrayLoading[i] = true;
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new UploadComponent(file);
    const filePath = `${this.basePath}/${this.currentFileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, this.currentFileUpload.file);

    uploadTask.snapshotChanges().
      subscribe(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          explo.resultatUrl = downloadURL;
          explo.resultat = true;
          this.arrayLoading[i] = false;
        },  error => {
          this.arrayLoading[i] = false;
          this.showNotification(
            "bg-red",
            "Un probleme est survenu, veuillez reessayer",
            "bottom",
            "right"
          );
        });
      },  error => {
        this.arrayLoading[i] = false;
        this.showNotification(
          "bg-red",
          "Un probleme est survenu, veuillez reessayer",
          "bottom",
          "right"
        );
      });
  }

  checkFile(url) {  // redirect to the file page
    window.open(url, "_blank");
  }

  checkConsultation(id, initial) {  // envoie au tree l'id de la consultation desirée
    this.sendData.emit([id, initial]);
  }

}
