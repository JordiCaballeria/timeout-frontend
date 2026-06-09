import { useState } from "react";
import {
  getProductesApi,
  createProducteApi,
  updateProducteApi,
  deleteProducteApi,
  createTipusProducteApi,
  updateTipusProducteApi,
  deleteTipusProducteApi,
  getTipusProductesApi,
  getProducteByIdApi,
} from "../api/productes";
import { useAuth } from "./useAuth";

export const useProductes = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productes, setProductes] = useState(null);
  const [producte, setProducte] = useState(null);
  const [tipusProducte, setTipusProducte] = useState(null);
  const { auth } = useAuth();

  const getProductes = async () => {
    try {
      setLoading(true);
      const response = await getProductesApi();
      setProductes(response);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const getProducteById = async (id) => {
    try {
      const producte = await getProducteByIdApi(id);
      setProducte(producte);
      return producte;
    } catch (error) {
      setError(error);
    }
  };

  const createProducte = async (producte, imatgesFilter, tallesForm) => {
    try {
      setLoading(true);
      await createProducteApi(producte, imatgesFilter, tallesForm, auth.token);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const updateProducte = async (
    producte_id,
    producte,
    imatges,
    imatgesFilter,
    tallesForm
  ) => {
    try {
      setLoading(true);
      await updateProducteApi(
        producte_id,
        producte,
        imatges,
        imatgesFilter,
        tallesForm,
        auth.token
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const deleteProducte = async (id) => {
    try {
      setLoading(true);
      await deleteProducteApi(id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getTipusProductes = async () => {
    try {
      setLoading(true);
      const response = await getTipusProductesApi();
      setTipusProducte(response);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const createTipusProducte = async (data) => {
    try {
      setLoading(true);
      const response = await createTipusProducteApi(data);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const updateTipusProducte = async (id, data) => {
    try {
      setLoading(true);
      await updateTipusProducteApi(id, data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const deleteTipusProducte = async (id) => {
    try {
      setLoading(true);
      await deleteTipusProducteApi(id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return {
    loading,
    error,
    producte,
    productes,
    tipusProducte,
    getProductes,
    getProducteById,
    createProducte,
    updateProducte,
    deleteProducte,
    getTipusProductes,
    createTipusProducte,
    updateTipusProducte,
    deleteTipusProducte,
  };
};
