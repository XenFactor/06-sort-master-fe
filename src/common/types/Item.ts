export interface Item {
    id: string;
    name: string;
    containerId: string;
    container?: {
        id: string;
        name: string;
        color: string;
        description: string;
    };
}