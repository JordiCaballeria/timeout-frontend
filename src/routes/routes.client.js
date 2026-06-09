import { ClientLayout } from "../layouts";
import { Home } from "../pages/client/Home";
import {
  Historia,
  Botiga,
  Noticies,
  Noticia,
  InfoSocisJugadors,
  Soci,
  Organigrama,
  Equip,
  Cart,
  Productes,
  Contacte
} from "../pages/client";
import { Sponsors } from "../components/Client/Sponsors";
import { Partits } from "../pages/client/Partits";

const routesClient = [
  {
    path: "/",
    layout: ClientLayout,
    component: Home,
    exact: true,
  },
  {
    path: "/botiga",
    layout: ClientLayout,
    component: Productes,
    exact: true,
  },
  {
    path: "/botiga/:producteId",
    layout: ClientLayout,
    component: Botiga,
    exact: true,
  },
  {
    path: "/noticies",
    layout: ClientLayout,
    component: Noticies,
    exact: true,
  },
  {
    path: "/noticies/:noticiaId",
    layout: ClientLayout,
    component: Noticia,
    exact: true,
  },
  {
    path: "/historia",
    layout: ClientLayout,
    component: Historia,
    exact: true,
  },
  {
    path: "/organigrama",
    layout: ClientLayout,
    component: Organigrama,
    exact: true,
  },
  {
    path: "/soci",
    layout: ClientLayout,
    component: Soci,
    exact: true,
  },
  {
    path: "/patrocinadors",
    layout: ClientLayout,
    component: Sponsors,
    exact: true,
  },
  {
    path: "/equips/:equipId",
    layout: ClientLayout,
    component: Equip,
    exact: true,
  },
  {
    path: "/partits",
    layout: ClientLayout,
    component: Partits,
    exact: true,
  },
  {
    path: "/cistella",
    layout: ClientLayout,
    component: Cart,
    exact: true,
  },
  {
    path: "/contacte",
    layout: ClientLayout,
    component: Contacte,
    exact: true,
  },
];

export default routesClient;
