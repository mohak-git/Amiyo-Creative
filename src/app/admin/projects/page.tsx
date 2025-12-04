"use client";

import Loader from "@/components/Loader";
import { Project, ServicesTypes, UploadImageResponse } from "@/constants/types";
import {
    useCreateProject,
    useDeleteAllProjects,
    useDeleteProject,
    useDeleteProjects,
    useProjects,
    useUpdateProject,
} from "@/hooks/useProjects";
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
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";

const ProjectCard = ({
    project,
    selected,
    onSelect,
    onEdit,
}: {
    project: Project;
    selected: boolean;
    onSelect: (id: number) => void;
    onEdit: (project: Project) => void;
}) => {
    const { id, title, coverImage, category, createdAt, tags, projectUrl } =
        project;
    const { mutateAsync: deleteProject } = useDeleteProject(id);

    const handleDelete = async () => {
        if (!confirm("Delete this project?")) return;

        try {
            await deleteProject();
            toast.success("Project deleted successfully");
        } catch (error) {
            toast.error("Failed to delete project. Try again");
        }
    };

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
                    <FaCheckSquare size={16} />
                ) : (
                    <FaSquare size={16} />
                )}
            </button>

            <div className="relative aspect-video w-full overflow-hidden">
                <Image
                    src={coverImage}
                    alt={title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                    width={500}
                    height={500}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Link
                        href={projectUrl}
                        target="_blank"
                        className="bg-white text-black p-3 hover:bg-zinc-200 transition-colors">
                        <FiExternalLink />
                    </Link>

                    <button
                        onClick={() => onEdit(project)}
                        className="bg-white text-black p-3 hover:bg-zinc-200 transition-colors"
                        title="Edit">
                        <FaEdit />
                    </button>

                    <button
                        onClick={handleDelete}
                        className="bg-red-600 text-white p-3 hover:bg-red-700 transition-colors"
                        title="Delete">
                        <FaTrash />
                    </button>
                </div>
            </div>

            <div className="p-6 border-t border-zinc-800">
                <h3 className="font-bold text-lg mb-2 text-white tracking-tight">
                    {title}
                </h3>
                <p className="text-zinc-500 text-xs uppercase tracking-widest">
                    {category}
                </p>
            </div>
        </div>
    );
};

export default function AdminProjects() {
    const { data: projects = [], isLoading } = useProjects();
    const { mutateAsync: deleteProjects } = useDeleteProjects();
    const { mutateAsync: deleteAllProjects } = useDeleteAllProjects();

    const [showModal, setShowModal] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const handleSelectAll = () => {
        if (selectedIds.length === projects.length) setSelectedIds([]);
        else setSelectedIds(projects.map((p) => p.id));
    };

    const handleSelect = (id: number) => {
        if (selectedIds.includes(id))
            setSelectedIds(selectedIds.filter((sid) => sid !== id));
        else setSelectedIds([...selectedIds, id]);
    };

    const handleBulkDelete = async () => {
        if (!confirm(`Delete ${selectedIds.length} projects?`)) return;

        try {
            await deleteProjects(selectedIds);
            toast.success(`Deleted ${selectedIds.length} projects`);
            setSelectedIds([]);
        } catch (error) {
            toast.error(`Failed to delete ${selectedIds.length} projects`);
        }
    };

    const handleDeleteAll = async () => {
        if (!confirm("DELETE ALL projects? This cannot be undone.")) return;

        try {
            await deleteAllProjects();
            toast.success("Deleted all projects");
            setSelectedIds([]);
        } catch (error) {
            toast.error("Failed to delete all projects");
        }
    };

    const openCreateModal = () => {
        setEditingProject(null);
        setShowModal(true);
    };

    const openEditModal = (project: Project) => {
        setEditingProject(project);
        setShowModal(true);
    };

    if (isLoading) return <Loader />;

    return (
        <div>
            <div className="flex justify-between items-end mb-12 border-b border-zinc-800 pb-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tighter uppercase text-white mb-2">
                        Projects
                    </h1>
                    <p className="text-zinc-500 text-sm uppercase tracking-widest">
                        Manage your portfolio
                    </p>
                </div>
                <div className="flex gap-4">
                    {projects.length > 0 && (
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

                    <button
                        onClick={openCreateModal}
                        className="bg-white text-black hover:bg-zinc-200 px-6 py-3 text-sm uppercase tracking-widest font-bold transition-colors flex items-center gap-2">
                        <FaPlus /> Add Project
                    </button>
                </div>
            </div>

            <div className="mb-6 flex items-center justify-between">
                <button
                    onClick={handleSelectAll}
                    className="text-zinc-500 hover:text-white flex items-center gap-3 text-sm uppercase tracking-widest transition-colors">
                    {projects.length > 0 &&
                    selectedIds.length === projects.length ? (
                        <FaCheckSquare />
                    ) : (
                        <FaSquare />
                    )}
                    Select All
                </button>
                <span className="text-zinc-600 text-sm uppercase tracking-widest">
                    {projects.length} Projects
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        selected={selectedIds.includes(project.id)}
                        onSelect={handleSelect}
                        onEdit={openEditModal}
                    />
                ))}
            </div>

            {showModal && (
                <ProjectModal
                    project={editingProject}
                    onClose={() => setShowModal(false)}
                />
            )}

            {projects.length === 0 && (
                <div className="p-12 text-center border border-dashed border-zinc-800 text-zinc-600 uppercase tracking-widest">
                    No projects found.
                </div>
            )}
        </div>
    );
}

