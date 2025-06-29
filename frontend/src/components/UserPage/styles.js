import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.light};
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  padding: ${props => props.isTablet ? '24px' : '20px'};
  background-color: ${props => props.theme.colors.light};
  align-self: center;
  gap: 30px;
`;