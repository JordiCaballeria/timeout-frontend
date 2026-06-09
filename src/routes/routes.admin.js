import { AdminLayout } from "../layouts";
import { AdminHome } from "../pages/admin/AdminHome";
import { AdminUsers } from "../pages/admin";
import { AdminJugadors } from "../pages/admin/AdminJugadors";
import { AdminEsdeveniments } from "../pages/admin/AdminEsdeveniments";
import { AdminBotiga } from "../pages/admin/AdminBotiga";
import { AdminNoticies } from "../pages/admin/AdminNoticies";
import { AdminTreballadors } from "../pages/admin/AdminTreballadors";
import { AdminRols } from "../pages/admin/AdminRols";
import { AdminSocis } from "../pages/admin/AdminSocis";
import { AdminEquips } from "../pages/admin/AdminEquips";
import { AdminTipusEsdeveniments } from "../pages/admin/AdminTipusEsdeveniments";
import { AdminDivisions } from "../pages/admin/AdminDivisions";
import { AdminCategories } from "../pages/admin/AdminCategories";
import { AdminEsports } from "../pages/admin/AdminEsports";
import { AdminSimpatitzants } from "../pages/admin/AdminSimpatitzants";
import { AdminTalles } from "../pages/admin/AdminTalles";
import { AdminProductes } from "../pages/admin/AdminProductes";
import { AdminTipusProducte } from "../pages/admin/AdminTipusProducte";
import { AdminPatrocinadors } from "../pages/admin/AdminPatrocinadors";
import { AdminPagaments } from "../pages/admin/AdminPagaments";
import { AdminEntrades } from "../pages/admin/AdminEntrades";
import { AdminEnviaments } from "../pages/admin/AdminEnviaments";

const routesAdmin = [
  {
    path: "/admin",
    layout: AdminLayout,
    component: AdminHome,
    exact: true,
  },
  {
    path: "/admin/equips",
    layout: AdminLayout,
    component: AdminEquips,
    exact: true,
  },
  {
    path: "/admin/jugadors",
    layout: AdminLayout,
    component: AdminJugadors,
    exact: true,
  },
  {
    path: "/admin/esdeveniments",
    layout: AdminLayout,
    component: AdminEsdeveniments,
    exact: true,
  },
  {
    path: "/admin/noticies",
    layout: AdminLayout,
    component: AdminNoticies,
    exact: true,
  },
  {
    path: "/admin/botiga",
    layout: AdminLayout,
    component: AdminBotiga,
    exact: true,
  },
  {
    path: "/admin/users",
    layout: AdminLayout,
    component: AdminUsers,
    exact: true,
  },
  {
    path: "/admin/users/treballadors",
    layout: AdminLayout,
    component: AdminTreballadors,
    exact: true,
  },
  {
    path: "/admin/users/socis",
    layout: AdminLayout,
    component: AdminSocis,
    exact: true,
  },
  {
    path: "/admin/rols",
    layout: AdminLayout,
    component: AdminRols,
    exact: true,
  },
  {
    path: "/admin/tipusesdeveniments",
    layout: AdminLayout,
    component: AdminTipusEsdeveniments,
    exact: true,
  },
  {
    path: "/admin/divisions",
    layout: AdminLayout,
    component: AdminDivisions,
    exact: true,
  },
  {
    path: "/admin/categories",
    layout: AdminLayout,
    component: AdminCategories,
    exact: true,
  },
  {
    path: "/admin/esports",
    layout: AdminLayout,
    component: AdminEsports,
    exact: true,
  },
  {
    path: "/admin/users/simpatitzants",
    layout: AdminLayout,
    component: AdminSimpatitzants,
    exact: true,
  },
  {
    path: "/admin/botiga/talles",
    layout: AdminLayout,
    component: AdminTalles,
    exact: true,
  },
  {
    path: "/admin/botiga/productes",
    layout: AdminLayout,
    component: AdminProductes,
    exact: true,
  },
  {
    path: "/admin/botiga/tipusproducte",
    layout: AdminLayout,
    component: AdminTipusProducte,
    exact: true,
  },
  {
    path: "/admin/patrocinadors",
    layout: AdminLayout,
    component: AdminPatrocinadors,
    exact: true,
  },
  {
    path: "/admin/pagaments",
    layout: AdminLayout,
    component: AdminPagaments,
    exact: true,
  },
  {
    path: "/admin/entrades",
    layout: AdminLayout,
    component: AdminEntrades,
    exact: true,
  },
  {
    path: "/admin/enviaments",
    layout: AdminLayout,
    component: AdminEnviaments,
    exact: true,
  },
];

export default routesAdmin;
