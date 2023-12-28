import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { GroupsItems, UsersList } from '../../models/user.model';
import { debounceTime, delay } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  groups: GroupsItems[] = [];
  users: UsersList[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getGroups();
    console.log(this.groups);
    this.groups.map((group) => console.log(group));
    this.getUsers();
  }

  getGroups() {
    this.userService.getGroups().pipe(delay(2000)).subscribe((data) => {
      const groupItems = data.Items;
      groupItems.map((group) => this.groups.push(group));
    });
  }

  getUsers() {
    this.userService.getUsers().pipe(delay(2000)).subscribe((data) => {
      const users = data.Items;
      users.map((user) => this.users.push(user));
    });
  }

  /* getGroupMessages() {
    const data = JSON.parse(localStorage.getItem('data')!);
    const token = data['token'];
    const uid = data['uid'];
    console.log(uid, token);
    this.userService.getGroupById(uid, token).subscribe((data) => {
      console.log(data);
      const users = data.Items;
      users.map((user) => this.users.push(user));
    });
  } */
}
