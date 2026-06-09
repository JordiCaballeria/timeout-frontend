import { useState } from "react";
import {
  getPatrocinadorsApi,
  createPatrocinadorApi,
  deletePatrocinadorApi,
  updatePatrocinadorApi,
} from "../api/patrocinadors";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";
export const usePatrocinadors = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patrocinadors, setPatrocinadors] = useState(null);
  const { auth } = useAuth();

  const getPatrocinadors = async () => {
    try {
      setLoading(true);
      const response = await getPatrocinadorsApi();
      setPatrocinadors(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      toast.error(error);
    }
  };

  const createPatrocinador = async (data) => {
    try {
      setLoading(true);
      await createPatrocinadorApi(data, auth.token);
      setLoading(false);
      toast.success(`Patrocinador ${data.nom} creada correctament`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };
  const updatePatrocinador = async (id, data) => {
    try {
      setLoading(true);
      await updatePatrocinadorApi(id, data, auth.token);
      setLoading(false);
      toast.success(`Patrocinador ${data.nom} actualitzada correctament`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };
  const deletePatrocinador = async (id) => {
    try {
      setLoading(true);
      await deletePatrocinadorApi(id, auth.token);
      setLoading(false);
      toast.success(`Patrocinador amb id ${id} eliminada correctament`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  return {
    loading,
    error,
    patrocinadors,
    getPatrocinadors,
    createPatrocinador,
    updatePatrocinador,
    deletePatrocinador,
  };
};
