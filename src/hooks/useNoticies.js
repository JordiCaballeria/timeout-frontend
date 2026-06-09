import { useState } from "react";
import {
  getNoticiesApi,
  getNoticiaByIdApi,
  createNoticiaApi,
  deleteNoticiaApi,
  updateNoticiaApi,
} from "../api/noticies";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";
export const useNoticies = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noticies, setNoticies] = useState(null);
  const [noticia, setNoticia] = useState(null);

  const { auth } = useAuth();

  const getNoticies = async () => {
    try {
      setLoading(true);
      const response = await getNoticiesApi();
      setNoticies(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      toast.error(error);
    }
  };

  const getNoticiaById = async (id) => {
    try {
      const noticia = await getNoticiaByIdApi(id);
      setNoticia(noticia);
      return noticia;
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const createNoticia = async (data) => {
    try {
      setLoading(true);
      await createNoticiaApi(data, auth.token);
      setLoading(false);
      toast.success(`Noticia ${data.titol} creada correctament`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };
  const updateNoticia = async (id, data) => {
    try {
      setLoading(true);
      await updateNoticiaApi(id, data, auth.token);
      setLoading(false);
      toast.success(`Noticia ${data.titol} actualitzada correctament`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };
  const deleteNoticia = async (id) => {
    try {
      setLoading(true);
      await deleteNoticiaApi(id, auth.token);
      setLoading(false);
      toast.success(`Noticia amb id ${id} eliminada correctament`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  return {
    loading,
    error,
    noticies,
    noticia,
    getNoticies,
    getNoticiaById,
    createNoticia,
    updateNoticia,
    deleteNoticia,
  };
};
