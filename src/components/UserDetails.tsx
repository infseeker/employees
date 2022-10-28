import {
  setUserFilter,
  $users,
  $currentUserFilter,
  $userDataLoadingStatus,
} from '../stores/UsersStore';
import { useEffect } from 'react';
import { useStore, useStoreMap } from 'effector-react';
import { ageFromDate, userDateFormat } from '../helpers/dateUtils';
import { RequestStatus } from '../enums/RequestStatus';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../App';
import starIcon from '../assets/images/star.svg'
import phoneIcon from '../assets/images/phone.svg'
import backIcon from '../assets/images/back.svg'
import blankUserImg from '../assets/images/blank-user.svg'
import BlankUserDetails from './BlankUserDetails';


const Header = styled.div`
  background-color: #F7F7F8;
  & a {
    display: inline-block;
    margin-top: 0.5rem;
    padding: 1.5rem;
    width: 6px;
    height: 11px;
    background: url(${backIcon}) no-repeat center;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  padding-bottom: 1.5rem;
`

const Img = styled.img`
  width: 104px;
  height: 104px;
  border-radius: 50%;
`;

const BlankImg = styled.span`
  display: inline-block;
  background: no-repeat center;
  background-image: url(${blankUserImg});
  background-size: contain;
  width: 104px;
  height: 104px;
  margin: 0 auto;
`;

const Name = styled.p`
  margin: 1.75rem auto 1rem auto;
  color: #050510;
  font-size: 1.5rem;
  font-weight: bold;
`

const Tag = styled.span`
  font-weight: normal;
  font-size: 17px;
  color: #97979B;
`

const Position = styled.span`
  margin: 0 auto;
  text-transform: capitalize;
  color: #55555C;
  font-size: 13px;
`;

const Date = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #F7F7F8;
  padding: 1.5rem 0;
`

const Birthday = styled.span`
  padding-left: 2rem;
  color: #050510;
  &:before {
    content: url(${starIcon});
    margin-left: -2rem;
    margin-top: -0.1rem;
    position: absolute;
  }
`

const Age = styled.span`
  color: #97979B;
`

const Phone = styled.div`
  padding: 1.5rem 2rem;
  color: #050510;
  &:before {
    content: url(${phoneIcon});
    margin-left: -2rem;
    margin-top: -0.1rem;
    position: absolute;
  }
`

export default function UserDetails() {
  const users = useStore($users);
  const currentFilter = useStore($currentUserFilter);
  const status = useStore($userDataLoadingStatus);
  const { userId } = useParams();

  const user = useStoreMap({
    store: $users,
    keys: [userId],
    fn: (users, [userId]) => {
      const user = users.find(({ id }) => id === userId);
      return user ? user : null;
    },
  });

  useEffect(() => {
    if (!users || !users.length) {
      setUserFilter(currentFilter);
    }
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (status === RequestStatus.Done && !user) {
      navigate('/404');
    }
  }, [status]);

  return (
    <>
      {status === RequestStatus.Pending ? (
        <BlankUserDetails></BlankUserDetails>
      ) : null}
      {status === RequestStatus.Fail ? (
        <BlankUserDetails></BlankUserDetails>
      ) : null}
      {status === RequestStatus.Done && user ? (
        <>
          <Header>
            <Container>
              <Link to="/"></Link>
              <Info>
                <BlankImg>
                  <Img
                    src={user.avatarUrl}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                </BlankImg>
                <Name>
                  {user.firstName} {user.lastName} <Tag>{user.userTag}</Tag>
                </Name>
                <Position>{user.position}</Position>
              </Info>
            </Container>
          </Header>
          <Container>
            <Date>
              <Birthday>{userDateFormat(user.birthday as Date)}</Birthday>
              <Age>{ageFromDate(user.birthday as Date)} years</Age>
            </Date>
            <Phone>{user.phone}</Phone>
          </Container>
        </>
      ) : null}
    </>
  );
}
