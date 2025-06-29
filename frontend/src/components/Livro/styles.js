import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  height: 150px;
  background-color: white;
  position: relative;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const Content = styled.div`
  gap: 5px;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  padding: 12px;
`;
