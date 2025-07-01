import { useEffect, useState } from "react";
import type Container from "../common/types/Container";
import type { Item } from "../common/types/Item";
import AdvertCarousel from "../components/AdvertCarousel";
import CreateAdvertForm from "../components/CreateAdvertForm.tsx";
import { useAdverts } from "../context/AdvertsContext";

interface Result {
    item: string;
    container: Container;
}

function Home() {
    const [filter, setFilter] = useState("");
    const [results, setResults] = useState<Result[]>([]);
    const [searchError, setSearchError] = useState<string | null>(null);
    const { adverts, error: advertsError, addAdvert, loading } = useAdverts();

    
    useEffect(() => {
        if (filter.trim() === "") {
            setResults([]);
            return;
        }

        const timeoutId = setTimeout(() => {
            fetch(`/api/items/search?name=${filter}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Search failed");
                    return res.json();
                })
                .then((data: Item[]) => {
                    const newResults = data.reduce((acc, item) => {
                        if (item.container) {
                            acc.push({ item: item.name, container: item.container });
                        }
                        return acc;
                    }, [] as Result[]);
                    setResults(newResults);
                })
                .catch((err) => setSearchError(err.message));
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [filter]);

    const handleAdvertCreated = (newAdvert: import("../common/types/Advert").Advert) => {
        addAdvert(newAdvert);
    };

    return (
        <>
            <div className="p-6 max-w-xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Find the Right Container</h2>

                <input
                    type="text"
                    placeholder="Search item name (e.g. newspaper)..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="mb-6 p-2 w-full border rounded-md"
                />

                {searchError && <div className="text-red-500">Error: {searchError}</div>}

                {results.length === 0 && filter.trim() !== "" && (
                    <div className="text-gray-500">No matching containers found.</div>
                )}

                <ul className="space-y-4">
                    {results.map((result: Result) => (
                        <li
                            key={result.item + result.container.id}
                            className="p-4 rounded-lg shadow-md text-white"
                            style={{ backgroundColor: result.container.color }}
                        >
                            <h3 className="text-xl font-semibold">{result.item}</h3>
                            <p>{result.container.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-12">
                <CreateAdvertForm onAdvertCreated={handleAdvertCreated} />
                {advertsError && <p className="text-red-500 text-center my-4">Could not load adverts: {advertsError}</p>}
                {loading ? (
                  <p className="text-center text-gray-500">Loading adverts...</p>
                ) : (
                  <AdvertCarousel adverts={adverts} />
                )}
            </div>
        </>
    );
}

export default Home;
