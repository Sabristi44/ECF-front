import type {RouteRecordRaw} from "vue-router";

export const STRUCT_ROUTE: RouteRecordRaw[] = [
    {
        path: "",
        redirect: "/secure/structure/"
    },
    {
        path: "structureList",
        name: "structureList",
        beforeEnter: [initFetchStructureInfos],
        component: () => import()
    },
    {
        path: "structureInfos/:structure_id",
        name: "infos structure",
        component: () => import()
    }
]