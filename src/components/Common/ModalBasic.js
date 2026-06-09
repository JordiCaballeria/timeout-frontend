import React from "react";
import { Button, Modal } from "semantic-ui-react";

export const ModalBasic = (props) => {
  const {
    title,
    show,
    size,
    children,
    onClose,
    disagreeFunction,
    agreeFunction,
    agreeText,
    disagreeText,
  } = props;

  return (
    <Modal className="modal-basic" open={show} onClose={onClose} size={size}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content scrolling
      style={{maxHeight: "80vh"}}>{children}</Modal.Content>
      <Modal.Actions>
        {disagreeFunction ? (
          <Button negative onClick={() => disagreeFunction()}>
            {disagreeText}
          </Button>
        ) : (
          <></>
        )}
        {agreeFunction ? (
          <Button positive onClick={() => agreeFunction()}>
            {agreeText}
          </Button>
        ) : (
          <></>
        )}
      </Modal.Actions>
    </Modal>
  );
};

ModalBasic.defaultProps = {
  size: "tiny",
  disagreeFunction: null,
  agreeFunction: null,
  disagreeText: "Cancelar",
  agreeText: "Acceptar",
};
