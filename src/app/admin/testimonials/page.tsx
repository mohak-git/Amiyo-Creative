"use client";

import Loader, { LoadingSpinner } from "@/components/Loader";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { Testimonial, UploadImageResponse } from "@/constants/types";
import {
    useCreateTestimonial,
    useDeleteAllTestimonials,
    useDeleteTestimonial,
    useDeleteTestimonials,
    useTestimonials,
    useUpdateTestimonial,
} from "@/hooks/useTestimonials";
import { useUploadImage } from "@/hooks/useUpload";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import {
    FaCheckSquare,
    FaEdit,
    FaPlus,
    FaSquare,
    FaTrash,
    FaVideo,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";

const TestimonialCard = ({
    testimonial,
    selected,
    onSelect,
    onEdit,
}: {
    testimonial: Testimonial;
    selected: boolean;
    onSelect: (id: string) => void;
    onEdit: (testimonial: Testimonial) => void;
}) => {
    const {
        _id: id,
        isVideo,
        name,
        content,
        avatar,
        videoTitle,
        videoUrl,
    } = testimonial;
    const { mutateAsync: deleteTestimonial, isPending: isDeleting } =
        useDeleteTestimonial(id);

    const handleDelete = () => {
        ConfirmationModal({
            title: "Delete Testimonial?",
            message: `This will permanently delete this testimonial`,
            onConfirm: async () => {
                try {
                    await deleteTestimonial();
                    toast.success("Testimonial deleted");
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to delete testimonial");
                }
            },
        });
    };

    if (isDeleting) return <LoadingSpinner />;

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

            <div className="relative aspect-video w-full overflow-hidden bg-zinc-900 border-b border-zinc-800">
                {isVideo ? (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600">
                        <FaVideo size={48} />
                    </div>
                ) : (
                    <Image
                        src={avatar || "/placeholderAvatar.png"}
                        alt={name || "Avatar"}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        loading="lazy"
                        width={500}
                        height={500}
                    />
                )}

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    {isVideo && videoUrl && (
                        <Link
                            href={videoUrl}
                            target="_blank"
                            className="bg-white text-black p-2 hover:bg-zinc-200 transition-colors">
                            <FiExternalLink />
                        </Link>
                    )}
                    <button
                        onClick={() => onEdit(testimonial)}
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

            <div className="px-4 py-3">
                <h3 className="font-bold text-lg mb-1 text-white tracking-tight line-clamp-1">
                    {isVideo ? videoTitle || "Video Testimonial" : name}
                </h3>
                <p className="text-zinc-500 text-xs uppercase tracking-widest line-clamp-2">
                    {isVideo ? "Video" : content}
                </p>
            </div>
        </div>
    );
};

