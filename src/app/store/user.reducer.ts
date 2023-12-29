import { createReducer, on } from '@ngrx/store';
import { UserProfileData, UsersData } from '../models/user.model';
import * as UserAction from './user.action';

const initialState: UsersData = {
  users: [],
};

export const reducers = createReducer(
  initialState,
  on(UserAction.postUserData, (state, action) => {
    state = {
      ...state,
      users: [...state.users, action.users],
    };

    return state;
  })
);
