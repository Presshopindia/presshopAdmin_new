import React from "react";
import {
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Tooltip,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import PropTypes from "prop-types";

function PopupConfirm({
  title,
  description,
  customerId,
  onConfirm,
  buttonTitle = "Delete",
  className = ""
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleDelete = () => {
    onConfirm(customerId);
    onClose();
  };

  const renderButton = () => {
    switch(buttonTitle) {
      case "AiOutlineDelete":
        return (
          <Tooltip label="Delete"  placement="right">
            <span><AiOutlineDelete style={{ cursor: "pointer" }} className={`icn ${className}`} onClick={onOpen} /></span>
          </Tooltip>
        )

        case "RxCross1":
          return (
            <Tooltip label="Delete">
              <span><RxCross1 className={`icn ${className}`} onClick={onOpen} /></span>
            </Tooltip>
          )
          
          case "Testimonial":
            return (
              <button className="dlte" style={{ cursor: "pointer", background: "none", border:"none" }} onClick={onOpen}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_5605_71719)">
                    <path d="M1.09375 2.94531H10.8715" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.31641 2.94531V9.66753C2.31641 10.6801 3.13722 11.5009 4.14974 11.5009H7.81641C8.82894 11.5009 9.64974 10.6801 9.64974 9.66753V2.94531" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.15039 1.72222C4.15039 1.04721 4.6976 0.5 5.37261 0.5H6.59484C7.26987 0.5 7.81706 1.04721 7.81706 1.72222V2.94445H4.15039V1.72222Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_5605_71719">
                      <rect width="10.6667" height="12" fill="white" transform="translate(0.650391)" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            )

          default :
          return (
            <Button
                className="theme_btn tbl_btn del-btn"
                colorScheme="red"
                onClick={onOpen}
              >
                {buttonTitle}
              </Button>
          )
    }
  }

  return (
    <>
      {renderButton()}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{description}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                {buttonTitle == "AiOutlineDelete" || "RxCross1" ? "Delete" : buttonTitle}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default PopupConfirm;

PopupConfirm.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  customerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onConfirm: PropTypes.func.isRequired,
  buttonTitle: PropTypes.string,
  className: PropTypes.string,
};