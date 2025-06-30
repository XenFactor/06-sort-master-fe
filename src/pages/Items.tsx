import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Item } from "../common/types/Item";
import type Container from "../common/types/Container";
import { fetchJson } from "../lib/api";

export default function Items() {
    const [items, setItems] = useState<Item[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        Promise.all([
            fetchJson<Item[]>("/api/items"),
            fetchJson<Container[]>("/api/containers"),
        ])
            .then(([itemsData, containersData]) => {
                if (!itemsData || !containersData) {
                    throw new Error("Failed to fetch data");
                }

                const containersMap = new Map(
                    containersData.map((container) => [container.id, container])
                );

                const itemsWithContainers = itemsData.map((item) => ({
                    ...item,
                    container: containersMap.get(item.containerId),
                }));

                setItems(itemsWithContainers);
            })
            .catch((err) =>
                setError(err instanceof Error ? err.message : "Unknown error")
            );
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Items</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="space-y-2">
                {items.map((item) => (
                    <Link
                        key={item.id}
                        to={`/items/${item.id}`}
                        className="block p-3 bg-white rounded shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-medium">
                                {item.name}
                                {item.container && (
                                    <span className="text-sm text-gray-500 ml-2">
                                        - Container: {item.container.name}
                                    </span>
                                )}
                            </span>
                            {item.container && (
                                <span
                                    className="text-xs px-2 py-1 rounded text-white"
                                    style={{ backgroundColor: item.container.color }}
                                >
                                    {item.container.name}
                                </span>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}