import { useState } from "react";
import {
  getEquipsApi,
  getEquipByIdApi,
  createEquipApi,
  updateEquipApi,
  deleteEquipApi,
  getCategoriesApi,
  getEsportsApi,
  getDivisionsApi,
  updateJugadoresEquipApi,
  updateEntrenadoresEquipApi,
  createCategoriaApi,
  updateCategoriaApi,
  deleteCategoriaApi,
  createDivisioApi,
  updateDivisioApi,
  deleteDivisioApi,
  createEsportApi,
  updateEsportApi,
  deleteEsportApi,
  getEquipsClientApi,
} from "../api/equips";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";

export const useEquips = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [equips, setEquips] = useState(null);
  const [equip, setEquip] = useState(null);
  const [equipsClient, setEquipsClient] = useState(null);
  const [esport, setEsport] = useState(null);
  const [divisio, setDivisio] = useState(null);
  const [categoria, setCategoria] = useState(null);

  const { auth } = useAuth();

  const getEquips = async () => {
    try {
      setLoading(true);
      const response = await getEquipsApi(auth.token);
      setEquips(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };
  const getEquipsClient = async () => {
    try {
      setLoading(true);
      const response = await getEquipsClientApi();
      setEquipsClient(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const getEquipById = async (id) => {
    try {
      const equip = await getEquipByIdApi(id);
      setEquip(equip);
      return equip;
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const createEquip = async (data) => {
    try {
      setLoading(true);
      const response = await createEquipApi(data, auth.token);
      setLoading(false);
      toast.success(`Equip ${data.nom} creat correctament`);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const updateEquip = async (id, data) => {
    try {
      setLoading(true);
      await updateEquipApi(id, data, auth.token);
      setLoading(false);
      toast.success(`Equip ${data.nom} actualitzat correctament`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const deleteEquip = async (id) => {
    try {
      setLoading(true);
      await deleteEquipApi(id, auth.token);
      setLoading(false);
      toast.success(`Equip amb la id ${id} eliminat correctament`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const getEsports = async () => {
    try {
      setLoading(true);
      const response = await getEsportsApi(auth.token);
      setEsport(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const getDivisions = async () => {
    try {
      setLoading(true);
      const response = await getDivisionsApi(auth.token);
      setDivisio(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategoriesApi(auth.token);
      setCategoria(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const updateJugadoresEquip = async (data) => {
    try {
      setLoading(true);
      await updateJugadoresEquipApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };
  const updateEntrenadoresEquip = async (data) => {
    try {
      setLoading(true);
      const response = await updateEntrenadoresEquipApi(data, auth.token);
      setCategoria(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };
  const createDivisio = async (data) => {
    try {
      setLoading(true);
      await createDivisioApi(data, auth.token);
      setLoading(false);
      toast.success(`Divisio ${data.nom} creada correctament`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const updateDivisio = async (id, data) => {
    try {
      setLoading(true);
      await updateDivisioApi(id, data, auth.token);
      setLoading(false);
      toast.success(`Divisio ${data.nom} actualitzada correctament`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const deleteDivisio = async (id) => {
    try {
      setLoading(true);
      await deleteDivisioApi(id, auth.token);
      setLoading(false);
      toast.success(`Divisio amb id ${id} eliminada correctament`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const createCategoria = async (data) => {
    try {
      setLoading(true);
      await createCategoriaApi(data, auth.token);
      setLoading(false);
      toast.success(`Categoria ${data.nom} creada correctament`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const updateCategoria = async (id, data) => {
    try {
      setLoading(true);
      await updateCategoriaApi(id, data, auth.token);
      setLoading(false);
      toast.success(`Categoria ${data.nom} actualitzada correctament`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const deleteCategoria = async (id) => {
    try {
      setLoading(true);
      await deleteCategoriaApi(id, auth.token);
      setLoading(false);
      toast.success(`Categoria amb id ${id} eliminada correctament`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const createEsport = async (data) => {
    try {
      setLoading(true);
      await createEsportApi(data, auth.token);
      setLoading(false);
      toast.success(`Esport ${data.nom} creat correctament`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const updateEsport = async (id, data) => {
    try {
      setLoading(true);
      await updateEsportApi(id, data, auth.token);
      setLoading(false);
      toast.success(`Esport ${data.nom} actualitzat correctament`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const deleteEsport = async (id) => {
    try {
      setLoading(true);
      await deleteEsportApi(id, auth.token);
      setLoading(false);
      toast.success(`Esport amb id ${id} eliminat correctament`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  return {
    getEquips,
    getEquipById,
    deleteEquip,
    updateEquip,
    createEquip,
    getCategories,
    getDivisions,
    getEsports,
    updateJugadoresEquip,
    updateEntrenadoresEquip,
    createCategoria,
    updateCategoria,
    deleteCategoria,
    createDivisio,
    updateDivisio,
    deleteDivisio,
    createEsport,
    updateEsport,
    deleteEsport,
    getEquipsClient,
    equips,
    equip,
    equipsClient,
    esport,
    categoria,
    divisio,
    loading,
    error,
  };
};
