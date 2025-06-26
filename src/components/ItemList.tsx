import type {Item} from "../common/types/Item";

interface Props {
    items: Item[];
    className?: string;
}

export default function ItemList({items, className = ""}: Props) {
    if (items.length === 0) return null;

    return (
        <ul className={`mt-2 text-sm list-disc list-inside text-white/90 ${className}`}>
            {items.map((item) => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    );
}