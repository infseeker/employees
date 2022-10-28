import { $search, searchChanged } from '../stores/FilteredUsersStore';
import { useState, useEffect } from 'react'
import { useStore } from 'effector-react';
import { $userDataLoadingStatus } from '../stores/UsersStore';
import { RequestStatus } from '../enums/RequestStatus';
import Modal from 'react-modal';
import { openModal } from '../stores/ModalStore';
import UserSorting from './UserSorting';
import styled from 'styled-components';
import searchIcon from './../assets/images/search.svg'
import sortingIcon from './../assets/images/sorting.svg'
import { $currentUserSortingType } from '../stores/SortedUsersStore';
import { UserSortingTypes } from '../enums/UserSortingTypes';
import { Container } from '../App'

const H1 = styled.h1`
    padding: 0.5rem 0;
    color: #050510;
    font-size: 1.5rem;
    font-weight: bold;
  `

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  padding: 0.4rem;
  background-color: #F7F7F8;
  border-radius: 1rem;
`

const Icon = styled.i`
  width: 1.5rem;
  height: 20px;
  margin: 0 0.25rem;
  background: no-repeat center;
`

const SearchIcon = styled(Icon)<{search: number}>`
  order: -1;
  background-image: url(${searchIcon});
  
  ${({ search }) => search
      ? 'filter: brightness(0) saturate(100%) invert(2%) sepia(56%) saturate(1671%) hue-rotate(216deg) brightness(91%) contrast(101%)'
      : ''
  }
`

const SortingIcon = styled(Icon)<{byBirthday: boolean}>`
  background-image: url(${sortingIcon});
  cursor: pointer;
  &:hover {
    filter: brightness(0) saturate(100%) invert(74%) sepia(5%) saturate(132%) hue-rotate(202deg) brightness(90%) contrast(82%);
  };

  ${({ byBirthday }) => byBirthday
      ? 'filter: brightness(0) saturate(100%) invert(22%) sepia(99%) saturate(5338%) hue-rotate(252deg) brightness(110%) contrast(103%);'
      : ''
  }
`

const Input = styled.input`
  flex: 1;
  display: inline-block;
  margin: 0.2rem;
  font-size: 1rem;
  line-height: 1.25rem;
  border: none;
  outline: none;
  background-color: #F7F7F8;
  &:focus ~ ${SearchIcon} {
    filter: brightness(0) saturate(100%) invert(2%) sepia(56%) saturate(1671%) hue-rotate(216deg) brightness(91%) contrast(101%);
  };
  &::placeholder {
    color: #C3C3C6;
  }
`;

const Message = styled.div`
  margin: 0.75rem 0;
  padding: 0.4rem 0;
  font-size: 0.75rem;
  line-height: 1.25rem;
`

const Header = styled.section<{loading: number, fail: number}>`
padding: 0.5rem 0 0.25rem 0;
margin-bottom: 0.25rem;

${({ loading, fail }) => {
  if(loading) return `background-color: #6534FF; & ${Message} {
    color: #FFFFFF;
  } & ${H1} {
      color: #FFFFFF;
    }`;
  if (fail) return `background-color: #F44336; & ${Message} {
    color: #FFFFFF;
  } & ${H1} {
      color: #FFFFFF;
    }`;
  }}
`

export default function UserSearch() {
  const storedEntry = useStore($search);
  const [entry, setEntry] = useState(storedEntry);
  const interval: number = parseInt(process.env.REACT_APP_USER_TYPING_INTERVAL!) || 500;
  const status = useStore($userDataLoadingStatus);
  const currentSortingType = useStore($currentUserSortingType);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchChanged(entry);
    }, interval)

    return () => clearTimeout(timer)
  }, [entry]);

  Modal.setAppElement('#root');

  return (
    <Header loading={status === RequestStatus.Pending ? 1 : 0} fail={status === RequestStatus.Fail ? 1 : 0}>
      <Container>
        <H1>Search</H1>
        {status === RequestStatus.Pending && <Message>Wait a second, I&apos;m loading...</Message>}
        {status === RequestStatus.Fail && <Message>Can&apos;t update data. Try to refresh or check your internet connection.</Message>}
        {status === RequestStatus.Done && (
          <>
            <InputContainer>
              <Input
                value={entry}
                type="text"
                onChange={(e) => setEntry(e.target.value)}
                placeholder="Enter name, last name or tag..."
              />
              <SearchIcon search={storedEntry.length} />
              <SortingIcon
                byBirthday={currentSortingType === UserSortingTypes.ByBirthday}
                onClick={() => {
                  openModal();
                }}
              />
            </InputContainer>
            <UserSorting />
          </>
        )}
      </Container>
    </Header>
  );
}