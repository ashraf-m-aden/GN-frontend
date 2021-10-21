import { formatDate } from "@angular/common";
export class Doctors {
  id: number;
  img: string;
  name: string;
  email: string;
  date: string;
  specialization: string;
  mobile: string;
  grade: string;
  constructor(doctors) {
    {
      this.id = doctors.id ;
      this.img = doctors.avatar || "assets/images/user/user1.jpg";
      this.name = doctors.name || "";
      this.email = doctors.email || "";
      this.date = formatDate(new Date(), "yyyy-MM-dd", "en") || "";
      this.specialization = doctors.specialization || "";
      this.mobile = doctors.mobile || "";
      this.grade = doctors.grade || "";
    }
  }

}
