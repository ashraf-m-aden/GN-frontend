import { Medicaments } from "./medicaments.model";

export class Ordonnance {
  id: number;
  idDoc: string;
  doctor: string;
  idPatient: string;
  patient: string;
  contenu: string;
  medicaments: Array<Medicaments>;

  constructor() {
    {
       }
  }

}
