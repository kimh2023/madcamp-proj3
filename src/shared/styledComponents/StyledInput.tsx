import { useState } from "react";
import styled from "styled-components";

interface StyledInputProp {
  textAlign: string;
}

export const StyledInput = styled.input<StyledInputProp>`
  border-radius: 8px;
  border: 2.5px solid #c1c1c1;
  background: #fff;
  padding: 12px 15px;
  width: 100%;
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
  font-size: 14px;
  color: #c1c1c1;
  text-align: ${({ textAlign }) => textAlign};
  max-width: 300px;

  &::placeholder {
    color: #c1c1c1;
  }
`;

const CustomSelectContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
`;

const Select = styled.select`
  display: none;
`;

const SelectBox = styled.div<StyledInputProp>`
  border-radius: 8px;
  border: 2.5px solid #c1c1c1;
  background: #fff;
  padding: 12px 15px;
  width: 100%;
  z-index: 99;

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
  font-size: 14px;
  text-align: ${({ textAlign }) => textAlign};
  color: #c1c1c1;

  cursor: pointer;
  user-select: none;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-color: #fff transparent transparent transparent;
  }
`;

interface OptionListProps {
  isOpen: boolean;
}

const OptionList = styled.div<OptionListProps>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 80;
  background-color: white;

  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  border: 2.5px solid #c1c1c1;
  margin-top: -15px;
  padding-top: 15px;
  border-radius: 8px;
`;

interface OptionItemProps {
  isLast: boolean;
  textAlign: string;
}

const OptionItem = styled.div<OptionItemProps>`
  color: #c1c1c1;
  border: 2px solid transparent;
  border-color: ${({ isLast }) =>
    isLast
      ? "transparent"
      : "transparent transparent rgba(0, 0, 0, 0.1) transparent"};
  cursor: pointer;
  user-select: none;

  padding: 12px 15px;
  width: 100%;

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
  font-size: 14px;
  text-align: ${({ textAlign }) => textAlign};
  color: #c1c1c1;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const StyledSelect = ({
  placeholder,
  options,
  selectedValue,
  setSelectedValue,
  textAlign,
}: {
  placeholder?: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  textAlign: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  return (
    <CustomSelectContainer>
      <Select value={selectedValue} onChange={() => {}}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <SelectBox onClick={handleSelectToggle} textAlign={textAlign}>
        {selectedValue || placeholder}
      </SelectBox>
      <OptionList isOpen={isOpen}>
        {options.map((option, index) => (
          <OptionItem
            key={option.value}
            onClick={() => handleOptionSelect(option.label)}
            isLast={index === options.length - 1}
            textAlign={textAlign}
          >
            {option.label}
          </OptionItem>
        ))}
      </OptionList>
    </CustomSelectContainer>
  );
};
