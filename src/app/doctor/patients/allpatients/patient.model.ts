export class Patient {
  id: number;
  img: string;
  name: string;
  gender: string;
  date: string;
  address: string;
  mobile: string;
  matricule: string;
  gendarme: boolean;
  dossier: string;
  constructor(patient) {
    {
      this.id = patient.id || this.getRandomID();
      this.img = patient.avatar || "assets/images/user/user1.jpg";
      this.name = patient.name || "";
      this.gender = patient.gender || "male";
      this.date = patient.date || "";
      this.address = patient.address || "";
      this.mobile = patient.mobile || "";
      this.matricule = patient.matricule || "";
      this.gendarme = patient.gendarme || "";
      this.dossier = patient.dossier || "";
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
