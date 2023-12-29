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
  ifGroups: boolean = false;
  ifUsers: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getGroups();
    this.getUsers();
    // this.getGroupMessages();
  }

  getGroups() {
    this.userService.getGroups().pipe(delay(1000)).subscribe((data) => {
      const groupItems = data.Items;
      groupItems.map((group) => this.groups.push(group));
      this.ifGroups = true;
    });
  }

  getUsers() {
    this.userService.getUsers().pipe(delay(1000)).subscribe((data) => {
      const users = data.Items;
      users.map((user) => this.users.push(user));
      this.ifUsers = true;
    });
  }

  getGroupMessages() {
    const data = JSON.parse(localStorage.getItem('data')!);
    const token = data['token'];
    const uid = data['uid'];
    this.userService.getGroupById().subscribe((data) => {
      console.log(data);
      const users = data.Items;
      // users.map((user) => this.users.push(user));
    });
  }
}
