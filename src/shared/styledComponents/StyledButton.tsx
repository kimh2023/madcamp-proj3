import styled from "styled-components";

const verticalPadding = "15px";

export const StyledButton = styled.button`
  background-color: #000000;
  color: #ffffff;
  padding: ${verticalPadding} 20px;
  width: 100%;
  border: 1.5px solid #000;
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
  font-size: 13px;
  max-width: 300px;

  &:hover {
    background-color: #333333;
    transition: background-color 0.3s ease;
  }
`;

export const StyledButtonWhite = styled.button`
  background-color: #ffffff;
  color: #000000;
  padding: ${verticalPadding} 20px;
  width: 100%;
  border: 1.5px solid #000;
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
  font-size: 13px;
  max-width: 300px;

  &:hover {
    background-color: #ddd;
    transition: background-color 0.3s ease;
  }
`;

interface StyledOptionMenuButtonProps {
  isCurrent: boolean;
}

export const StyledOptionMenuButton = styled.button<StyledOptionMenuButtonProps>`
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  font-size: 18px;
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
  text-align: center;
  max-width: 500px;
  color: ${({ isCurrent }) => (isCurrent ? "#000" : "#7A7A7A")};

  &:hover {
    color: #e18dff;
    transition: color 0.3s ease;
  }
`;
