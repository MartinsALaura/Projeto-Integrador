import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100dvh;
  width: 100%;
  align-items: flex-end;
  justify-content: flex-end;
  overflow: hidden;
`;

export const Right = styled.div`
  width: ${props => props.$isTablet ? '100%' : '40%'};
  background-color: ${props => props.theme.colors.light};
  height: 100dvh;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;

export const Left = styled.div`
  width: 60%;
  background-color: ${props => props.theme.colors.green};
  height: 100dvh;
  display: flex;
  position: relative;
  box-sizing: border-box;
`;

export const BooksImg = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  display: block;
  position: absolute;
  left: -7%;
  bottom: -18%;
`;