export default function AdminTestimonials() {
    const { data: testimonials = [], isPending: isLoading } = useTestimonials();
    const { mutateAsync: deleteTestimonials, isPending: isBulkDeleting } =
        useDeleteTestimonials();
    const { mutateAsync: deleteAllTestimonials, isPending: isDeletingAll } =
        useDeleteAllTestimonials();

    const [showModal, setShowModal] = useState(false);
    const [editingTestimonial, setEditingTestimonial] =
        useState<Testimonial | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleSelectAll = () => {
        if (selectedIds.length === testimonials.length) setSelectedIds([]);
        else
            setSelectedIds(testimonials.map((t) => t._id as unknown as string));
    };

    const handleSelect = (id: string) => {
        if (selectedIds.includes(id))
            setSelectedIds(selectedIds.filter((sid) => sid !== id));
        else setSelectedIds([...selectedIds, id]);
    };

    const handleBulkDelete = () => {
        ConfirmationModal({
            title: "Delete Testimonials?",
            message: `This will permanently delete ${selectedIds.length} testimonials`,
            onConfirm: async () => {
                try {
                    await deleteTestimonials(selectedIds);
                    toast.success(`Deleted ${selectedIds.length} testimonials`);
                    setSelectedIds([]);
                } catch (error) {
                    console.error(error);
                    toast.error(`Failed to delete testimonials`);
                }
            },
            onCancel: () => setSelectedIds([]),
        });
    };

    const handleDeleteAll = () => {
        ConfirmationModal({
            title: "Delete All Testimonials?",
            message: "This will permanently delete all testimonials.",
            onConfirm: async () => {
                try {
                    await deleteAllTestimonials();
                    toast.success("Deleted all testimonials");
                    setSelectedIds([]);
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to delete all testimonials");
                }
            },
            onCancel: () => setSelectedIds([]),
        });
    };

    const openCreateModal = () => {
        setEditingTestimonial(null);
        setShowModal(true);
    };

    const openEditModal = (testimonial: Testimonial) => {
        setEditingTestimonial(testimonial);
        setShowModal(true);
    };

    if (isLoading || isDeletingAll || isBulkDeleting) return <Loader />;

    return (
        <div>
            <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
                <h1 className="text-3xl font-bold tracking-tighter uppercase text-white">
                    Testimonials
                </h1>
                <div className="flex gap-4">
                    {testimonials.length > 0 && (
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
                        <span className="hidden md:inline">
                            Add Testimonial
                        </span>
                    </button>
                </div>
            </div>

            <div className="mb-6 flex items-center justify-between">
                <button
                    onClick={handleSelectAll}
                    className="text-zinc-500 hover:text-white flex items-center gap-3 text-sm uppercase tracking-widest transition-colors">
                    {testimonials.length > 0 &&
                    selectedIds.length === testimonials.length ? (
                        <FaCheckSquare />
                    ) : (
                        <FaSquare />
                    )}
                    Select All
                </button>
                <span className="text-zinc-600 text-sm uppercase tracking-widest">
                    {testimonials.length} Testimonials
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {testimonials.map((testimonial) => (
                    <TestimonialCard
                        key={testimonial._id as unknown as string}
                        testimonial={testimonial}
                        selected={selectedIds.includes(
                            testimonial._id as unknown as string
                        )}
                        onSelect={handleSelect}
                        onEdit={openEditModal}
                    />
                ))}
            </div>

            {showModal && (
                <TestimonialModal
                    testimonial={editingTestimonial}
                    onClose={() => setShowModal(false)}
                />
            )}

            {testimonials.length === 0 && (
                <div className="p-12 text-center border border-dashed border-zinc-800 text-zinc-600 uppercase tracking-widest">
                    No testimonials found.
                </div>
            )}
        </div>
    );
}

const TestimonialModal = ({
    testimonial,
    onClose,
}: {
    testimonial: Testimonial | null;
    onClose: () => void;
}) => {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-zinc-950 border border-zinc-800 px-8 py-4 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="w-full flex justify-between items-center mb-6 border-b border-zinc-800 pb-2">
                    <h2 className="text-2xl font-bold uppercase tracking-tighter text-white">
                        {testimonial
                            ? "Edit Testimonial"
                            : "Add New Testimonial"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-zinc-500 hover:text-white transition-colors">
                        <FaX size={20} />
                    </button>
                </div>
                {testimonial ? (
                    <EditTestimonialForm
                        testimonial={testimonial}
                        onClose={onClose}
                    />
                ) : (
                    <CreateTestimonialForm onClose={onClose} />
                )}
            </div>
        </div>
    );
};

const CreateTestimonialForm = ({ onClose }: { onClose: () => void }) => {
    const { mutateAsync: createTestimonial, isPending: isCreating } =
        useCreateTestimonial();
    const { mutateAsync: uploadImage, isPending: isImageUploading } =
        useUploadImage();

    const [isVideo, setIsVideo] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState<Partial<Testimonial>>({
        name: "",
        role: "",
        company: "",
        avatar: "",
        rating: 5,
        content: "",
        videoUrl: "",
        videoTitle: "",
    });

    const handleImageUpload = async (
        imageFile: File
    ): Promise<UploadImageResponse | null> => {
        let data;
        try {
            data = await uploadImage(imageFile);
            toast.success("Avatar uploaded");
        } catch (error) {
            console.error(error);
            data = null;
            toast.error("Failed to upload avatar");
        }
        return data;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const payload: Partial<Testimonial> = {
                ...formData,
                isVideo,
            };

            if (!isVideo) {
                if (imageFile) {
                    const data = await handleImageUpload(imageFile);
                    if (!data) return;
                    payload.avatar = data.url;
                }
            }

            await createTestimonial(payload);
            toast.success("Testimonial created");
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Failed to create testimonial");
        }
    };

    if (isCreating || isImageUploading) return <LoadingSpinner />;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4 mb-4">
                <button
                    type="button"
                    onClick={() => setIsVideo(false)}
                    className={`flex-1 py-3 text-sm uppercase tracking-widest font-bold border transition-colors ${
                        !isVideo
                            ? "bg-white text-black border-white"
                            : "bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600"
                    }`}>
                    Text Testimonial
                </button>
                <button
                    type="button"
                    onClick={() => setIsVideo(true)}
                    className={`flex-1 py-3 text-sm uppercase tracking-widest font-bold border transition-colors ${
                        isVideo
                            ? "bg-white text-black border-white"
                            : "bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600"
                    }`}>
                    Video Testimonial
                </button>
            </div>

            <div className="grid grid-cols-2 gap-8">
                {isVideo ? (
                    <>
                        <div className="col-span-2 space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                                    Video Title
                                </label>
                                <input
                                    required
                                    value={formData.videoTitle}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            videoTitle: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors"
                                    placeholder="e.g. Client Story - AgileWorks"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                                    Video URL (Embed Link)
                                </label>
                                <input
                                    required
                                    value={formData.videoUrl}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            videoUrl: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors"
                                    placeholder="https://www.youtube.com/embed/..."
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="col-span-1 space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                                    Name
                                </label>
                                <input
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                                    Role
                                </label>
                                <input
                                    value={formData.role}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            role: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                                    Company
                                </label>
                                <input
                                    value={formData.company}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            company: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors"
                                />
                            </div>
                        </div>
                        <div className="col-span-1 space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                                    Rating (1-5)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    required
                                    value={formData.rating}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            rating: Number(e.target.value),
                                        })
                                    }
                                    className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                                    Avatar Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setImageFile(
                                            e.target.files?.[0] || null
                                        )
                                    }
                                    className="w-full p-2 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors file:mr-4 file:py-1.5 file:px-2 file:border-0 file:text-sm file:bg-white file:text-black hover:file:bg-zinc-200"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                                Content
                            </label>
                            <textarea
                                required
                                rows={4}
                                value={formData.content}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        content: e.target.value,
                                    })
                                }
                                className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors resize-none"
                            />
                        </div>
                    </>
                )}
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
                    className="bg-white text-black hover:bg-zinc-200 px-3 py-2 text-sm uppercase tracking-widest font-bold transition-colors">
                    Save Testimonial
                </button>
            </div>
        </form>
    );
};

