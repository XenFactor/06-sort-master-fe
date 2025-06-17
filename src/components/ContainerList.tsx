import React, { useEffect, useState } from "react";

interface Item {
    id: string;
    name: string;
}

interface Container  {
    id: string;
    color: string;
    name: string;
    description: string;
    items?: Item[];
}

const fetchJson = async <T,>(
    url: string,
    options?: RequestInit & { signal?: AbortSignal }
): Promise<T> => {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return res.json() as Promise<T>;
};

const ContainerItem = React.memo(({ container, onRemove, onAddItem, disabled }: {
    container: Container;
    onRemove: (id: string) => Promise<void>;
    onAddItem: (containerId: string, itemName: string) => Promise<boolean>;
    disabled?: boolean;
}) => {
    const [itemName, setItemName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isRemoving, setIsRemoving] = useState(false);

    const handleAdd = async () => {
        setError(null);
        if (await onAddItem(container.id, itemName.trim())) {
            setItemName("");
        }
    };

    const handleRemove = async () => {
        setIsRemoving(true);
        try {
            await onRemove(container.id);
        } finally {
            setIsRemoving(false);
        }
    };

    return (
        <li
            className="relative p-4 rounded-lg shadow-md text-white"
            style={{ backgroundColor: container.color }}
        >
            <button
                onClick={handleRemove}
                disabled={disabled || isRemoving}
                className={`absolute top-2 right-2 ${
                    isRemoving ? "bg-gray-500" : "bg-red-600 hover:bg-red-700"
                } text-white px-2 py-1 rounded`}
                aria-label={`Remove container ${container.name}`}
            >
                {isRemoving ? "Removing..." : "Remove"}
            </button>

            <h3 className="text-xl font-semibold">{container.name}</h3>
            <p>{container.description}</p>

            <ul className="mt-4">
                {(container.items || []).map((item) => (
                    <li key={item.id} className="text-white text-sm">
                        - {item.name}
                    </li>
                ))}
            </ul>

            <div className="mt-4">
                <input
                    type="text"
                    placeholder="New item name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    disabled={disabled}
                    className={`w-full p-2 rounded-md border-2 border-black ${
                        disabled ? "bg-gray-200" : "bg-white bg-opacity-70"
                    } text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    aria-label="New item name"
                />
                <button
                    onClick={handleAdd}
                    disabled={disabled}
                    className={`mt-2 px-4 py-2 rounded-md shadow-md ${
                        disabled
                            ? "bg-gray-200 text-gray-800"
                            : "bg-green-600 hover:bg-green-700 text-white border border-green-700"
                    }`}
                >
                    {disabled ? "Adding..." : "Add Item"}
                </button>
                {error && (
                    <p className="text-red-800 text-sm mt-1" aria-live="polite">
                        {error}
                    </p>
                )}
            </div>
        </li>
    );
});

const ContainerList = () => {
    const [containers, setContainers] = useState<Container[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const updateContainer = (id: string, updater: (c: Container) => Container) => {
        setContainers((prev) => prev.map((c) => (c.id === id ? updater(c) : c)));
    };

    const handleRemove = async (id: string) => {
        try {
            await fetchJson<void>(`/api/containers/${id}`, { method: "DELETE" });
            setContainers((prev) => prev.filter((c) => c.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
            throw err; // Пробрасываем ошибку в ContainerItem
        }
    };

    const handleAddItem = async (
        containerId: string,
        itemName: string
    ): Promise<boolean> => {
        try {
            const newItem = await fetchJson<Item>("/api/items", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: itemName, containerId }),
            });
            updateContainer(containerId, (c) => ({ ...c, items: [...(c.items || []), newItem] }));
            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to add item");
            return false;
        }
    };

    useEffect(() => {
        const abortController = new AbortController();
        setIsLoading(true);
        fetchJson<Container[]>("/api/containers", { signal: abortController.signal })
            .then(data => {
                // Гарантируем, что items является массивом при первой загрузке
                setContainers(data.map(c => ({ ...c, items: c.items || [] })));
            })
            .catch(err => {
                if (err.name !== "AbortError") setError(err.message);
            })
            .finally(() => setIsLoading(false));
        return () => abortController.abort();
    }, []);

    if (isLoading && containers.length === 0) {
        return <div className="p-6 text-center">Loading containers...</div>;
    }
    if (error) {
        return <div className="p-6 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Rubbish Containers</h2>
            <ul className="space-y-4">
                {containers.map((container) => (
                    <ContainerItem
                        key={container.id}
                        container={container}
                        onRemove={handleRemove}
                        onAddItem={handleAddItem}
                        disabled={isLoading}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ContainerList;


