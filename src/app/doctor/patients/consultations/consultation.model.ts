import { Referer } from './../analyses/referer.model';
import { Exploration } from '../analyses/analyse.model';
import { Ordonnance } from './../analyses/ordonnance.model';
export class Consultation {
  // tslint:disable-next-line:variable-name
  _id: string;
  initial: boolean;
  idUser: string;
  idPatient: string;
  idPreviousConsultation: string = null;
  previous = false;  // dit si la consultation precedente est de type initial
  idNextConsultation: string = null;
  doctor: string;
  patient: string;
  motif: string;
  antecedents: string;
  examen: string;
  hypotheses: string;
  evaluation: string;
  isGN: boolean;
  referer: boolean;
  ordonnance: boolean;
  analyse: boolean;
  resultat: boolean;
  createdAt: string;
  date: string;
  refererList: Array<Referer>;
  medicaments: Array<Ordonnance>;
  explorations: Array<Exploration>;
  enabled: boolean;


  constructor() {
    {
       }
  }

}