const ProjectModal = ({
    project,
    onClose,
}: {
    project: Project | null;
    onClose: () => void;
}) => {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-zinc-950 border border-zinc-800 p-8 w-full max-w-6xl h-[90vh] overflow-y-auto shadow-2xl">
                <div className="w-full flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
                    <h2 className="text-2xl font-bold uppercase tracking-tighter text-white">
                        {project ? "Edit Project" : "Add New Project"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-zinc-500 hover:text-white transition-colors">
                        <FaX size={20} />
                    </button>
                </div>
                {project ? (
                    <EditProjectForm project={project} onClose={onClose} />
                ) : (
                    <CreateProjectForm onClose={onClose} />
                )}
            </div>
        </div>
    );
};

const CreateProjectForm = ({ onClose }: { onClose: () => void }) => {
    const { mutateAsync: createProject, isPending } = useCreateProject();
    const { mutateAsync: uploadImage } = useUploadImage();

    const [projectFields, setProjectFields] = useState<Partial<Project>>({
        title: "",
        coverImage: "",
        coverImagePublicId: "",
        category: "Cinematography-and-Videography",
        projectUrl: "",
        tags: [],
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleImageUpload = async (
        imageFile: File
    ): Promise<UploadImageResponse | null> => {
        let data;
        try {
            data = await uploadImage(imageFile);
            toast.success("Image uploaded");
        } catch (error) {
            data = null;
            toast.error("Failed to upload image");
        }

        return data;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { title, projectUrl, tags } = projectFields;

        if (!title || !projectUrl || tags?.length == 0 || !imageFile) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            const data = await handleImageUpload(imageFile);
            if (!data) return;

            await createProject({
                ...projectFields,
                coverImage: data.url,
                coverImagePublicId: data.public_id,
            });
            toast.success("Project created");
            onClose();
        } catch (error) {
            toast.error("Failed to create project");
        }
    };

    const { title, category, projectUrl, tags } = projectFields;

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 grid grid-cols-2 gap-8">
            <div className="col-span-1 space-y-6">
                <div>
                    <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                        Title
                    </label>
                    <input
                        required
                        value={title}
                        onChange={(e) =>
                            setProjectFields((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }))
                        }
                        className="w-full p-4 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors"
                        placeholder="Project Title"
                    />
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                        Category
                    </label>
                    <select
                        value={category}
                        onChange={(e) =>
                            setProjectFields((prev) => ({
                                ...prev,
                                category: e.target.value as ServicesTypes,
                            }))
                        }
                        className="w-full p-4 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors appearance-none">
                        <option value="Cinematography-and-Videography">
                            Cinematography & Videography
                        </option>
                        <option value="Photography">Photography</option>
                        <option value="Design-and-Branding">
                            Design & Branding
                        </option>
                        <option value="Post-Production">Post Production</option>
                        <option value="Web-and-Digital">Web & Digital</option>
                        <option value="Marketing">Marketing</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                        Project URL
                    </label>
                    <input
                        required
                        value={projectUrl}
                        onChange={(e) =>
                            setProjectFields((prev) => ({
                                ...prev,
                                projectUrl: e.target.value,
                            }))
                        }
                        className="w-full p-4 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors"
                        placeholder="https://..."
                    />
                </div>
            </div>

            <div className="col-span-1 space-y-6">
                <div>
                    <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                        Tags (comma separated)
                    </label>
                    <input
                        required
                        value={tags}
                        onChange={(e) =>
                            setProjectFields((prev) => ({
                                ...prev,
                                tags: e.target.value
                                    .split(",")
                                    .map((tag) => tag.trim()),
                            }))
                        }
                        className="w-full p-4 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors"
                        placeholder="e.g. Corporate, Event"
                    />
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                        Cover Image
                    </label>
                    <input
                        required
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setImageFile(e.target.files?.[0] || null)
                        }
                        className="w-full p-4 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-white file:text-black hover:file:bg-zinc-200"
                    />
                </div>
            </div>

            <div className="col-span-2 flex justify-end gap-4 mt-8 pt-8 border-t border-zinc-800">
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-white text-black hover:bg-zinc-200 px-8 py-4 text-sm uppercase tracking-widest font-bold transition-colors disabled:opacity-50">
                    {isPending ? "Saving..." : "Save Project"}
                </button>
            </div>
        </form>
    );
};

