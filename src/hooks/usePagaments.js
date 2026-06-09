import { useState } from "react";
import {
  getPagamentsApi,
  createPagamentApi,
  deletePagamentApi,
  getTipusPagamentsApi,
  createPagamentStripeApi,
} from "../api/pagaments";
import { useAuth } from "./useAuth";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";

export const usePagaments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagaments, setPagaments] = useState(null);
  const [tipusPagament, setTipusPagament] = useState(null);
  const { auth } = useAuth();

  const elements = useElements();
  const stripe = useStripe();

  const getPagaments = async () => {
    try {
      setLoading(true);
      const response = await getPagamentsApi(auth.token);
      setPagaments(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const createPagament = async (data) => {
    try {
      setLoading(true);
      const result = await createPagamentApi(data, auth.token);
      setLoading(false);
      toast.success("Compra realitzada amb éxit!");
      return result;
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const createPagamentStripe = async (total, CardElement) => {
    setLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (error) {
      toast.error(error);
      setLoading(false);
    } else {
      try {
        setLoading(true);
        const result = await createPagamentStripeApi(
          total,
          paymentMethod,
          auth.token
        );
        setLoading(false);
        return result;
      } catch (error) {
        setLoading(false);
        setError(error);
        toast.error(error);
      }
    }
  };

  const deletePagament = async (id) => {
    try {
      setLoading(true);
      await deletePagamentApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const getTipusPagaments = async () => {
    try {
      setLoading(true);
      const response = await getTipusPagamentsApi(auth.token);
      setTipusPagament(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  return {
    loading,
    error,
    pagaments,
    tipusPagament,
    getPagaments,
    createPagament,
    deletePagament,
    getTipusPagaments,
    createPagamentStripe,
  };
};
