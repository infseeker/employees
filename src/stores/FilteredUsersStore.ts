import { combine, createEvent, createStore } from "effector";
import { $sortedUsers } from "./SortedUsersStore";

const searchChanged = createEvent<string>();

const $search = createStore<string>('').on(searchChanged, (state, search) => search);

const $filteredUsers = combine($sortedUsers, $search, (users, entry) => {
  entry = entry.trim().toLowerCase();

  if (users && users.length) {
    if (!entry) {
      return users;
    } else {
      return users.filter(u => {
        return (
          u.firstName.toLowerCase().includes(entry) ||
          u.lastName.toLowerCase().includes(entry) ||
          u.userTag.toLowerCase().includes(entry)
        );
      })
    }
  }
});

export { $filteredUsers, $search, searchChanged };