import styled from 'styled-components';

interface ContainerProps {
  $marginTop?: number;
  $width?: number;
}

const Container = styled.div<ContainerProps>`
  max-width: ${props => (props.$width ? props.$width + 'px' : '500px')};
  width: 100%;
  margin: ${props => (props?.$marginTop ? props?.$marginTop : 0) + 'px auto 0'};
  padding: 60px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;

  @media all and (max-width: 450px) {
    padding: 40px 30px;
  }
`;

export default Container;
