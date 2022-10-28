import { useStore } from "effector-react";
import { UserSortingTypes } from "../enums/UserSortingTypes";
import { UserSortingType } from "../models/UserSortingType";
import { $isModalOpen, closeModal } from '../stores/ModalStore';
import { $currentUserSortingType, setSortingType } from "../stores/SortedUsersStore";
import Modal from 'react-modal';
import styled from "styled-components";

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(5, 5, 16, 0.16)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: '0',
    transform: 'translate(-50%, -50%)',
    borderRadius: '1.25rem',
    border: 'none',
  },
};

const H1 = styled.h1`
    margin: 0 0.75rem;
    padding: 0.5rem 0;
    position: relative;
    color: #050510;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
  `

const ModalBody = styled.div`
  max-width: 90vw;
  width: 370px;
  height: 190px;
  padding: 1rem 1.25rem;
  border-radius: 1.25rem;
`

const Btn = styled.i`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  font-weight: normal;
`

const CloseBtn = styled(Btn)`
  position: absolute;
  right: 0;
  color: #C3C3C6;
  background-color: #F7F7F8;
  cursor: pointer;
  &:before {
    content: '×';
  }
`

const RadioWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  cursor: pointer;
`

const RadioBtn = styled(Btn)<{checked: number}>`
  border: solid #6534FF;
  margin-right: 0.75rem;
  ${({ checked }) => checked
      ? 'border-width: 0.5rem;'
      : 'border-width: 0.2rem'
  }
`

export default function UserSorting() {
  const currentSortingType = useStore($currentUserSortingType);
  const sortingTypes = Object.values(UserSortingTypes);

  const sortingTypeEls = sortingTypes.map((type: UserSortingType) => (
    <RadioWrap
      key={type.value}
      onClick={() => {
        if(currentSortingType === type) return;
        setSortingType(type);
        closeModal();
      }}>
      <RadioBtn checked={type === currentSortingType ? 1 : 0}></RadioBtn>
      {type.name}
    </RadioWrap>
  ));

  Modal.setAppElement('#root');
  const isModalOpen = useStore($isModalOpen);

  return (
    <Modal
      style={modalStyles}
      closeTimeoutMS={200}
      onAfterOpen={() => document.body.style.overflow = 'hidden'}
      onAfterClose={() => document.body.style.overflow = 'unset'}
      isOpen={isModalOpen}
      onRequestClose={() => {
        closeModal();
      }}>
      <ModalBody>
        <H1>Sorting<CloseBtn
          onClick={() => {
            closeModal();
          }}>
        </CloseBtn>
        </H1>
        {sortingTypeEls}
      </ModalBody>
    </Modal>
  );
};
