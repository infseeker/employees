import styled from 'styled-components';


const UserContainer = styled.div`
  display: flex;
  padding: 0.1rem 0;
  align-items: center;
`

const UserImg = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-image: linear-gradient(to right top, #f3f3f6, #f5f5f7, #f7f6f8, #f8f8f9, #fafafa);
`
const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  margin-left: 1rem;
`

const UserName = styled.div`
  width: 144px;
  height: 16px;
  border-radius: 50px;
  background-image: linear-gradient(to right top, #f3f3f6, #f5f5f7, #f7f6f8, #f8f8f9, #fafafa);
`

const UserPos = styled.div`
  width: 80px;
  height: 12px;
  margin-top: 6px;
  border-radius: 50px;
  background-image: linear-gradient(to right top, #f3f3f6, #f5f5f7, #f7f6f8, #f8f8f9, #fafafa);
`

const Break = styled.div`
  flex-basis: 100%;
`

export default function BlankUserItem() {
  return (
    <UserContainer>
      <UserImg />
      <UserInfo>
        <UserName></UserName>
        <Break></Break>
        <UserPos></UserPos>
      </UserInfo>
    </UserContainer>
  );
};