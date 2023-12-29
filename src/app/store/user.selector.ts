import { createSelector } from "@ngrx/store";
import { UsersData } from "../models/user.model";

export const selectFeature = (state: UsersData) => state;

export const userSelector = createSelector(
    selectFeature,
    (state) => state.users
)