import { useEffect, useState } from "react";
import ContainerList from "../components/ContainerList";
import { fetchJson } from "../lib/api";
import type Container from "../common/types/Container";
import type { Item } from "../common/types/Item";

export default function Containers() {
    const [containers, setContainers] = useState<Container[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleRemove = async (id: string) => {
        try {
            await fetch(`/api/containers/${id}`, { method: "DELETE" });
            setContainers(prev => prev.filter(c => c.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete container");
        }
    };

    const handleItemAdded = (newItem: Item) => {
        setContainers(prev => prev.map(container =>
            container.id === newItem.containerId
                ? { ...container, items: [...(container.items || []), newItem] }
                : container
        ));
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchJson<Container[]>("/api/containers");
                setContainers(data || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Loading failed");
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    if (isLoading) return <div>Loading containers...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-6">
            <ContainerList
                containers={containers}
                onRemove={handleRemove}
                onItemAdded={handleItemAdded}
            />
        </div>
    );
}