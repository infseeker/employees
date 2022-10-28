import { combine, createEvent, createStore } from "effector";
import { UserSortingTypes } from "../enums/UserSortingTypes";
import { distanceToBirthday } from "../helpers/dateUtils";
import { UserSortingType } from "../models/UserSortingType";
import { $users } from "./UsersStore";

const setSortingType = createEvent<UserSortingType>();

const $currentUserSortingType = createStore<UserSortingType>(UserSortingTypes.ByFirstName).on(
  setSortingType,
  (state, type) => type,
);

const $sortedUsers = combine($users, $currentUserSortingType, (users, sortingType) => {
  switch (sortingType) {
    case UserSortingTypes.ByFirstName:
      return [...users].sort((a, b) => {
        return a.firstName.localeCompare(b.firstName);
      });

    case UserSortingTypes.ByBirthday:
      return [...users].sort((a, b) => {
        return (
          distanceToBirthday(a.birthday as Date) -
          distanceToBirthday(b.birthday as Date)
        );
      });

    default:
      return users;
  }
});

export { $sortedUsers, $currentUserSortingType, setSortingType };