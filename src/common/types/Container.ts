import type { Item } from "./Item";

export default interface Container {
    id: string;
    name: string;
    color: string;
    description: string;
    items?: Item[];
}


