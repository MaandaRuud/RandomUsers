import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OsirisFE';
  randomuser: any = { picture: {} };
  liDetails: any[] = [{
    Value: "",
    Active: true,
    Icon: "user",
    Id: 1,
    Title: "Hi, my name is"
  },
  {
    Value: "",
    Active: false,
    Icon: "envelope",
    Id: 2,
    Title: "Hi, my email address is"
  },
  {
    Value: "",
    Active: false,
    Icon: "calendar",
    Id: 3,
    Title: "Hi, my date of birth is"
  },
  {
    Value: "",
    Active: false,
    Icon: "map",
    Id: 4,
    Title: "Hi, my location is"
  },
  {
    Value: "",
    Active: false,
    Icon: "phone",
    Id: 5,
    Title: "Hi, my phone number is"
  },
  {
    Value: "",
    Active: false,
    Icon: "lock",
    Id: 6,
    Title: "Hi, my password is"
  }
  ];
  selected: string = "";
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getRandomUser();
  }

  getRandomUser(): void {
    this.http.get("https://randomuser.me/api").
      subscribe(data => {
        this.randomuser = data.results[0];
        this.liDetails.find(x => x.Id == 1).Value = this.randomuser.name.first + " " + this.randomuser.name.last;
        this.liDetails.find(x => x.Id == 2).Value = this.randomuser.email;
        this.liDetails.find(x => x.Id == 3).Value = new Date(this.randomuser.dob.date).toLocaleDateString();
        this.liDetails.find(x => x.Id == 4).Value = this.randomuser.location.street
          + ", " + this.randomuser.location.city + ", " + this.randomuser.location.state, ", " + this.randomuser.location.postcode;
        this.liDetails.find(x => x.Id == 5).Value = this.randomuser.phone;
        this.liDetails.find(x => x.Id == 6).Value = this.randomuser.login.password;
        this.selected = this.liDetails[0];
        console.log(this.randomuser);
      });
  }

  mouseEnter(detail): void {
    this.selected = detail;
    this.liDetails.forEach(x => {
      x.Active = false;
    });
    detail.Active = true;
  }
}
