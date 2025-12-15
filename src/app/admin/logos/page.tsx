"use client";

import Loader, { LoadingSpinner } from "@/components/Loader";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { Logo, UploadImageResponse } from "@/constants/types";
import {
    useCreateLogo,
    useDeleteAllLogos,
    useDeleteLogo,
    useDeleteLogos,
    useLogos,
    useUpdateLogo,
} from "@/hooks/useLogos";
import { useUploadImage } from "@/hooks/useUpload";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import {
    FaCheckSquare,
    FaEdit,
    FaPlus,
    FaSquare,
    FaTrash,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const LogoCard = ({
    logo,
    selected,
    onSelect,
    onEdit,
}: {
    logo: Logo;
    selected: boolean;
    onSelect: (id: string) => void;
    onEdit: (logo: Logo) => void;
}) => {
    const { _id: id, title, logo: logoUrl } = logo;
    const { mutateAsync: deleteLogo, isPending: isLogoDeleting } =
        useDeleteLogo(id);

    const handleDelete = () => {
        ConfirmationModal({
            title: "Delete Logo?",
            message: `This will permanently delete "${logo.title}"`,
            onConfirm: async () => {
                try {
                    await deleteLogo();
                    toast.success("Logo deleted");
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to delete logo");
                }
            },
        });
    };

    if (isLogoDeleting) return <LoadingSpinner />;

    return (
        <div
            className={`bg-zinc-900/30 border relative group transition-all duration-300 ${
                selected
                    ? "border-white"
                    : "border-zinc-800 hover:border-zinc-600"
            }`}>
            <button
                onClick={() => onSelect(id)}
                className={`absolute top-0 left-0 z-10 p-3 transition-colors ${
                    selected
                        ? "text-white bg-black"
                        : "text-zinc-500 hover:text-white bg-black/50"
                }`}>
                {selected ? (
                    <FaCheckSquare size={16} className="text-red-500" />
                ) : (
                    <FaSquare size={16} />
                )}
            </button>

            <div className="relative aspect-video w-full overflow-hidden p-8 bg-zinc-950/50 flex items-center justify-center">
                <div className="relative w-full h-full">
                    <Image
                        src={logoUrl}
                        alt={title}
                        className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                        loading="lazy"
                        fill
                    />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button
                        onClick={() => onEdit(logo)}
                        className="bg-white text-black p-2 hover:bg-zinc-200 transition-colors"
                        title="Edit">
                        <FaEdit />
                    </button>

                    <button
                        onClick={handleDelete}
                        className="bg-red-600 text-white p-2 hover:bg-red-700 transition-colors"
                        title="Delete">
                        <FaTrash />
                    </button>
                </div>
            </div>

            <div className="px-4 py-2 border-t border-zinc-800">
                <h3 className="font-bold text-lg mb-2 text-white tracking-tight">
                    {title}
                </h3>
            </div>
        </div>
    );
};

export default function AdminLogos() {
    const { data: logos = [], isPending: isLogosLoading } = useLogos();
    const { mutateAsync: deleteLogos, isPending: isDeletingLogos } =
        useDeleteLogos();
    const { mutateAsync: deleteAllLogos, isPending: isDeletingAllLogos } =
        useDeleteAllLogos();

    const [showModal, setShowModal] = useState(false);
    const [editingLogo, setEditingLogo] = useState<Logo | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleSelectAll = () => {
        if (selectedIds.length === logos.length) setSelectedIds([]);
        else setSelectedIds(logos.map((p) => p._id));
    };

    const handleSelect = (id: string) => {
        if (selectedIds.includes(id))
            setSelectedIds(selectedIds.filter((sid) => sid !== id));
        else setSelectedIds([...selectedIds, id]);
    };

    const handleBulkDelete = () => {
        ConfirmationModal({
            title: "Delete Logos?",
            message: `This will permanently delete ${selectedIds.length} logos`,
            onConfirm: async () => {
                try {
                    await deleteLogos(selectedIds);
                    toast.success(`Deleted ${selectedIds.length} logos`);
                    setSelectedIds([]);
                } catch (error) {
                    console.error(error);
                    toast.error(`Failed to delete ${selectedIds.length} logos`);
                }
            },
            onCancel: () => setSelectedIds([]),
        });
    };

    const handleDeleteAll = () => {
        ConfirmationModal({
            title: "Delete All Logos?",
            message: "This will permanently delete all logos.",
            onConfirm: async () => {
                try {
                    await deleteAllLogos();
                    toast.success("Deleted all logos");
                    setSelectedIds([]);
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to delete all logos");
                }
            },
            onCancel: () => setSelectedIds([]),
        });
    };

    const openCreateModal = () => {
        setEditingLogo(null);
        setShowModal(true);
    };

    const openEditModal = (logo: Logo) => {
        setEditingLogo(logo);
        setShowModal(true);
    };

    if (isLogosLoading || isDeletingAllLogos || isDeletingLogos)
        return <Loader />;

    return (
        <div>
            <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
                <h1 className="text-3xl font-bold tracking-tighter uppercase text-white">
                    Partner Logos
                </h1>
                <div className="flex gap-4">
                    {logos.length > 0 && (
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
                                Delete Selected
                            </span>
                            ({selectedIds.length})
                        </button>
                    )}

                    <button
                        onClick={openCreateModal}
                        className="bg-white text-black hover:bg-zinc-200 px-3 py-2 text-sm uppercase tracking-widest font-bold transition-colors flex items-center gap-2">
                        <FaPlus />{" "}
                        <span className="hidden md:inline">Add Logo</span>
                    </button>
                </div>
            </div>

            <div className="mb-6 flex items-center justify-between">
                <button
                    onClick={handleSelectAll}
                    className="text-zinc-500 hover:text-white flex items-center gap-3 text-sm uppercase tracking-widest transition-colors">
                    {logos.length > 0 && selectedIds.length === logos.length ? (
                        <FaCheckSquare />
                    ) : (
                        <FaSquare />
                    )}
                    Select All
                </button>
                <span className="text-zinc-600 text-sm uppercase tracking-widest">
                    {logos.length} Logos
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {logos.map((logo) => (
                    <LogoCard
                        key={logo._id}
                        logo={logo}
                        selected={selectedIds.includes(logo._id)}
                        onSelect={handleSelect}
                        onEdit={openEditModal}
                    />
                ))}
            </div>

            {showModal && (
                <LogoModal
                    logo={editingLogo}
                    onClose={() => setShowModal(false)}
                />
            )}

            {logos.length === 0 && (
                <div className="p-12 text-center border border-dashed border-zinc-800 text-zinc-600 uppercase tracking-widest">
                    No logos found.
                </div>
            )}
        </div>
    );
}

const LogoModal = ({
    logo,
    onClose,
}: {
    logo: Logo | null;
    onClose: () => void;
}) => {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-zinc-950 border border-zinc-800 px-8 py-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="w-full flex justify-between items-center mb-6 border-b border-zinc-800 pb-2">
                    <h2 className="text-2xl font-bold uppercase tracking-tighter text-white">
                        {logo ? "Edit Logo" : "Add New Logo"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-zinc-500 hover:text-white transition-colors">
                        <FaX size={20} />
                    </button>
                </div>
                {logo ? (
                    <EditLogoForm logo={logo} onClose={onClose} />
                ) : (
                    <CreateLogoForm onClose={onClose} />
                )}
            </div>
        </div>
    );
};

const CreateLogoForm = ({ onClose }: { onClose: () => void }) => {
    const { mutateAsync: createLogo, isPending: isLogoCreating } =
        useCreateLogo();
    const { mutateAsync: uploadImage, isPending: isImageUploading } =
        useUploadImage();

    const [title, setTitle] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleImageUpload = async (
        imageFile: File
    ): Promise<UploadImageResponse | null> => {
        let data;
        try {
            data = await uploadImage(imageFile);
            toast.success("Image uploaded");
        } catch (error) {
            console.error(error);
            data = null;
            toast.error("Failed to upload image");
        }

        return data;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!title || !imageFile) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            const data = await handleImageUpload(imageFile);
            if (!data) return;

            await createLogo({
                title,
                logo: data.url,
                logoPublicId: data.public_id,
            });
            toast.success("Logo created");
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Failed to create logo");
        }
    };

    if (isLogoCreating || isImageUploading) return <LoadingSpinner />;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                    Title
                </label>
                <input
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors"
                    placeholder="Company Name"
                />
            </div>

            <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                    Logo Image
                </label>
                <input
                    required
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="w-full p-2 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors file:mr-4 file:py-1.5 file:px-2 file:border-0 file:text-sm file:bg-white file:text-black hover:file:bg-zinc-200"
                />
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-zinc-800">
                <button
                    type="submit"
                    disabled={isLogoCreating || isImageUploading}
                    className="bg-white text-black hover:bg-zinc-200 px-3 py-2 text-sm uppercase tracking-widest font-bold transition-colors disabled:opacity-50">
                    {isLogoCreating || isImageUploading
                        ? "Saving..."
                        : "Save Logo"}
                </button>
            </div>
        </form>
    );
};

