import { UserSortingType } from "../models/UserSortingType";

export const UserSortingTypes: { readonly [k: string]: UserSortingType } = {
  ByFirstName: { name: 'Alphabetically', value: 0 },
  ByBirthday: { name: 'By birthday', value: 1 },
};