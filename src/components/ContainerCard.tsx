import type Container from "../common/types/Container";
import CreateItemForm from "./CreateItemForm";
import type {Item} from "../lib/api.ts";
import React from "react";

interface Props {
    container: Container;
    onRemove: (id: string) => void;
    onItemAdded?: (item: Item) => void;
}


function ContainerCard({ container, onRemove, onItemAdded }: Props) {
    return (
        <div className="mb-6 p-4 rounded-lg shadow-md text-white"
             style={{ backgroundColor: container.color }}>
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold mb-2">{container.name}</h2>
                    <p className="text-sm">{container.description}</p>
                </div>
                <button
                    onClick={() => onRemove(container.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                >
                    Remove
                </button>
            </div>


            {(container.items || []).length > 0 && (
                <ul className="mt-2 text-sm list-disc list-inside text-white/90">
                    {container.items!.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            )}

            <CreateItemForm
                containerId={container.id}
                onItemCreated={onItemAdded}
            />
        </div>
    );
}

export default React.memo(ContainerCard);