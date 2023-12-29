import { createAction, props } from '@ngrx/store';
import { UserProfileData, UsersData } from '../models/user.model';

export const postUserData = createAction(
  '[User] Post User Data',
  props<{ users: UserProfileData }>()
);
