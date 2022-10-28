import { Link } from "react-router-dom";
import styled from "styled-components";
import notFoundImg from '../assets/images/404.svg'

const Img = styled.img`
  width: 90%;
  display: block;
  margin: 10vh auto 2rem auto;
  max-height: 60vh;
  cursor: pointer;
`

const H2 = styled.h2`
  margin-bottom: 0.5rem;
  text-align: center;
  font-size: 2rem;
  color: #97979B;
`

const Back = styled.p`
  margin-top: 1rem;
  text-align: center;
  & a {
    font-size: 1.1rem;
    text-decoration: none;
    color: #6534FF;
  }
`

export default function NotFound() {
  return (
    <div>
      <Img src={notFoundImg} alt="Page not found" onClick={() => {
        new Audio(require('../assets/sounds/cat-meow.mp3')).play();
      }} />
    <H2>Page not found</H2>
    <Back><Link to={ '/' }>Back to main page</Link></Back>
  </div>
  );
};
