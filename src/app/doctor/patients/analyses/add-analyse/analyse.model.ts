export class Analyse {
  id: string;
  idConsultation: string;
  typeI: string;
  typeII: string;
  typeIII: string;
  typeIV: string;
  analyses: Array<string>;
  date: string;

  constructor(id, idConsultation, typeI, typeII, typeIII, typeIV, analyses, date) {
    this.id = id;
    this.idConsultation = idConsultation;
    this.typeI = typeI;
    this.typeII = typeII;
    this.typeIII = typeIII;
    this.typeIV = typeIV;
    this.analyses = analyses;
    this.date = date;
  }


}
