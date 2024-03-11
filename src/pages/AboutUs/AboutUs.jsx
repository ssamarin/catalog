import React from 'react';
import styled from 'styled-components';

const AboutWrapper = styled.div`
  padding: 30px;
  
  span {
    color: #cb1829;
  }
`;

function AboutUs() {
  return (
    <AboutWrapper data-testid="aboutUs">
      Мы небольшая команда, которая занимается разработкой
      {' '}
      <span>E-Commerce</span>
      {' '}
      решений для бизнеса.
    </AboutWrapper>
  );
}

export default AboutUs;
