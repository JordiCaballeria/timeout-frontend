import routesAdmin from "./routes.admin";
import routesClient from "./routes.client";
import { Error404 } from "../pages/Error404";
import { ErrorLayout } from "../layouts/ErrorLayout";

export const routesPaths = [...routesAdmin, ...routesClient, {
    layout: ErrorLayout,
    component: Error404,
}]  