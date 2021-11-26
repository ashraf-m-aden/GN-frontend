export class Patient {
  name: string;
  gender: string;
  date: string;
  matricule: string;
  gendarme: boolean;
  dossier: string;
  // tslint:disable-next-line:variable-name
  _id: string;
  numero: string;
  addresse: string;
  email: string;
  bloodType: string;
  enabled: boolean;
  constructor(patient) {
    {
      this._id = patient.id;
     // this.img = patient.img || "assets/images/user/user1.jpg";
      this.name = patient.name || "";
      this.gender = patient.gender || "male";
      this.date = patient.date || "";
      this.email = patient.email;
      this.addresse = patient.address || "";
      this.numero = patient.numero || "";
      this.matricule = patient.matricule || "";
      this.gendarme = patient.gendarme || true;
      this.dossier = patient.dossier || "";
      this.bloodType = patient.bloodType || "";
      this.enabled = patient.enabled ;
    }
  }
  public getRandomID(): string {
    const S4 =  () => {
      // tslint:disable-next-line:no-bitwise
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
