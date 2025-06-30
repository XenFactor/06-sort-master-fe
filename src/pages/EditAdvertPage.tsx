import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchJson } from "../lib/api";
import type { Advert } from "../common/types/Advert";

export default function EditAdvertPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
    const [initialValues, setInitialValues] = useState({
        title: "",
        description: "",
        photo: "",
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("Description is required"),
            photo: Yup.string().url("Must be a valid URL").required("Photo URL is required"),
        }),
        onSubmit: async (values) => {
            try {
                await fetchJson(`/api/advert/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });
                setMessage({ type: "success", text: "Advert updated successfully!" });
                setTimeout(() => navigate("/"), 2000); // Redirect to home after 2 seconds
            } catch (error) {
                setMessage({
                    type: "error",
                    text: error instanceof Error ? error.message : "Unknown error",
                });
            }
        },
    });

    useEffect(() => {
        if (id) {
            fetchJson<Advert>(`/api/advert/${id}`)
                .then((data) => {
                    if (data) {
                        setInitialValues({
                            title: data.title,
                            description: data.description,
                            photo: data.photo,
                        });
                    } else {
                        throw new Error("Advert not found");
                    }
                })
                .catch((error) => {
                    setMessage({
                        type: "error",
                        text: error instanceof Error ? error.message : "Could not fetch advert data",
                    });
                });
        }
    }, [id]);

    return (
        <div className="mx-auto max-w-sm space-y-6 p-6 rounded-lg border bg-white shadow-sm my-6">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-semibold">Edit Advert</h1>
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
                    {formik.isSubmitting ? "Updating..." : "Update Advert"}
                </button>
            </form>
        </div>
    );
} 