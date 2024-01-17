import styled from "styled-components";

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;
  align-items: center;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;
  align-items: center;
`;

export const StyledOptionsDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  width: 100%;
`;

interface StyledWhiteContainerProps {
  flexHorizontal: boolean;
}

export const StyledWhiteContainer = styled.div<StyledWhiteContainerProps>`
  width: 100%;
  border-radius: 20px;
  background: #ffffff;
  display: flex;
  flex-direction: ${({ flexHorizontal }) =>
    flexHorizontal ? "row" : "column"};
  padding: 60px 50px;
`;

export const StyledWhiteContainerSmall = styled.div`
  flex: 1;
  border-radius: 20px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 60px 50px;
  cursor: pointer;
`;
