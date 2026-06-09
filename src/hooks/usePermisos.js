import { useState } from "react";
import { getPermisosApi } from "../api/permisos";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";
export const usePermisos = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [permisos, setPermisos] = useState(null);
  const { auth } = useAuth();

  const getPermisos = async () => {
    try {
      setLoading(true);
      const response = await getPermisosApi(auth.token);
      setPermisos(response);
      setLoading(false);

    } catch (error) {
      setLoading();
      setError(error);
      toast.error(error);
    }
  };

  return {
    loading,
    error,
    permisos,
    getPermisos,
  };
};
