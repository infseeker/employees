import { useStore } from 'effector-react';
import { Link } from 'react-router-dom';
import { User } from '../models/User'
import { shortUserDateFormat } from '../helpers/dateUtils';
import { UserSortingTypes } from '../enums/UserSortingTypes';
import { $currentUserSortingType } from '../stores/SortedUsersStore';
import blankUserImg from '../assets/images/blank-user.svg'
import styled from 'styled-components';


const UserContainer = styled.div`
  display: flex;
  padding: 0.1rem 0;
  align-items: center;
`

const UserImg = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
`

const BlankImg = styled.span`
  display: inline-block;
  background: no-repeat center;
  background-image: url(${blankUserImg});
  background-size: contain;
  width: 72px;
  height: 72px;
`;

const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  margin-left: 1rem;
  & a {
  text-decoration: none;
  color: #050510;
}
`

const UserName = styled.span`
  line-height: 1.25rem;
`

const UserTag = styled.span`
  padding-left: 0.25rem;
  font-size: 13px;
  line-height: 1.25rem;
  color: #97979B;
`

const UserPos = styled.span`
  flex-basis: 100%;
  padding-top: 0.25rem;
  font-size: 14px;
  line-height: 1.25rem;
  color: #55555C;
  text-transform: capitalize;
`

const UserBirthday = styled.span`
  font-size: 15px;
  color: #55555C;
`


type Props = {
  user?:User,
}

const UserItem: React.FC<Props> = ({user}) => {
  const loremImgUrl: string = process.env.REACT_APP_LOREM_IMG_URL!;
  const currentSortingType = useStore($currentUserSortingType);

  return (
    <UserContainer>
      {user && (
        <>
        <Link to={`/users/${user.id}`}>
        <BlankImg>
          <UserImg
            src={
              user.avatarUrl?.includes(loremImgUrl)
                ? `${user.avatarUrl}&u=${user.id}`
                : user.avatarUrl
            }
            alt={`${user.firstName} ${user.lastName}`}
          />
        </BlankImg>
      </Link>
      <UserInfo>
        <Link to={`/users/${user.id}`}>
          <UserName>
            {user.firstName} {user.lastName}
          </UserName>
        </Link>
        <UserTag>{user.userTag}</UserTag>
        <UserPos>{user.position}</UserPos>
      </UserInfo>
      {currentSortingType === UserSortingTypes.ByBirthday && (
        <UserBirthday>
          {' '}
          {shortUserDateFormat(user.birthday as Date)}
        </UserBirthday>
      )}
      </>)}
    </UserContainer>
  );
};

export default UserItem