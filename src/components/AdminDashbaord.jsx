import React, { useEffect, useMemo, useState } from "react";
import DataTable from "./ui/data-table";
import { useGetAllAppointments } from "@/hooks/server/queries";
import moment from "moment";
import { Image, RefreshCw, Trash2, XCircle } from "lucide-react";
import {
  useDeleteAppointment,
  useUpdateAppointmentStatus,
} from "@/hooks/server/mutations";
import { toast } from "react-toastify";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const { data, isLoading, refetch, isFetching, isError, error } =
    useGetAllAppointments({
      status:
        activeTab.toLowerCase() === "all" ? undefined : activeTab.toLowerCase(),
    });
  const { mutateAsync: updateAppointmentStatus, isPending: isUpdating } =
    useUpdateAppointmentStatus();
  const { mutateAsync: deleteAppointment, isPending: isDeleting } =
    useDeleteAppointment();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin-login");
    }
  }, [navigate]);

  useEffect(() => {
    if (!isError) {
      return;
    }
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      navigate("/admin-login");
    }
  }, [error, isError, navigate]);

  const handleApproval = async (id) => {
    try {
      await updateAppointmentStatus({ id, status: "approved" });
      setIsModalOpen(false);
      toast.success("Appointment approved successfully!");
    } catch (error) {
      console.error("Error approving appointment:", error);
    }
  };

  const handleDecline = async () => {
    if (!rejectionReason.trim()) {
      toast.error("Please add a rejection reason.");
      return;
    }

    try {
      await updateAppointmentStatus({
        id: selectedItem._id,
        status: "rejected",
        rejectionReason: rejectionReason.trim(),
      });
      setIsDeclineModalOpen(false);
      setRejectionReason("");
      toast.success("Appointment rejected successfully!");
    } catch (error) {
      console.error("Error rejecting appointment:", error);
    }
  };

  const handleDelete = (id) => {
    setDeleteTargetId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) {
      return;
    }

    try {
      await deleteAppointment(deleteTargetId);
      setIsDeleteModalOpen(false);
      setDeleteTargetId(null);
      toast.success("Appointment deleted successfully!");
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        cell: ({ row }) => <span>{row.original._id}</span>,
      },
      {
        accessorKey: "fullName",
        header: "Name",
      },
      {
        accessorKey: "serviceType",
        header: "Service Type",
      },
      {
        accessorKey: "applianceType",
        header: "Appliance Type",
      },
      {
        accessorKey: "createdAt",
        header: "Date Submitted",
        cell: ({ row }) => (
          <span>{moment(row.getValue("createdAt")).format("DD-MM-YYYY")}</span>
        ),
      },
      {
        accessorKey: "appointmentDate",
        header: "Date Requested",
        cell: ({ row }) => (
          <span>
            {moment(row.getValue("appointmentDate")).format("DD-MM-YYYY")}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status.toLowerCase();
          const statusColors = {
            pending: "bg-yellow-100 text-yellow-800",
            approved: "bg-green-100 text-green-800",
            rejected: "bg-red-100 text-red-800",
          };
          return (
            <span
              className={`px-1.5 sm:px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap capitalize ${statusColors[status] || "bg-gray-100 text-gray-800 "}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const item = row.original;

          return (
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                className="text-xs sm:text-sm text-black underline hover:text-blue-600 whitespace-nowrap"
                onClick={() => {
                  setSelectedItem(item);
                  setIsModalOpen(true);
                  setShowDetails(false);
                }}
              >
                Review
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                disabled={isDeleting}
                className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center bg-gray-100 text-red-500 rounded-lg hover:bg-red-100 shrink-0 disabled:opacity-60"
              >
                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          );
        },
      },
    ],
    [setIsModalOpen, setSelectedItem, setShowDetails, isDeleting],
  );

  return (
    <div className="p-3 sm:p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Admin Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-black">
            Manage appointment requests
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            className="w-9 h-9 flex items-center justify-center border rounded-lg hover:bg-gray-100"
          >
            <RefreshCw
              className={`w-5 h-5 ${isFetching ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Tabs + Actions */}

      <Tabs className={"mt-4"} value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList className="sm:w-auto gap-2 bg-transparent p-0">
            {["All", "Pending", "Approved", "Rejected"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="rounded-none border-b-2 border-transparent px-4 pb-1 text-xs sm:text-sm font-medium data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 hover:cursor-pointer"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex gap-2 sm:gap-3 sm:w-auto">
            <button className="flex-1 sm:flex-none px-2 sm:px-4 py-2 text-xs sm:text-sm border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 whitespace-nowrap">
              Download PDF
            </button>
            <button className="flex-1 sm:flex-none px-2 sm:px-4 py-2 text-xs sm:text-sm border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 whitespace-nowrap">
              Clear All
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto">
          <DataTable
            isLoading={isLoading}
            columns={columns}
            data={data?.appointments || []}
          />
        </div>
      </Tabs>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 sm:p-0">
          <div className="bg-white w-full max-w-md rounded-xl p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 sm:top-5 right-2 p-1 text-gray-400 hover:text-black"
            >
              <XCircle strokeWidth={1.5} className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Header */}
            <div className="mt-8 mb-4">
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                {selectedItem.fullName}
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-xs sm:text-sm text-gray-500">
                  {selectedItem.applianceType} | {selectedItem.serviceType}
                </p>
                <span className="capitalize px-2 sm:px-3 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700 whitespace-nowrap">
                  {selectedItem.status}
                </span>
              </div>
            </div>

            {/* Main Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm mb-4">
              <div>
                <p className="text-gray-400">Date Submitted</p>
                <p className="font-medium">
                  {moment(selectedItem.createdAt).format("DD-MM-YYYY")}
                </p>
              </div>

              <div>
                <p className="text-gray-400">Date Requested</p>
                <p className="font-medium">
                  {moment(selectedItem.appointmentDate).format("DD-MM-YYYY")}
                </p>
              </div>

              <div>
                <p className="text-gray-400">Phone number</p>
                <p className="font-medium">{selectedItem.phone}</p>
              </div>

              <div>
                <p className="text-gray-400">Service Type</p>
                <p className="font-medium">{selectedItem.serviceType}</p>
              </div>
            </div>

            {/* View more toggle */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs sm:text-sm text-gray-500 flex items-center gap-1"
            >
              {showDetails ? "Hide Details" : "View More"}
              <span>{showDetails ? "▲" : "▼"}</span>
            </button>

            {/* Expanded content */}
            {showDetails && (
              <div className="mt-4 border-t pt-4 text-xs sm:text-sm space-y-3">
                <div>
                  <p className="font-medium">Customer Information</p>
                  <p className="text-gray-500">{selectedItem.email}</p>
                  <p className="text-gray-500">{selectedItem.address}</p>
                </div>

                <div>
                  <p className="font-medium">Service / Problem Description</p>
                  <p className="text-gray-500">
                    {selectedItem.serviceDescription}
                  </p>
                </div>

                {selectedItem.image && (
                  <div>
                    <p className="font-medium">Uploaded files</p>
                    <div className="flex flex-col gap-2 mt-2">
                      <a
                        href={selectedItem.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 sm:px-3 py-1 sm:py-2 text-xs hover:bg-gray-200 bg-gray-100 rounded-lg break-all w-fit"
                      >
                        <Image className="w-4 h-4 inline-block mr-1" />
                        {selectedItem.image?.split("/").pop()}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 sm:gap-3 mt-6">
              <button
                onClick={() => handleApproval(selectedItem._id)}
                className="flex-1 bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-900 disabled:opacity-70"
                disabled={isUpdating}
              >
                {isUpdating ? "Approving..." : "Approve"}
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsDeclineModalOpen(true);
                }}
                className="flex-1 border border-black py-2 rounded-lg text-sm hover:bg-gray-50"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeclineModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 sm:p-0">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setIsDeclineModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-gray-500 hover:text-black"
            >
              <XCircle strokeWidth={1.5} className="w-5 h-5" />
            </button>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
              Additional Information
            </h3>

            <div className="mt-4">
              <label className="text-sm font-semibold text-gray-900">
                Why we declined your request{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                value={rejectionReason}
                onChange={(event) => setRejectionReason(event.target.value)}
                placeholder="Add additional note here"
                rows={4}
                className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <button
              onClick={handleDecline}
              disabled={isUpdating}
              className="mt-6 w-full rounded-lg bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-70"
            >
              {isUpdating ? "Declining..." : "Decline"}
            </button>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 sm:p-0">
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
              Delete Appointment
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete appointment? This action cannot be
              undone.
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

export default AdminDashboard;
