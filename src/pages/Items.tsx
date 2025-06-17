import React, { useEffect, useState } from "react";
import { fetchJson, type Item } from "../lib/api";

const Items = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);
    fetchJson<Item[]>("/api/items", { signal: abortController.signal })
      .then(setItems)
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => setIsLoading(false));
    return () => abortController.abort();
  }, []);

  if (isLoading) {
    return <div className="p-6 text-center">Loading items...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  if (items.length === 0) {
    return <div className="p-6 text-center">No items found.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Items</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="p-3 bg-gray-100 rounded shadow-sm text-gray-800">
            <strong>ID:</strong> {item.id} - <strong>Name:</strong> {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Items; 