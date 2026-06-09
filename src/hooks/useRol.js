import { useState } from "react";
import {
  getRolsApi,
  createRolApi,
  updateRolApi,
  deleteRolApi,
} from "../api/rols";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";

export const useRol = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rols, setRols] = useState(null);
  const { auth } = useAuth();

  const getRols = async () => {
    try {
      setLoading(true);
      const response = await getRolsApi(auth.token);
      setRols(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      toast.error(error);
    }
  };

  const createRol = async (data) => {
    try {
      setLoading(true);
      const response = await createRolApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      toast.error(error);
    }
  };

  const updateRol = async (id, data) => {
    try {
      setLoading(true);
      await updateRolApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      toast.error(error);
    }
  };
  const deleteRol = async (id) => {
    try {
      setLoading(true);
      await deleteRolApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      toast.error(error);
    }
  };

  return {
    loading,
    error,
    rols,
    getRols,
    createRol,
    updateRol,
    deleteRol,
  };
};
