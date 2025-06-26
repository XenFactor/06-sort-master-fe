import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Item } from "../common/types/Item";

export default function Items() {
    const [items, setItems] = useState<Item[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("/api/items")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch items");
                return res.json();
            })
            .then(setItems)
            .catch((err) => setError(err.message));
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
                            <span className="font-medium">{item.name}</span>
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