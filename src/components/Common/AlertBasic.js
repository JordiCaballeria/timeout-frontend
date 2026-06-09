import React from "react";
import { Button, Modal, Icon, Header } from "semantic-ui-react";

export const AlertBasic = (props) => {
  const {
    title,
    show,
    size,
    missatge,
    onClose,
    disagreeFunction,
    agreeFunction,
    agreeText,
    disagreeText,
  } = props;

  return (
    <Modal basic open={show} onClose={onClose} size={size} >
      <Header icon>
        <Icon name="trash alternate" color="red" />
        {title}
      </Header>
      <Modal.Content>
        <Header as={'h3'} textAlign="center" style={{color: "white"}}>{missatge}</Header>
      </Modal.Content>
      <Modal.Actions>
        <Button color='grey' inverted onClick={() => agreeFunction()} floated="left">
          {agreeText}
        </Button>
        <Button color="red" inverted onClick={() => disagreeFunction()} floated="right">
          {disagreeText}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

AlertBasic.defaultProps = {
  size: "tiny",
  disagreeFunction: null,
  agreeFunction: null,
  disagreeText: "Cancelar",
  agreeText: "Acceptar",
};
