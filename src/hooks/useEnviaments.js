import { useState } from "react";
import {
  getEnviamentsApi,
  getEstatEnviamentsApi,
  createEnviamentApi,
  deleteEnviamentApi,
  updateEnviamentApi,
} from "../api/enviaments";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";

export const useEnviaments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enviaments, setEnviaments] = useState(null);
  const [estatEnviaments, setEstatEnviaments] = useState(null);
  const { auth } = useAuth();

  const getEnviaments = async () => {
    try {
      setLoading(true);
      const response = await getEnviamentsApi(auth.token);
      setEnviaments(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const getEstatEnviaments = async () => {
    try {
      setLoading(true);
      const response = await getEstatEnviamentsApi(auth.token);
      setEstatEnviaments(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const createEnviament = async (data) => {
    try {
      setLoading(true);
      const result = await createEnviamentApi(data, auth.token);
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };
  const updateEnviament = async (id, data) => {
    try {
      setLoading(true);
      await updateEnviamentApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      toast.error(error);
    }
  };
  const deleteEnviament = async (id) => {
    try {
      setLoading(true);
      await deleteEnviamentApi(id, auth.token);
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
    enviaments,
    estatEnviaments,
    getEnviaments,
    getEstatEnviaments,
    createEnviament,
    deleteEnviament,
    updateEnviament,
  };
};
