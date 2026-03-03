import React, { useEffect, useState } from "react";
import { useGetAllGalleries } from "@/hooks/server/queries";
import { useCreateGallery, useDeleteGallery } from "@/hooks/server/mutations";
import { Plus, RefreshCw, Trash2, XCircle, Upload } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Throbber from "./ui/throbber";

const AdminGallery = () => {
  const navigate = useNavigate();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { data, isLoading, refetch, isFetching } = useGetAllGalleries();
  const { mutateAsync: createGallery, isPending: isCreating } =
    useCreateGallery();
  const { mutateAsync: deleteGallery, isPending: isDeleting } =
    useDeleteGallery();

  const galleries = data?.galleries || [];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!imageFile) {
      toast.error("Please select an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("description", description);

      await createGallery(formData);
      setIsUploadModalOpen(false);
      resetForm();
      toast.success("Gallery image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading gallery image:", error);
      toast.error("Failed to upload image. Please try again.");
    }
  };

  const resetForm = () => {
    setDescription("");
    setImageFile(null);
    setImagePreview(null);
  };

  const handleDelete = (id) => {
    setDeleteTargetId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;

    try {
      await deleteGallery(deleteTargetId);
      setIsDeleteModalOpen(false);
      setDeleteTargetId(null);
      toast.success("Gallery image deleted successfully!");
    } catch (error) {
      console.error("Error deleting gallery image:", error);
      toast.error("Failed to delete image. Please try again.");
    }
  };

  return (
    <div className="p-3 sm:p-6 bg-white min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Gallery Management
          </h2>
          <p className="text-xs sm:text-sm text-black">
            Upload and manage gallery images
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            className="w-9 h-9 flex items-center justify-center border rounded-lg hover:bg-gray-100"
            title="Refresh"
          >
            <RefreshCw
              className={`w-5 h-5 ${isFetching ? "animate-spin" : ""}`}
            />
          </button>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Image
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="mt-6">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, idx) => (
              <div
                key={idx}
                className="aspect-square bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : galleries.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">No gallery images yet</p>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Upload First Image
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleries.map((item) => (
              <div
                key={item._id}
                className="group relative aspect-square rounded-xl overflow-hidden border border-gray-200"
              >
                <img
                  src={item.image}
                  alt={item.description || "Gallery image"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                {item.description && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white text-sm line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white w-full max-w-md rounded-xl p-6 relative">
            <button
              onClick={() => {
                setIsUploadModalOpen(false);
                resetForm();
              }}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-black"
            >
              <XCircle strokeWidth={1.5} className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-semibold mb-6">Upload Gallery Image</h3>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image <span className="text-red-500">*</span>
              </label>
              <div
                onClick={() =>
                  document.getElementById("gallery-image-input").click()
                }
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                  imagePreview
                    ? "border-green-400 bg-green-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-48 mx-auto rounded-lg object-contain"
                  />
                ) : (
                  <div className="py-4">
                    <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500 text-sm">
                      Click to upload image
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      PNG, JPG, WEBP up to 5MB
                    </p>
                  </div>
                )}
              </div>
              <input
                id="gallery-image-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description for this image..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleUpload}
              disabled={isCreating || !imageFile}
              className="w-full bg-black text-white py-3 rounded-lg text-sm font-semibold hover:bg-gray-900 disabled:opacity-70 flex items-center justify-center"
            >
              {isCreating ? (
                <Throbber className="w-5 h-5 text-white" />
              ) : (
                "Upload Image"
              )}
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeleteTargetId(null);
              }}
              className="absolute top-4 right-4 p-1 text-gray-500 hover:text-black"
            >
              <XCircle strokeWidth={1.5} className="w-5 h-5" />
            </button>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
              Delete Image
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete this gallery image? This action
              cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeleteTargetId(null);
                }}
                className="flex-1 rounded-lg border border-gray-300 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex-1 rounded-lg bg-red-600 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-70"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