const EditTestimonialForm = ({
    testimonial,
    onClose,
}: {
    testimonial: Testimonial;
    onClose: () => void;
}) => {
    const { mutateAsync: updateTestimonial, isPending: isUpdating } =
        useUpdateTestimonial(testimonial._id as unknown as string);
    const { mutateAsync: uploadImage, isPending: isImageUploading } =
        useUploadImage();

    const [isVideo, setIsVideo] = useState(testimonial.isVideo);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState<Partial<Testimonial>>({
        name: testimonial.name || "",
        role: testimonial.role || "",
        company: testimonial.company || "",
        avatar: testimonial.avatar || "",
        rating: testimonial.rating || 5,
        content: testimonial.content || "",
        videoUrl: testimonial.videoUrl || "",
        videoTitle: testimonial.videoTitle || "",
    });

    const handleImageUpload = async (
        imageFile: File
    ): Promise<UploadImageResponse | null> => {
        let data;
        try {
            data = await uploadImage(imageFile);
            toast.success("Avatar uploaded");
        } catch (error) {
            console.error(error);
            data = null;
            toast.error("Failed to upload avatar");
        }
        return data;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const payload: Partial<Testimonial> = {
                ...formData,
                isVideo,
            };

            if (!isVideo) {
                if (imageFile) {
                    const data = await handleImageUpload(imageFile);
                    if (!data) return;
                    payload.avatar = data.url;
                }
            }

            await updateTestimonial(payload);
            toast.success("Testimonial updated");
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update testimonial");
        }
    };

    if (isUpdating || isImageUploading) return <LoadingSpinner />;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4 mb-4">
                <button
                    type="button"
                    onClick={() => setIsVideo(false)}
                    className={`flex-1 py-3 text-sm uppercase tracking-widest font-bold border transition-colors ${
                        !isVideo
                            ? "bg-white text-black border-white"
                            : "bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600"
                    }`}>
                    Text Testimonial
                </button>
                <button
                    type="button"
                    onClick={() => setIsVideo(true)}
                    className={`flex-1 py-3 text-sm uppercase tracking-widest font-bold border transition-colors ${
                        isVideo
                            ? "bg-white text-black border-white"
                            : "bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600"
                    }`}>
                    Video Testimonial
                </button>
            </div>

            <div className="grid grid-cols-2 gap-8">
                {isVideo ? (
                    <>
                        <div className="col-span-2 space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                                    Video Title
                                </label>
                                <input
                                    required
                                    value={formData.videoTitle}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            videoTitle: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                                    Video URL (Embed Link)
                                </label>
                                <input
                                    required
                                    value={formData.videoUrl}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            videoUrl: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors"
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="col-span-1 space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                                    Name
                                </label>
                                <input
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                                    Role
                                </label>
                                <input
                                    value={formData.role}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            role: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                                    Company
                                </label>
                                <input
                                    value={formData.company}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            company: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors"
                                />
                            </div>
                        </div>
                        <div className="col-span-1 space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                                    Rating (1-5)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    required
                                    value={formData.rating}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            rating: Number(e.target.value),
                                        })
                                    }
                                    className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                                    Avatar Image (Leave empty to keep current)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setImageFile(
                                            e.target.files?.[0] || null
                                        )
                                    }
                                    className="w-full p-2 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors file:mr-4 file:py-1.5 file:px-2 file:border-0 file:text-sm file:bg-white file:text-black hover:file:bg-zinc-200"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                                Content
                            </label>
                            <textarea
                                required
                                rows={4}
                                value={formData.content}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        content: e.target.value,
                                    })
                                }
                                className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors resize-none"
                            />
                        </div>
                    </>
                )}
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
                    className="bg-white text-black hover:bg-zinc-200 px-3 py-2 text-sm uppercase tracking-widest font-bold transition-colors">
                    Save Changes
                </button>
            </div>
        </form>
    );
};
