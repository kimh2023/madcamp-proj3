import { ProductDto } from "@root/src/shared/types";
import styled from "styled-components";
import { TbPin, TbPinFilled } from "react-icons/tb";
import axiosInstance from "@root/utils/axiosInstance";
import { useState } from "react";

export const StyledHeaderSideBar = styled.div`
  display: flex;
  flex: 1;
  padding: 5px 27px;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  background: rgba(255, 255, 255, 0.82);

  font-family:
    "Archivo-Black",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    "Roboto";
`;

interface StyledHoverContainerProps {
  imageUrl: string;
}

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    2,
    minmax(0, 1fr)
  ); // Two columns with equal width
  gap: 18px; // Adjust the gap between columns
  width: 100%;
  max-width: 100% !important;
`;

const HoverContainerInnerItem = styled.a`
  display: none;
  flex-direction: column;
  margin: -15px;
  padding: 15px;
  border-radius: 9px;
  background: rgba(0, 0, 0, 0.54);
  text-decoration: none;
  justify-content: center;
  row-gap: 10px;
  max-width: calc(100% + 30px);
`;

const PinButton = ({ product }: { product: ProductDto }) => {
  const [pinned, setPinned] = useState(product.pinned);
  const savePin = async () => {
    await axiosInstance
      .post("/boards/1/pins", {
        productId: product.id,
        note: "",
      })
      .then((response) => {
        if (response.data.success) {
          alert("Successfully pinned");
          setPinned((prevState) => !prevState);
        }
      });
  };
  console.log(product);
  return (
    <div style={{ position: "absolute", top: 0, right: 0, cursor: "pointer" }}>
      {pinned ? (
        <TbPinFilled color={"#fff"} size={25} />
      ) : (
        <TbPin color={"#fff"} size={25} onClick={() => savePin()} />
      )}
    </div>
  );
};

const StyledHoverContainer = styled.div<StyledHoverContainerProps>`
  position: relative;

  border-radius: 9px;
  background: #fff;

  display: flex;
  aspect-ratio: 1;
  width: 100%;
  max-width: 100%;

  background-image: url(${(props) => props.imageUrl});
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  border: inset 15px transparent;

  &:hover ${HoverContainerInnerItem} {
    display: flex;
  }
`;

const StyledHoverText = styled.div`
  font-size: 17px;
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
  color: white;
  width: 100%;
  overflow: hidden;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;

  overflow-wrap: break-word; /* Allow breaking within words */
  word-wrap: break-word; /* Fallback for browsers that don't support overflow-wrap */
`;

const StyledHoverTextSmall = styled.div`
  font-size: 13px;
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
  color: white;
  width: 80%;
  overflow: hidden;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
`;

// const BoardPage = () => {

//   return (

//   )
// }

export const StyledImages = ({ product }: { product: ProductDto }) => {
  const [boardPageOpen, setBoardPageOpen] = useState(false);
  return (
    <StyledHoverContainer imageUrl={product.image}>
      <PinButton product={product} />
      <HoverContainerInnerItem
        href={product.link}
        onClick={() => {
          window.open(product.link, "_blank");
        }}
      >
        <StyledHoverText>{product.name.substring(0, 40)}</StyledHoverText>
        <StyledHoverTextSmall>${product.price}</StyledHoverTextSmall>
      </HoverContainerInnerItem>
    </StyledHoverContainer>
  );
};
