import { isAdmin } from "@/guards/authentification.guard";
import type {RouteRecordRaw} from "vue-router";

export const RoutesApp: RouteRecordRaw[] = [
    {
        path: "",
        redirect : "/secure/home"
    },
    {
        path: "informations",
        beforeEnter: [initFetchStructureInfos, initFetchPartnerInfos, isAdmin],
        component: () => import(),
        meta: {
            page: "informations"
        }
    },
    {
        path: "partner-informations",
        component: () => import(),
        children: PARTNER_ROUTE,
        meta: {
            page: "partner-infos"
        }
    },

    {
        path: "structure",
        component: () => import(),
        children: STRUCT_ROUTE,
        meta: {
            page: "structure-infos"
        }
    },
    {
        path: "myaccount",
        component: () => import(),
        meta:{
            page: "myaccount"
        }
    },
]