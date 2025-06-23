import { useEffect, useState } from "react";
import type { Item } from "../common/types/Item";


export default function Items() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/items", { signal: controller.signal })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch items");
          return res.json();
        })
        .then(setItems)
        .catch((err) => {
          if (err.name !== "AbortError") setError(err.message);
        });
    return () => controller.abort();
  }, []);

  return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">All Items</h2>
        {error && <p className="text-red-500">{error}</p>}
        <ul className="list-disc list-inside space-y-1">
          {items.map((item) => (
              <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
  );
}
