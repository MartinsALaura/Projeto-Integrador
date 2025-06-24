import styled from 'styled-components';

export const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colors.green};
  min-height: 148px;
  padding: 20px;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
  margin-top: ${({ isTablet }) => isTablet ? '8px' : '0'};
`;