const EditLogoForm = ({
    logo,
    onClose,
}: {
    logo: Logo;
    onClose: () => void;
}) => {
    const { mutateAsync: updateLogo, isPending: isLogoUpdating } =
        useUpdateLogo(logo._id);
    const { mutateAsync: uploadImage, isPending: isImageUploading } =
        useUploadImage();

    const [title, setTitle] = useState(logo.title);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleImageUpload = async (
        imageFile: File
    ): Promise<UploadImageResponse | null> => {
        let data;
        try {
            data = await uploadImage(imageFile);
            toast.success("Image uploaded");
        } catch (error) {
            console.error(error);
            data = null;
            toast.error("Failed to upload image");
        }

        return data;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!title) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            let logoUrl = logo.logo;
            let logoPublicId = logo.logoPublicId;

            if (imageFile) {
                const data = await handleImageUpload(imageFile);
                if (!data) return;
                logoUrl = data.url;
                logoPublicId = data.public_id;
            }

            await updateLogo({
                title,
                logo: logoUrl,
                logoPublicId,
            });

            toast.success("Logo updated");
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update logo");
        }
    };

    if (isLogoUpdating || isImageUploading) return <LoadingSpinner />;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                    Title
                </label>
                <input
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors"
                />
            </div>

            <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                    Logo Image (Leave empty to keep current)
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="w-full p-2 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors file:mr-4 file:py-1.5 file:px-2 file:border-0 file:text-sm file:bg-white file:text-black hover:file:bg-zinc-200"
                />
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-zinc-800">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-2 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white text-sm uppercase tracking-widest font-medium transition-colors">
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLogoUpdating || isImageUploading}
                    className="bg-white text-black hover:bg-zinc-200 px-3 py-2 text-sm uppercase tracking-widest font-bold transition-colors disabled:opacity-50">
                    {isLogoUpdating || isImageUploading
                        ? "Saving..."
                        : "Save Changes"}
                </button>
            </div>
        </form>
    );
};
