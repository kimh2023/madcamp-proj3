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
  background: #fff;
  display: flex;
  flex-direction: ${({ flexHorizontal }) =>
    flexHorizontal ? "row" : "column"};
  padding: 60px 50px;
`;