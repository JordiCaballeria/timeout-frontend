import React, { useState } from "react";
import { Form, Button, Dimmer, Loader } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../../../hooks/useUser";
import ReactDOMServer from "react-dom/server";
import { CommonEmailTemplate } from "../../../Common/EmailTemplates/CommonEmailTemplate";
import { NoticiaEmailTemplate } from "../../../Common/EmailTemplates/NoticiaEmailTemplate";
import { EditorText } from "../../../Common/EditorText/EditorText";
import { toast } from "react-toastify";
export const SendMailForm = (props) => {
  const { onClose, onRefesh, users } = props;
  const { sendMail } = useUser();
  const [component, setComponent] = useState(1);
  const [showLoader, setShowLoader] = useState(false)


  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(newSchema()),
    validateOnChange: true,
    onSubmit: async (formValue) => {
      const { subject, contingut } = formValue;
      const htmlMessage = ReactDOMServer.renderToString(
        emailTemplate(component, contingut, subject)
      );
      const dades = {
        user_ids: users,
        subject: subject,
        message: contingut,
        html_message: htmlMessage,
      };

      try {
        setShowLoader(true);
        await sendMail(dades);
        onRefesh();
        onClose();
        setShowLoader(false);
      } catch (error) {
        toast.error(error);
        setShowLoader(false);
      }
    },
  });
  const optionsTemplates = [
    {
      id: 1,
      text: "Per defecte",
      value: 1,
    },
    {
      id: 2,
      text: "Enllaç Noticia",
      value: 2,
    },
  ];

  const handleSlcChange = (e, data) => {
    setComponent(data.value);
  };
  return (
    <>
      <Dimmer active={showLoader}>
        <Loader indeterminate>Enviant correu...</Loader>
      </Dimmer>
      <Form
        className="create-edit-esdeveniment-form"
        onSubmit={formik.handleSubmit}
      >
        <Form.Group>
          <Form.Input
            width={10}
            label="Assumpte"
            name="subject"
            placeholder="Assumpte"
            value={formik.values.nom}
            onChange={formik.handleChange}
            error={formik.errors.subject}
          />
          <Form.Dropdown
            width={6}
            clearable
            selection
            label="Plantilla"
            name="plantilla"
            placeholder="Plantilla"
            options={optionsTemplates}
            onChange={handleSlcChange}
            defaultValue={component}
          />
        </Form.Group>
        <Form.Group style={{ height: "550px" }}>
          <EditorText formik={formik} />
          {/* <Form.TextArea
            label="Missatge"
            name="message"
            placeholder="Missatge"
            value={formik.values.message}
            onChange={formik.handleChange}
            error={formik.errors.message}
          /> */}
        </Form.Group>
        <Button type="submit" content={"Enviar"} primary fluid />
      </Form>
    </>
  );
};

const initialValues = () => {
  return {
    subject: "",
    contingut: "",
  };
};

const newSchema = () => {
  return {
    subject: Yup.string().required("Introdueix un asumpte de correu"),
    contingut: Yup.string().required("El correu ha de tindre un contingut"),
  };
};

const emailTemplate = (option, message, subject) => {
  switch (option) {
    case 1:
      return <CommonEmailTemplate subject={subject} message={message} />;
    case 2:
      return <NoticiaEmailTemplate subject={subject} message={message} />;
    default:
      break;
  }
};
