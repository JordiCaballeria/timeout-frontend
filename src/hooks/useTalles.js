import { useState } from "react";
import {
  getTallesApi,
  createTallaApi,
  updateTallaApi,
  deleteTallaApi,
} from "../api/talles";
import { toast } from "react-toastify";

export const useTalles = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [talles, setTalles] = useState(null);

  const getTalles = async () => {
    try {
      setLoading(true);
      const response = await getTallesApi();
      setTalles(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const createTalla = async (data) => {
    try {
      setLoading(true);
      await createTallaApi(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const updateTalla = async (id, data) => {
    try {
      setLoading(true);
      await updateTallaApi(id, data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };
  const deleteTalla = async (id) => {
    try {
      setLoading(true);
      await deleteTallaApi(id);
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
    talles,
    getTalles,
    createTalla,
    updateTalla,
    deleteTalla,
  };
};
