import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { fetchJson } from "../lib/api";
import type { Advert } from "../common/types/Advert";

interface CreateAdvertFormProps {
    onAdvertCreated?: (newAdvert: Advert) => void;
}

export default function CreateAdvertForm({ onAdvertCreated }: CreateAdvertFormProps) {
    const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            photo: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("Description is required"),
            photo: Yup.string().url("Must be a valid URL").required("Photo URL is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const newAdvert = await fetchJson<Advert>("/api/advert", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });

                if (!newAdvert) {
                    throw new Error("Failed to create advert");
                }

                setMessage({ type: "success", text: "Advert created successfully!" });
                resetForm();
                onAdvertCreated?.(newAdvert);
            } catch (error) {
                setMessage({
                    type: "error",
                    text: error instanceof Error ? error.message : "Unknown error",
                });
            }
        },
    });

    return (
        <div className="mx-auto max-w-sm space-y-6 p-6 rounded-lg border bg-white shadow-sm mb-6">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-semibold">Create Advert</h1>
                <p className="text-sm text-gray-500">Fill out the form to create a new advert</p>
            </div>

            {message && (
                <div
                    className={`text-sm p-2 rounded ${
                        message.type === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        id="title"
                        type="text"
                        {...formik.getFieldProps("title")}
                        className={`w-full px-3 py-2 text-sm border rounded-md shadow-sm ${
                            formik.touched.title && formik.errors.title
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        placeholder="Advert title"
                    />
                    {formik.touched.title && formik.errors.title && (
                        <p className="text-sm text-red-500">{formik.errors.title}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                        id="description"
                        type="text"
                        {...formik.getFieldProps("description")}
                        className={`w-full px-3 py-2 text-sm border rounded-md shadow-sm ${
                            formik.touched.description && formik.errors.description
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        placeholder="Advert description"
                    />
                    {formik.touched.description && formik.errors.description && (
                        <p className="text-sm text-red-500">{formik.errors.description}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Photo URL</label>
                    <input
                        id="photo"
                        type="text"
                        {...formik.getFieldProps("photo")}
                        className={`w-full px-3 py-2 text-sm border rounded-md shadow-sm ${
                            formik.touched.photo && formik.errors.photo
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        placeholder="https://example.com/photo.jpg"
                    />
                    {formik.touched.photo && formik.errors.photo && (
                        <p className="text-sm text-red-500">{formik.errors.photo}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
                    disabled={formik.isSubmitting}
                >
                    {formik.isSubmitting ? "Creating..." : "Create Advert"}
                </button>
            </form>
        </div>
    );
} 