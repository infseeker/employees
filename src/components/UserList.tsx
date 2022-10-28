import { useStore } from 'effector-react';
import {
  $currentUserFilter,
  $userDataLoadingStatus,
  setUserFilter,
} from '../stores/UsersStore';
import { $filteredUsers } from '../stores/FilteredUsersStore';
import { useEffect } from 'react';
import { UserSortingTypes } from '../enums/UserSortingTypes';
import { daysToBirthday, daysToNewYear } from '../helpers/dateUtils';
import UserItem from './UserItem';
import { $currentUserSortingType } from '../stores/SortedUsersStore';
import { RequestStatus } from '../enums/RequestStatus';
import { Container } from '../App';
import styled from 'styled-components';
import notFoundImg from '../assets/images/404.svg'
import failImg from '../assets/images/fail.svg'
import BlankUserItem from './BlankUserItem';

const UsersContainer = styled.section`
  padding: 1rem 0;
`

const UsersUl = styled.ul`
`

const UserLi = styled.section`
  margin: 0.375rem;
`

const NextYear = styled.span`
  padding: 1rem 1.25rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 0.5rem;
  grid-gap: 60px;
  text-align:center;
  color: #C3C3C6;
  &:before, &:after {
    content: " ";
display: block;
border-bottom: 1px solid #C3C3C6;
  }
`

const NotFoundImg = styled.img`
  width: 160px;
  display: block;
  margin: 10vh auto 3rem auto;
  cursor: pointer;
`

const DidNotFind = styled.p`
  font-size: 17px;
  line-height: 22px;
  font-weight: bold;
  text-align: center;
  color: #050510;
`

const TryEdit = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;
  text-align: center;
  line-height: 1.25rem;
  color: #97979B;
`

const FailImg = styled.img`
  width: 160px;
  display: block;
  margin: 10vh auto 3rem auto;
  cursor: pointer;
`

export default function UserList() {
  const users = useStore($filteredUsers) || [];
  const currentFilter = useStore($currentUserFilter);
  const currentSortingType = useStore($currentUserSortingType);
  const status = useStore($userDataLoadingStatus);

  useEffect(() => {
    if (!users || !users.length) {
      setUserFilter(currentFilter);
    }
  }, []);

  const blankUsersArray = Array(10).fill({});
  const blankUserEls = blankUsersArray.map((v, i) => (
    <UserLi key={i}>
      <BlankUserItem></BlankUserItem>
    </UserLi>
  ));

  const userEls = users.map((user) => (
    <UserLi key={user.id}>
      <UserItem user={user}></UserItem>
    </UserLi>
  ));

  const userElsBdBeforeNy = users.filter(u => daysToBirthday(u.birthday as Date) <= daysToNewYear()).map(user => (
    <UserLi key={user.id}>
      <UserItem user={user}></UserItem>
    </UserLi>
  ));

  const userElsBdAfterNy = users
    .filter((u) => daysToBirthday(u.birthday as Date) > daysToNewYear())
    .map((user) => (
      <UserLi key={user.id}>
        <UserItem user={user}></UserItem>
      </UserLi>
    ));

  return (
    <Container>
      <UsersContainer>
        {status === RequestStatus.Pending ? <UsersUl>{blankUserEls}</UsersUl> : null}
        {status === RequestStatus.Done && !users.length && (
          <>
            <NotFoundImg src={notFoundImg} alt="Not found" onClick={() => {
        new Audio(require('../assets/sounds/cat-meow.mp3')).play();
      }} />
            <DidNotFind>We didn&apos;t find anyone</DidNotFind>
            <TryEdit>Try editing your request</TryEdit>
          </>
        )}
        {status === RequestStatus.Done && users.length ? (
          <>
            {currentSortingType === UserSortingTypes.ByFirstName && (
              <UsersUl>{userEls}</UsersUl>
            )}

            {currentSortingType === UserSortingTypes.ByBirthday && (
              <>
                <UsersUl>{userElsBdBeforeNy}</UsersUl>
                {userElsBdAfterNy.length ? (
                  <>
                    <NextYear>{ new Date().getFullYear() + 1 }</NextYear>
                    <UsersUl>{userElsBdAfterNy}</UsersUl>
                  </>
                ) : ''}
              </>
            )}
          </>
        ) : ''}

        {status === RequestStatus.Fail && (
          <FailImg src={failImg} alt="Not found" onClick={() => {
            new Audio(require('../assets/sounds/cat-meow.mp3')).play();
          }} />
        )}
      </UsersContainer>
    </Container>
  );
}
