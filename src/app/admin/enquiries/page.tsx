"use client";

import Loader from "@/components/Loader";
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
    onSelect: (id: number) => void;
    onView: (enquiry: Enquiry) => void;
}) => {
    const { id, name, email, phone, message, status, createdAt } = enquiry;
    const { mutateAsync: deleteEnquiry } = useDeleteEnquiry(id);
    const { mutateAsync: updateStatus } = useUpdateEnquiryStatus(id);

    const handleDelete = async () => {
        if (!confirm("Delete this enquiry?")) return;

        try {
            await deleteEnquiry();
            toast.success("Enquiry deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete enquiry. Try again");
        }
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
                <select
                    value={status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className={`px-3 py-1 text-xs uppercase tracking-widest font-bold bg-zinc-950 border border-zinc-800 text-zinc-300 focus:border-white outline-none transition-colors appearance-none cursor-pointer hover:bg-zinc-900`}>
                    <option value="new">New</option>
                    <option value="in-progress">In Progress</option>
                    <option value="closed">Closed</option>
                </select>
            </td>

            <td className="p-6">
                <div className="flex justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
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
    const { data: enquiries = [], isLoading } = useEnquiries();
    const { mutateAsync: deleteEnquiries } = useDeleteEnquiries();
    const { mutateAsync: deleteAllEnquiries } = useDeleteAllEnquiries();

    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [viewingEnquiry, setViewingEnquiry] = useState<Enquiry | null>(null);

    const handleSelectAll = () => {
        if (selectedIds.length === enquiries.length) setSelectedIds([]);
        else setSelectedIds(enquiries.map((e) => e.id));
    };

    const handleSelect = (id: number) => {
        if (selectedIds.includes(id))
            setSelectedIds(selectedIds.filter((sid) => sid !== id));
        else setSelectedIds([...selectedIds, id]);
    };

    const handleBulkDelete = async () => {
        if (!confirm(`Delete ${selectedIds.length} enquiries?`)) return;

        try {
            await deleteEnquiries(selectedIds);
            toast.success(`Deleted ${selectedIds.length} enquiries`);
            setSelectedIds([]);
        } catch (error) {
            console.error(error);
            toast.error(`Failed to delete ${selectedIds.length} enquiries`);
        }
    };

    const handleDeleteAll = async () => {
        if (!confirm("DELETE ALL enquiries? This cannot be undone.")) return;

        try {
            await deleteAllEnquiries();
            toast.success("Deleted all enquiries");
            setSelectedIds([]);
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete all enquiries");
        }
    };

    if (isLoading) return <Loader />;

    return (
        <div>
            <div className="flex justify-between items-end mb-12 border-b border-zinc-800 pb-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tighter uppercase text-white mb-2">
                        Enquiries
                    </h1>
                    <p className="text-zinc-500 text-sm uppercase tracking-widest">
                        Manage incoming messages
                    </p>
                </div>
                <div className="flex gap-4">
                    {enquiries.length > 0 && (
                        <button
                            onClick={handleDeleteAll}
                            className="bg-red-950/30 border border-red-900 text-red-400 hover:bg-red-900 hover:text-white px-6 py-3 text-sm uppercase tracking-widest font-medium transition-colors flex items-center gap-2">
                            <FaTrash /> Delete All
                        </button>
                    )}
                    {selectedIds.length > 0 && (
                        <button
                            onClick={handleBulkDelete}
                            className="bg-zinc-900 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white px-6 py-3 text-sm uppercase tracking-widest font-medium transition-colors flex items-center gap-2">
                            <FaTrash /> Delete Selected ({selectedIds.length})
                        </button>
                    )}
                </div>
            </div>

            <div className="border border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-center">
                        <thead className="bg-zinc-950 border-b border-zinc-800">
                            <tr>
                                <th className="p-6 w-10">
                                    <button
                                        onClick={handleSelectAll}
                                        className="text-zinc-600 hover:text-white transition-colors">
                                        {enquiries.length > 0 &&
                                        selectedIds.length ===
                                            enquiries.length ? (
                                            <FaCheckSquare />
                                        ) : (
                                            <FaSquare />
                                        )}
                                    </button>
                                </th>
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
                                        className="p-6 text-xs uppercase tracking-widest text-zinc-500 font-medium">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800 bg-black">
                            {enquiries.map((enquiry) => (
                                <EnquiryRow
                                    key={enquiry.id}
                                    enquiry={enquiry}
                                    selected={selectedIds.includes(enquiry.id)}
                                    onSelect={handleSelect}
                                    onView={setViewingEnquiry}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                {enquiries.length === 0 && (
                    <div className="p-12 text-center text-zinc-600 uppercase tracking-widest">
                        No enquiries found.
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
            <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-none w-full max-w-4xl h-auto max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="w-full flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
                    <h2 className="text-2xl font-bold uppercase tracking-tighter text-white">
                        Enquiry Details
                    </h2>
                    <button
                        onClick={() => setViewingEnquiry(null)}
                        className="p-2 text-zinc-500 hover:text-white transition-colors">
                        <FaX size={20} />
                    </button>
                </div>
                <div className="space-y-8 grid grid-cols-2 gap-8">
                    <div className="col-span-1">
                        <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                            Name
                        </label>
                        <p className="text-lg font-medium text-white border-b border-zinc-800 pb-2">
                            {enquiry.name}
                        </p>
                    </div>
                    <div className="col-span-1">
                        <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                            Email
                        </label>
                        <p className="text-lg font-medium text-white border-b border-zinc-800 pb-2">
                            {enquiry.email}
                        </p>
                    </div>
                    <div className="col-span-1">
                        <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                            Phone
                        </label>
                        <p className="text-lg font-medium text-white border-b border-zinc-800 pb-2">
                            {enquiry.phone}
                        </p>
                    </div>
                    <div className="col-span-1">
                        <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                            Status
                        </label>
                        <p className="text-lg font-medium text-white border-b border-zinc-800 pb-2 uppercase">
                            {enquiry.status}
                        </p>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-4">
                            Message
                        </label>
                        <div className="bg-zinc-900/50 border border-zinc-800 p-6 text-zinc-300 whitespace-pre-wrap leading-relaxed">
                            {enquiry.message}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
