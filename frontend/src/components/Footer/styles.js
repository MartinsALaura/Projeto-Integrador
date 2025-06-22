import styled from 'styled-components';

export const FooterContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.green};
  position: relative;
  min-height: ${({ isTablet }) => (isTablet ? '100px' : '110px')};
  bottom: 0;
`;

export const Content = styled.div`
  color: ${({ theme }) => theme.colors.light};
  max-width: ${({ isTablet }) => (isTablet ? '360px' : '800px')};
  text-align: center;
`;