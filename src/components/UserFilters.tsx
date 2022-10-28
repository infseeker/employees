import { setUserFilter, $currentUserFilter } from '../stores/UsersStore'
import { Departments } from '../enums/Departments';
import { Department } from '../models/Department';
import { useStore } from 'effector-react';
import styled from 'styled-components';
import { Container } from '../App';


const Filters = styled.ul`
border-bottom: 1px solid #C3C3C6;

`

const Filter = styled.li<{active: boolean}>`
  display: inline-block;
  padding: 0.5rem 0.75rem;
  padding-bottom: calc(0.5rem + 2px);
  color: #97979B;
  font-size: 1rem;
  cursor: pointer;

  ${({ active }) => active
      ? 'color: #050510; border-bottom: 2px solid #6534FF; padding-bottom: 0.5rem'
      : ''
  }
`

export default function UserFilters() {
  const currentFilter = useStore($currentUserFilter);
  const departments = Object.values(Departments);
  const departmentEls = departments.map((filter: Department) => (
    <Filter active={filter === currentFilter}
      key={filter.value}
      onClick={() => {
        if (filter === currentFilter) return;
        setUserFilter(filter);
      }}>
      {filter.name}{' '}
    </Filter>
  ));

  return <Container><Filters>{departmentEls}</Filters></Container>;
};
