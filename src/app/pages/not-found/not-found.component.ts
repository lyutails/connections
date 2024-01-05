import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  status = '404';
  message = 'No such route out there, try another way';
  link = 'or go home';

  constructor(private userService: UserService, private router: Router) {}

  goHome() {
    if (this.userService.isLoggedIn === true) {
      this.router.navigate(['/main']);
    } else {
      this.router.navigate(['/signin']);
    }
  }
}
