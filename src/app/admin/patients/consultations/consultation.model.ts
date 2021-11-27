import { Exploration } from '../analyses/analyse.model';
import { Ordonnance } from './../analyses/ordonnance.model';
export class Consultation {
  // tslint:disable-next-line:variable-name
  _id: string;
  initial: boolean;
  idUser: string;
  idPatient: string;
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
  refererContent: string;
  medicaments: Array<Ordonnance>;
  exploration: Exploration;
  resultatId: string;
  enabled: boolean;


  constructor() {
    {
       }
  }

}
