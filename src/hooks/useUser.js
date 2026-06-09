import { useState } from "react";
import { toast } from "react-toastify";
import {
  getMeApi,
  getUsersApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
  getRolsUserApi,
  updateRolsUserApi,
  getJugadoresApi,
  getEntrenadoresApi,
  sendMailApi,
  registerUserApi,
  imatgeUserApi,
  recuperarPasswordApi,
  createSociApi,
  getResumApi,
  enviarConacteApi,
} from "../api/user";
import { useAuth } from "./useAuth";
import { removeToken } from "../api/token";
export const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState(null);
  const [rolsUsuari, setrolsUsuari] = useState(null);
  const [jugadores, setJugadores] = useState([]);
  const [entrenadores, setEntrenadores] = useState([]);
  const [resum, setResum] = useState();
  const { auth, logout } = useAuth();

  const getMe = async (token) => {
    try {
      const response = await getMeApi(token);
      if (response.messages) logout();
      return response;
    } catch (error) {
      removeToken();
      toast.error(error);
      throw error;
    }
  };
  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsersApi(auth.token);
      setLoading(false);
      setUsers(response);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };
  const getResum = async () => {
    try {
      setLoading(true);
      const response = await getResumApi(auth.token);
      setResum(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };
  const createUser = async (data) => {
    try {
      setLoading(true);
      const response = await createUserApi(data);
      setLoading(false);
      toast.success(`Usuari ${data.username} creat`);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };
  const createSoci = async (data) => {
    try {
      setLoading(true);
      const response = await createSociApi(data, auth.token);
      setLoading(false);
      toast.success(`Soci dona't d'alta`);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };
  const updateUser = async (id, data) => {
    try {
      setLoading(true);
      await updateUserApi(id, data, auth.token);
      setLoading(false);
      toast.success(`Usuari ${data.username} actualitzat`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };
  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await deleteUserApi(id, auth.token);
      setLoading(false);
      toast.success(`Usuari amb la id: ${id} eliminat correctament`);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const updateRolUser = async (data) => {
    try {
      setLoading(true);
      await updateRolsUserApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const getRolsUser = async (id) => {
    try {
      setLoading(true);
      const resp = await getRolsUserApi(id, auth.token);
      setrolsUsuari(resp);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };
  const recuperarPassword = async (data) => {
    try {
      setLoading(true);
      const resp = await recuperarPasswordApi(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };
  const getJugadores = async () => {
    try {
      setLoading(true);
      const resp = await getJugadoresApi(auth.token);
      setJugadores(resp);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };
  const getEntrenadores = async () => {
    try {
      setLoading(true);
      const resp = await getEntrenadoresApi(auth.token);
      setEntrenadores(resp);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };
  const sendMail = async (data) => {
    try {
      setLoading(true);
      const response = await sendMailApi(data, auth.token);
      setLoading(false);
      toast.success("Email enviat correctament");
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const registerUser = async (data) => {
    try {
      setLoading(true);
      const response = await registerUserApi(data);
      setLoading(false);
      if (response.error) {
        toast.error(response.error);
        return false;
      } else {
        toast.success(`S'ha enviat un correu d'activació al teu email`);
        toast.success("Per iniciar sessió activa el teu compte");
        return true;
      }
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const imatgeUser = async (data, idUser) => {
    try {
      setLoading(true);
      const response = await imatgeUserApi(data, idUser);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const enviarContacte = async (data) => {
    try {
      setLoading(true);
      const response = await enviarConacteApi(data);
      setLoading(false);
      toast.success(`El formulari s'ha enviat satisfactoriament`);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  const checkPermis = (nom) => {
    let permisAux = false;
    if (nom === "isStaff") return auth.me.is_staff;
    auth.me.permisos.map((permis) => {
      if (permis === nom) permisAux = true;
    });
    return permisAux;
  };

  return {
    loading,
    error,
    users,
    rolsUsuari,
    jugadores,
    entrenadores,
    resum,
    auth,
    getMe,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getRolsUser,
    updateRolUser,
    getJugadores,
    getEntrenadores,
    sendMail,
    checkPermis,
    registerUser,
    imatgeUser,
    recuperarPassword,
    createSoci,
    getResum,
    enviarContacte,
  };
};
