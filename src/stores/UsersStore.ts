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
    let users;
    const lsItemCacheName: string = process.env.REACT_APP_LS_ITEM_CACHE_NAME!;
    const cache = localStorage.getItem(lsItemCacheName);

    if (!cache) {
      users = await UserService.getUsersByFilter(filter.value);

      localStorage.setItem(
        lsItemCacheName,
        JSON.stringify({
          [`${filter.value}`]: {
            cached: new Date().getTime(),
            data: users,
          },
        }),
      );
    } else {
      const cachedUsers = JSON.parse(cache);
      const usersByFilter = cachedUsers[filter.value];
      const cacheTimeout: number =
        parseFloat(process.env.REACT_APP_CACHE_TIMEOUT_MIN!) * 1000 * 60;
      const now = new Date().getTime();

      if (
        usersByFilter &&
        usersByFilter.data &&
        now - usersByFilter.cached < cacheTimeout
      ) {
        users = usersByFilter.data;
      } else {
        users = await UserService.getUsersByFilter(filter.value);
        cachedUsers[`${filter.value}`] = {
          cached: new Date().getTime(),
          data: users,
        };

        localStorage.setItem(lsItemCacheName, JSON.stringify(cachedUsers));
      }
    }
    return users;
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
