import { createEvent, createEffect, createStore, forward } from 'effector';
import { status } from 'patronum';
import { Departments } from '../enums/Departments';
import { stringToDate } from '../helpers/dateUtils';
import { Department } from '../models/Department';
import { User } from '../models/User';
import UserService from '../services/UserService';

const setUserFilter = createEvent<Department>();

const $currentUserFilter = createStore<Department>(Departments.All).on(
  setUserFilter,
  (state, filter) => {
    return filter;
  },
);

const fetchUsersFx = createEffect({
  handler: async (filter: Department) => {
    // return await UserService.getDynamicUsers();
    return await UserService.get500();
    // return await UserService.getUsersByFilter(filter.value);
  },
});

forward({
  from: setUserFilter,
  to: fetchUsersFx,
});

const $userDataLoadingStatus = status({ effect: fetchUsersFx });


const $users = createStore<User[]>([]).on(
  fetchUsersFx.doneData,
  (state, users: User[]) => {
    if (users && users.length) {
      users.forEach((u) => {
        u.birthday = stringToDate(u.birthday as string);
      });
    }
    return users;
  },
);

export {
  $users,
  $currentUserFilter,
  setUserFilter,
  fetchUsersFx,
  $userDataLoadingStatus,
};
