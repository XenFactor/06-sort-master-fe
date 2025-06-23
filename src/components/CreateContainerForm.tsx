import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

export default function CreateContainerForm() {
  const [message, setMessage] = useState<{ type: string; text: string } | null>(
      null
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      color: "#000000",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      color: Yup.string().required("Color is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch("/api/containers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!response.ok) throw new Error("Failed to create container");

        setMessage({
          type: "success",
          text: "Container created successfully!",
        });
        resetForm();
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
          <h1 className="text-2xl font-semibold">Create Container</h1>
          <p className="text-sm text-gray-500">
            Fill out the form to create a new rubbish container
          </p>
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
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
                id="name"
                type="text"
                {...formik.getFieldProps("name")}
                className={`w-full px-3 py-2 text-sm border rounded-md shadow-sm ${
                    formik.touched.name && formik.errors.name
                        ? "border-red-500"
                        : "border-gray-300"
                }`}
                placeholder="Plastic, Paper..."
            />
            {formik.touched.name && formik.errors.name && (
                <p className="text-sm text-red-500">{formik.errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Color (Choose the container color)
            </label>
            <input
                id="color"
                type="color"
                {...formik.getFieldProps("color")}
                className="w-full h-10 px-0 py-0 border rounded-md cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
                id="description"
                type="text"
                {...formik.getFieldProps("description")}
                className={`w-full px-3 py-2 text-sm border rounded-md shadow-sm ${
                    formik.touched.description && formik.errors.description
                        ? "border-red-500"
                        : "border-gray-300"
                }`}
                placeholder="Orange container for plastic"
            />
            {formik.touched.description && formik.errors.description && (
                <p className="text-sm text-red-500">{formik.errors.description}</p>
            )}
          </div>

          <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
          >
            Create Container
          </button>
        </form>
      </div>
  );
}