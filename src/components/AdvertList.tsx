import type { Advert } from "../common/types/Advert";
import { Link } from "react-router-dom";
import { fetchJson } from "../lib/api";

interface AdvertListProps {
    adverts: Advert[];
    onDelete: (id: number) => void;
}

export default function AdvertList({ adverts, onDelete }: AdvertListProps) {
    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this advert?")) {
            return;
        }
        try {
            await fetchJson(`/api/advert/${id}`, { method: "DELETE" });
            onDelete(id);
        } catch (err) {
            console.error("Failed to delete advert:", err);
            // Optionally, show an error to the user
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Adverts</h2>
            {adverts.length === 0 && <p className="text-center text-gray-500">No adverts yet.</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {adverts.map((advert) => (
                    <div key={advert.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                        <img src={advert.photo} alt={advert.title} className="w-full h-48 object-cover" />
                        <div className="p-4 flex-grow">
                            <h3 className="text-lg font-semibold">{advert.title}</h3>
                            <p className="text-gray-600 mt-1">{advert.description}</p>
                        </div>
                        <div className="p-4 bg-gray-50 border-t flex justify-end space-x-2">
                            <Link
                                to={`/edit-advert/${advert.id}`}
                                className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(advert.id)}
                                className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 