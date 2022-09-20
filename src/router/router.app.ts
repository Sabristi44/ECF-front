import { isAdmin } from "@/guards/authentification.guard";
import { initFetchPartnerInfos } from "@/stores/partner.store";
import { initFetchStructureInfos } from "@/stores/structure.store";
import type {RouteRecordRaw} from "vue-router";
import { PARTNER_ROUTE } from "./partner.routes.list";
import { STRUCTURE_ROUTE } from "./structure.routes.list";

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
        children: STRUCTURE_ROUTE,
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