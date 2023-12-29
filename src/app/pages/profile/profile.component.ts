import { Component, OnInit, inject } from '@angular/core';
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
export class ProfileComponent implements OnInit {
  id: string = '';
  name: string = '';
  email: string = '';
  createdAt: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit () {
    const data = JSON.parse(localStorage.getItem('data')!);
    const uid = data['uid'];
    this.id = uid;
    this.name = localStorage.getItem('name')!;
    this.email = localStorage.getItem('email')!.replace(/['"]+/g, '');
    this.createdAt = localStorage.getItem('createdAt')!;
  }

  logout() {
    const data = JSON.parse(localStorage.getItem('data')!);
    const token = data['token'];
    const uid = data['uid'];
    this.userService.logout(uid, token).subscribe((data) => console.log(data));
    // localStorage.clear();
    this.router.navigate(['/signin']);
  }
}
