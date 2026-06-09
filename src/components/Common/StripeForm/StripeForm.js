import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BASE_API } from "../../../utils/constants";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export const StripeForm = (props) => {
  const { amount } = props;
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const { nom, email } = formValue;
      handleSubmit(nom, email);
    },
  });

  const handleSubmit = async (nom, email) => {
    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      toast.error(error);
      setLoading(false);
    } else {
      const res = await fetch(`${BASE_API}/api/pagament_stripe/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          amount: amount, // Aquí puedes establecer la cantidad de dinero a pagar
        }),
      });

      setLoading(false);
    }
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        label="Titular de la targeta"
        name="nom"
        placeholder="Titular de la targeta"
        value={formik.values.nom}
        onChange={formik.handleChange}
        error={formik.errors.nom}
      />
      <Form.Input
        label="Enviar la rebut a:"
        name="email"
        placeholder="example@gmail.com"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      <Button type="submit" disabled={!stripe || loading}>
        {loading ? "Processant pagament..." : "Pagar"}
      </Button>
    </Form>
  );
};

const initialValues = () => {
  return {
    nom: "",
    email: "",
  };
};

const newSchema = () => {
  return {
    nom: Yup.string().required("Introdueix el nom del titular de la targeta"),
    email: Yup.string()
      .email("Introdueix un correu vàlid")
      .required("Introdueix el correu al qual vols que s'envii el rebut"),
  };
};
