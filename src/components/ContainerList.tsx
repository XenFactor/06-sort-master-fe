import ContainerCard from "./ContainerCard";
import type Container from "../common/types/Container";
import type { Item } from "../common/types/Item";

interface Props {
    containers: Container[],
    onRemove: (id: string) => void,
    onItemAdded?: (newItem: Item) => void
}

export default function ContainerList({ containers, onRemove, onItemAdded }: Props) {
    return (
        <div>
            {containers.map((container) => (
                <ContainerCard
                    key={container.id}
                    container={container}
                    onRemove={onRemove}
                    onItemAdded={onItemAdded}
                />
            ))}
        </div>
    );
}