import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchJson } from '../lib/api';
import type { Item } from '../common/types/Item';

export default function ItemPage() {
    const { id } = useParams();
    const [item, setItem] = useState<Item | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchJson<Item>(`/api/items/${id}`)
            .then(setItem)
            .catch((err) => setError(err.message));
    }, [id]);

    if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
    if (!item) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{item.name}</h1>
            {item.container && (
                <div
                    className="p-4 rounded-lg shadow-md text-white mb-4"
                    style={{ backgroundColor: item.container.color }}
                >
                    <h2 className="text-xl font-semibold">{item.container.name}</h2>
                    <p className="text-sm">{item.container.description}</p>
                    <Link
                        to={`/containers`}
                        className="inline-block mt-2 text-sm hover:underline"
                    >
                        ← Back to containers
                    </Link>
                </div>
            )}
        </div>
    );
}