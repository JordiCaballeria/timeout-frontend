import { useState } from "react";
import {
  getEsdevenimentApi,
  createEsdevenimentApi,
  updateEsdevenimentApi,
  deleteEsdevenimentApi,
  getTipusEsdevenimentApi,
  createTipusEsdevenimentApi,
  updateTipusEsdevenimentApi,
  deleteTipusEsdevenimentApi,
  getPartitsApi,
  getEntradesApi,
  createEntradaApi,
} from "../api/esdeveniments";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";

export const useEsdeveniments = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [esdeveniments, setEsdeveniments] = useState(null);
  const [entrades, setEntrades] = useState(null);
  const [tipusEsdeveniments, setTipusEsdeveniments] = useState(null);
  const [partits, setPartits] = useState(null);
  const { auth } = useAuth();

  const getEsdeveniments = async () => {
    try {
      setLoading(true);
      const response = await getEsdevenimentApi(auth.token);
      setEsdeveniments(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const getEntrades = async () => {
    try {
      setLoading(true);
      const response = await getEntradesApi(auth.token);
      setEntrades(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const createEsdeveniment = async (data) => {
    try {
      setLoading(true);
      await createEsdevenimentApi(data, auth.token);
      setLoading(false);
      toast.success(`Esdeveniment ${data.nom} creat correctament`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const createEntrada = async (data) => {
    try {
      setLoading(true);
      await createEntradaApi(data, auth.token);
      setLoading(false);
      toast.success(`Entrada venuda`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const updateEsdeveniment = async (id, data) => {
    try {
      setLoading(true);
      await updateEsdevenimentApi(id, data, auth.token);
      setLoading(false);
      toast.success(`Esdeveniment ${data.nom} actualitzat correctament`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const deleteEsdeveniment = async (id) => {
    try {
      setLoading(true);
      await deleteEsdevenimentApi(id, auth.token);
      setLoading(false);
      toast.success(`Esdeveniment amb id ${id} eliminat correctament`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const getTipusEsdeveniments = async () => {
    try {
      setLoading(true);
      const response = await getTipusEsdevenimentApi(auth.token);
      setTipusEsdeveniments(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      toast.error(error);
    }
  };

  const createTipusEsdeveniment = async (data) => {
    try {
      setLoading(true);
      await createTipusEsdevenimentApi(data, auth.token);
      setLoading(false);
      toast.success(`Tipus d'esdeveniment ${data.nom} creat correctament`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const updateTipusEsdeveniment = async (id, data) => {
    try {
      setLoading(true);
      await updateTipusEsdevenimentApi(id, data, auth.token);
      setLoading(false);
      toast.success(
        `Tipus d'esdeveniment ${data.nom} actualitzat correctament`
      );
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const deleteTipusEsdeveniment = async (id) => {
    try {
      setLoading(true);
      await deleteTipusEsdevenimentApi(id, auth.token);
      toast.success(`Tipus d'esdeveniment amb id ${id} creat correctament`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const getPartits = async () => {
    try {
      setLoading(true);
      const response = await getPartitsApi();
      setPartits(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      toast.error(error);
    }
  };

  return {
    getEsdeveniments,
    deleteEsdeveniment,
    updateEsdeveniment,
    createEsdeveniment,
    getTipusEsdeveniments,
    createTipusEsdeveniment,
    updateTipusEsdeveniment,
    deleteTipusEsdeveniment,
    getPartits,
    getEntrades,
    createEntrada,
    tipusEsdeveniments,
    esdeveniments,
    partits,
    entrades,
    loading,
    error,
  };
};
