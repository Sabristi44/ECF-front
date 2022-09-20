import { initFetchPartnerInfos } from "@/stores/partner.store";
import type {RouteRecordRaw} from "vue-router";

export const PARTNER_ROUTE: RouteRecordRaw[] = [
    {
        path: "",
        redirect : "/secure/partner"
    },
    {
        path: "partnerList",
        name: "partnerList",
        beforeEnter: [initFetchPartnerInfos],
        component: () => import()
    },
    {
        path:"partnerInfos/:partner_id",
        name: "infos partner",
        component: () => import()
    }
]