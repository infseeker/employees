import UserFilters from "../components/UserFilters";
import UserList from "../components/UserList";
import UserSearch from "../components/UserSearch";

export default function UsersView() {
  return (
    <>
      <UserSearch />
      <UserFilters />
      <UserList />
    </>
  );
};
