import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import type { Item } from "../common/types/Item";

interface Props {
    containerId: string;
    onItemCreated?: (item: Item) => void;
}

export default function CreateItemForm({ containerId, onItemCreated }: Props) {
    const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

    const formik = useFormik({
        initialValues: { name: "" },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Name is required")
                .max(50, "Name too long"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await fetch("/api/items", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...values, containerId }),
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || "Failed to create item");
                }

                const newItem = await response.json();
                setMessage({ type: "success", text: "Item created!" });
                resetForm();
                onItemCreated?.(newItem);
            } catch (error) {
                setMessage({
                    type: "error",
                    text: error instanceof Error ? error.message : "Unknown error"
                });
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="mt-4">
            <input
                type="text"
                name="name"
                placeholder="New item name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full p-2 rounded bg-white bg-opacity-70 text-gray-800 mb-2 ${
                    formik.touched.name && formik.errors.name ? "border-2 border-red-500" : ""
                }`}
            />

            <button
                type="submit"
                disabled={formik.isSubmitting}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
                {formik.isSubmitting ? "Adding..." : "Add item"}
            </button>

            {formik.touched.name && formik.errors.name && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.name}</p>
            )}

            {message && (
                <div className={`mt-2 text-sm p-2 rounded ${
                    message.type === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                }`}>
                    {message.text}
                </div>
            )}
        </form>
    );
}