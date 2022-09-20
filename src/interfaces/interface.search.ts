export const DEFAULT_SEARCH: InterfaceSearch = {
    keyword: '',
    state: "all"
}

export type State = "all" | "enable" | "disable"

export interface InterfaceSearch{
    keyword: string,
    state: State,
}

export interface SearchUpdate{
    keyword?: string,
    state?: State,
}

