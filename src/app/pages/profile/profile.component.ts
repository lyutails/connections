import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(private userService: UserService, private router: Router) {}

  logout() {
    const data = JSON.parse(localStorage.getItem('data')!);
    const token = data['token'];
    const uid = data['uid'];
    console.log(uid, token);
    this.userService.logout(uid, token).subscribe((data) => console.log(data));
    // localStorage.clear();
    this.router.navigate(['/signin']);
  }
}
