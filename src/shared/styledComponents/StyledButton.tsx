import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: #000000;
  color: white;
  padding: 15px 20px;
  width: 100%;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-family:
    "Archivo-Black",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    sans-serif;
  font-size: 16px;

  &:hover {
    background-color: #333333;
    transition: background-color 0.3s ease;
  }
`;