const EditProjectForm = ({
    project,
    onClose,
}: {
    project: Project;
    onClose: () => void;
}) => {
    const { mutateAsync: updateProject, isPending } = useUpdateProject(
        project.id
    );
    const { mutateAsync: uploadImage } = useUploadImage();

    const [projectFields, setProjectFields] = useState<Partial<Project>>({
        title: project.title,
        coverImage: project.coverImage,
        coverImagePublicId: project.coverImagePublicId,
        category: project.category,
        projectUrl: project.projectUrl,
        tags: project.tags,
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleImageUpload = async (
        imageFile: File
    ): Promise<UploadImageResponse | null> => {
        let data;
        try {
            data = await uploadImage(imageFile);
            toast.success("Image uploaded");
        } catch (error) {
            data = null;
            toast.error("Failed to upload image");
        }

        return data;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { title, projectUrl, tags } = projectFields;

        if (!title || !projectUrl || tags?.length == 0) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            let coverImage = projectFields.coverImage;
            let coverImagePublicId = projectFields.coverImagePublicId;

            if (imageFile) {
                const data = await handleImageUpload(imageFile);
                if (!data) return;
                coverImage = data.url;
                coverImagePublicId = data.public_id;
            }

            await updateProject({
                ...projectFields,
                coverImage,
                coverImagePublicId,
            });

            toast.success("Project updated");
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update project");
        }
    };

    const { title, category, projectUrl, tags } = projectFields;

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 grid grid-cols-2 gap-8">
            <div className="col-span-1 space-y-6">
                <div>
                    <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                        Title
                    </label>
                    <input
                        required
                        value={title}
                        onChange={(e) =>
                            setProjectFields((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }))
                        }
                        className="w-full p-4 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                        Category
                    </label>
                    <select
                        value={category}
                        onChange={(e) =>
                            setProjectFields((prev) => ({
                                ...prev,
                                category: e.target.value as ServicesTypes,
                            }))
                        }
                        className="w-full p-4 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors appearance-none">
                        <option value="Cinematography-and-Videography">
                            Cinematography & Videography
                        </option>
                        <option value="Photography">Photography</option>
                        <option value="Design-and-Branding">
                            Design & Branding
                        </option>
                        <option value="Post-Production">Post Production</option>
                        <option value="Web-and-Digital">Web & Digital</option>
                        <option value="Marketing">Marketing</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                        Project URL
                    </label>
                    <input
                        required
                        value={projectUrl}
                        onChange={(e) =>
                            setProjectFields((prev) => ({
                                ...prev,
                                projectUrl: e.target.value,
                            }))
                        }
                        className="w-full p-4 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors"
                    />
                </div>
            </div>

            <div className="col-span-1 space-y-6">
                <div>
                    <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                        Tags (comma separated)
                    </label>
                    <input
                        required
                        value={tags?.join(", ")}
                        onChange={(e) =>
                            setProjectFields((prev) => ({
                                ...prev,
                                tags: e.target.value
                                    .split(",")
                                    .map((tag) => tag.trim()),
                            }))
                        }
                        className="w-full p-4 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors"
                        placeholder="e.g. Corporate, Event"
                    />
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                        Cover Image (Leave empty to keep current)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setImageFile(e.target.files?.[0] || null)
                        }
                        className="w-full p-4 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-white file:text-black hover:file:bg-zinc-200"
                    />
                </div>
            </div>

            <div className="col-span-2 flex justify-end gap-4 mt-8 pt-8 border-t border-zinc-800">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-8 py-4 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white text-sm uppercase tracking-widest font-medium transition-colors">
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-white text-black hover:bg-zinc-200 px-8 py-4 text-sm uppercase tracking-widest font-bold transition-colors disabled:opacity-50">
                    {isPending ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form>
    );
};
