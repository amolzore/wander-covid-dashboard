import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  role: string;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  firstName: string;
  lastName: string;
  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.role =  user.role;
      console.log("user" + user);
      console.log("user" + user.firstName);
      this.roles = this.role.split(",");

      this.showAdminBoard = this.roles.includes('ADMIN');
      this.showModeratorBoard = this.roles.includes('MODERATOR');

      this.firstName = user.firstName;
      this.lastName = user.lastName;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}