import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from '../views/NotFound';
import UsersView from '../views/UsersView';
import UserView from '../views/UserView';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UsersView />} />
      <Route path="/users/:userId" element={<UserView />} />
      <Route path='/404' element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}