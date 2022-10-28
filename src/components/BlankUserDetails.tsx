import { useStore } from 'effector-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../App';
import { RequestStatus } from '../enums/RequestStatus';
import { $userDataLoadingStatus } from '../stores/UsersStore';


const Header = styled.div<{fail: number}>`
  background-color: #F7F7F8;
  & a {
    display: inline-block;
    margin-top: 0.5rem;
    padding: 1.5rem;
    width: 6px;
    height: 11px;
  }

  ${({ fail }) => fail
      ? 'background-color: #F44336;'
      : ''
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  padding-bottom: 1.5rem;
`

const Img = styled.div`
  width: 104px;
  height: 104px;
  border-radius: 50%;
  margin: 0 auto;
  background: white;
`;

const Name = styled.p`
  margin: 1.75rem auto 1rem auto;
  width: 200px;
  height: 24px;
  line-height: 1.5rem;
  border-radius: 50px;
  background: white;
  font-size: 0.75rem;
  text-align: center;
  color: #F44336;
`

const Position = styled.span`
  margin: 0 auto;
  width: 150px;
  height: 13px;
  line-height: 1.25rem;
  border-radius: 50px;
  background: white;
`;

const Date = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #F7F7F8;
  padding: 1.5rem 0;
`

const Birthday = styled.span`
  width: 170px;
  height: 16px;
  padding-left: 2rem;
  border-radius: 50px;
  background-image: linear-gradient(to right top, #f3f3f6, #f5f5f7, #f7f6f8, #f8f8f9, #fafafa);
  &:before {
    margin-left: -2rem;
    position: absolute;
  }
`

const Age = styled.span`
  width: 100px;
  height: 16px;
  padding-left: 2rem;
  border-radius: 50px;
  background-image: linear-gradient(to right top, #f3f3f6, #f5f5f7, #f7f6f8, #f8f8f9, #fafafa);
`

const Phone = styled.div`
  width: 150px;
  height: 16px;
  padding-left: 2rem;
  border-radius: 50px;
  background-image: linear-gradient(to right top, #f3f3f6, #f5f5f7, #f7f6f8, #f8f8f9, #fafafa);
  margin: 1.5rem 0;
  &:before {
    margin-left: -2rem;
    position: absolute;
  }
`


export default function BlankUserDetails() {
  const status = useStore($userDataLoadingStatus);

  return (
    <>
      <Header fail={status === RequestStatus.Fail ? 1 : 0}>
        <Container>
          <Link to="/"></Link>
          <Info>
            <Img></Img>
            {status === RequestStatus.Fail ? <Name>Can&apos;t update data. Try to refresh.</Name> : <Name></Name>}
            <Position></Position>
          </Info>
        </Container>
      </Header>
      <Container>
        <Date>
          <Birthday></Birthday>
          <Age></Age>
        </Date>
        <Phone></Phone>
      </Container>
        </>
  );
};