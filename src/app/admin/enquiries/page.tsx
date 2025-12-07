"use client";

import Loader, { LoadingSpinner } from "@/components/Loader";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { Enquiry } from "@/constants/types";
import {
    useDeleteAllEnquiries,
    useDeleteEnquiries,
    useDeleteEnquiry,
    useEnquiries,
    useUpdateEnquiryStatus,
} from "@/hooks/useEnquiries";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaCheckSquare, FaEye, FaSquare, FaTrash } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const EnquiryRow = ({
    enquiry,
    selected,
    onSelect,
    onView,
}: {
    enquiry: Enquiry;
    selected: boolean;
    onSelect: (id: string) => void;
    onView: (enquiry: Enquiry) => void;
}) => {
    const { _id: id, name, email, phone, message, status, createdAt } = enquiry;
    const { mutateAsync: deleteEnquiry, isPending: isDeleting } =
        useDeleteEnquiry(id);
    const { mutateAsync: updateStatus, isPending: isUpdating } =
        useUpdateEnquiryStatus(id);

    const handleDelete = async () => {
        ConfirmationModal({
            title: "Delete Enquiry?",
            message: `This will permanently delete ${enquiry.name}'s enquiry`,
            onConfirm: async () => {
                try {
                    await deleteEnquiry();
                    toast.success("Enquiry deleted successfully");
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to delete enquiry");
                }
            },
        });
    };

    const handleStatusChange = async (status: string) => {
        try {
            await updateStatus(status);
            toast.success("Status updated");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status. Try again.");
        }
    };

    if (isDeleting) return <LoadingSpinner />;

    return (
        <tr
            className={`group border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors ${
                selected && "bg-zinc-900"
            }`}>
            <td className="p-6">
                <button
                    onClick={() => onSelect(id)}
                    className={`${
                        selected
                            ? "text-white"
                            : "text-zinc-600 hover:text-zinc-400"
                    } transition-colors`}>
                    {selected ? <FaCheckSquare /> : <FaSquare />}
                </button>
            </td>
            <td className="p-6 text-zinc-300 font-medium">{name}</td>
            <td className="p-6 text-zinc-400">{email}</td>
            <td className="p-6 text-zinc-400">{phone}</td>
            <td className="p-6 max-w-xs truncate text-zinc-500">{message}</td>
            <td className="p-6 text-zinc-500 text-sm uppercase tracking-wider">
                {new Date(createdAt).toLocaleDateString()}
            </td>
            <td className="p-6">
                {isUpdating ? (
                    <LoadingSpinner />
                ) : (
                    <select
                        value={status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className={`px-3 py-1 text-xs uppercase tracking-widest font-bold bg-zinc-950 border border-zinc-800 text-zinc-300 focus:border-white outline-none transition-colors appearance-none cursor-pointer hover:bg-zinc-900`}>
                        <option value="new">New</option>
                        <option value="in-progress">In Progress</option>
                        <option value="closed">Closed</option>
                    </select>
                )}
            </td>

            <td className="p-6">
                <div className="flex justify-center items-center gap-4">
                    <button
                        onClick={() => onView(enquiry)}
                        className="text-zinc-400 hover:text-white transition-colors"
                        title="View">
                        <FaEye />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="text-red-900 hover:text-red-500 transition-colors"
                        title="Delete">
                        <FaTrash />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default function AdminEnquiries() {
    const { data: enquiries = [], isPending: isEnquiriesLoading } =
        useEnquiries();
    const { mutateAsync: deleteEnquiries, isPending: isDeletingEnquiries } =
        useDeleteEnquiries();
    const {
        mutateAsync: deleteAllEnquiries,
        isPending: isDeletingAllEnquiries,
    } = useDeleteAllEnquiries();

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [viewingEnquiry, setViewingEnquiry] = useState<Enquiry | null>(null);

    const handleSelectAll = () => {
        if (selectedIds.length === enquiries.length) setSelectedIds([]);
        else setSelectedIds(enquiries.map((e) => e._id));
    };

    const handleSelect = (id: string) => {
        if (selectedIds.includes(id))
            setSelectedIds(selectedIds.filter((sid) => sid !== id));
        else setSelectedIds([...selectedIds, id]);
    };

    const handleBulkDelete = async () => {
        ConfirmationModal({
            title: "Delete Enquiries",
            message: `This will permanently delete ${selectedIds.length} enquiries`,
            onConfirm: async () => {
                try {
                    await deleteEnquiries(selectedIds);
                    toast.success(`Deleted ${selectedIds.length} enquiries`);
                    setSelectedIds([]);
                } catch (error) {
                    console.error(error);
                    toast.error(
                        `Failed to delete ${selectedIds.length} enquiries`
                    );
                }
            },
            onCancel: () => setSelectedIds([]),
        });
    };

    const handleDeleteAll = async () => {
        ConfirmationModal({
            title: "Delete All Enquiries",
            message: `This will permanently delete all enquiries`,
            onConfirm: async () => {
                try {
                    await deleteAllEnquiries();
                    toast.success("Deleted all enquiries");
                    setSelectedIds([]);
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to delete all enquiries");
                }
            },
            onCancel: () => setSelectedIds([]),
        });
    };

    if (isEnquiriesLoading || isDeletingEnquiries || isDeletingAllEnquiries)
        return <Loader />;

    return (
        <div>
            <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
                <h1 className="text-3xl font-bold tracking-tighter uppercase text-white">
                    Enquiries
                </h1>
                <div className="flex gap-4">
                    {enquiries.length > 0 && (
                        <button
                            onClick={handleDeleteAll}
                            className="bg-red-950/30 border border-red-900 text-red-400 hover:bg-red-900 hover:text-white px-3 py-2 text-sm uppercase tracking-widest font-medium transition-colors flex items-center gap-2">
                            <FaTrash />{" "}
                            <span className="hidden md:inline">Delete All</span>
                        </button>
                    )}

                    {selectedIds.length > 0 && (
                        <button
                            onClick={handleBulkDelete}
                            className="bg-zinc-900 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white px-3 py-2 text-sm uppercase tracking-widest font-medium transition-colors flex items-center gap-2">
                            <FaTrash />{" "}
                            <span className="hidden md:inline">
                                Delete Selected{" "}
                            </span>
                            ({selectedIds.length})
                        </button>
                    )}
                </div>
            </div>

            <div className="border border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-center">
                        <thead className="bg-zinc-950 border-b border-zinc-800">
                            <tr>
                                {enquiries.length > 0 && (
                                    <th className="p-3 w-10">
                                        <input
                                            type="checkbox"
                                            checked={
                                                selectedIds.length ===
                                                enquiries.length
                                            }
                                            onChange={handleSelectAll}
                                            className="text-zinc-600 hover:text-white transition-colors"
                                        />
                                    </th>
                                )}
                                {[
                                    "Name",
                                    "Email",
                                    "Phone",
                                    "Message",
                                    "Date",
                                    "Status",
                                    "Actions",
                                ].map((header) => (
                                    <th
                                        key={header}
                                        className="p-3 text-xs uppercase tracking-widest text-zinc-500 font-medium">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800 bg-black">
                            {enquiries.map((enquiry) => (
                                <EnquiryRow
                                    key={enquiry._id}
                                    enquiry={enquiry}
                                    selected={selectedIds.includes(enquiry._id)}
                                    onSelect={handleSelect}
                                    onView={setViewingEnquiry}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                {enquiries.length === 0 && (
                    <div className="p-6 text-center text-zinc-600 uppercase tracking-widest">
                        No enquiries found
                    </div>
                )}
            </div>

            {viewingEnquiry &&
                EnquiryModal({ enquiry: viewingEnquiry, setViewingEnquiry })}
        </div>
    );
}

const EnquiryModal = ({
    enquiry,
    setViewingEnquiry,
}: {
    enquiry: Enquiry;
    setViewingEnquiry: (enquiry: Enquiry | null) => void;
}) => {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-zinc-950 border border-zinc-800 px-8 py-4 w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="w-full flex justify-between items-center mb-6 border-b border-zinc-800 pb-2">
                    <h2 className="text-2xl font-bold uppercase tracking-tighter text-white">
                        Enquiry Details
                    </h2>
                    <button
                        onClick={() => setViewingEnquiry(null)}
                        className="p-2 text-zinc-500 hover:text-white transition-colors">
                        <FaX size={20} />
                    </button>
                </div>
                <div className="space-y- grid grid-cols-2 gap-8">
                    <div className="col-span-1">
                        <label className="block text-xs uppercase tracking-widest text-zinc-500">
                            Name
                        </label>
                        <p className="text-lg font-medium text-white border-b border-zinc-800 py-1">
                            {enquiry.name}
                        </p>
                    </div>
                    <div className="col-span-1">
                        <label className="block text-xs uppercase tracking-widest text-zinc-500">
                            Email
                        </label>
                        <p className="text-lg font-medium text-white border-b border-zinc-800 py-1">
                            {enquiry.email}
                        </p>
                    </div>
                    <div className="col-span-1">
                        <label className="block text-xs uppercase tracking-widest text-zinc-500">
                            Phone
                        </label>
                        <p className="text-lg font-medium text-white border-b border-zinc-800 py-1">
                            {enquiry.phone}
                        </p>
                    </div>
                    <div className="col-span-1">
                        <label className="block text-xs uppercase tracking-widest text-zinc-500">
                            Status
                        </label>
                        <p className="text-lg font-medium text-white border-b border-zinc-800 py-1 uppercase">
                            {enquiry.status}
                        </p>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-4">
                            Message
                        </label>
                        <div className="bg-zinc-900/50 border border-zinc-800 px-3 py-2 text-zinc-300 whitespace-pre-wrap leading-relaxed">
                            {enquiry.message}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
