import { Project } from "@/lib/db/models/Project";
import dbConnect from "@/lib/db/mongoose";
import { parseObjectId } from "@/lib/db/util";
import { verifyToken } from "@/lib/utils/auth";
import { deleteFromCloudinary } from "@/lib/utils/cloudinary";
import { projectSchema } from "@/lib/utils/validation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        if (!id)
            return NextResponse.json(
                { success: false, data: null, message: "ID required" },
                { status: 400 }
            );

        const objectId = parseObjectId(id);
        if (!objectId)
            return NextResponse.json(
                { success: false, data: null, message: "Invalid ID format" },
                { status: 400 }
            );

        await dbConnect();
        const project = await Project.findById(objectId);

        if (!project)
            return NextResponse.json(
                { success: false, data: null, message: "Project not found" },
                { status: 404 }
            );

        return NextResponse.json({
            success: true,
            data: project,
            message: "Project fetched successfully",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, data: null, message: "Failed to fetch project" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const auth = await verifyToken(request);
        if (!auth)
            return NextResponse.json(
                { success: false, data: null, message: "Unauthorized" },
                { status: 401 }
            );

        const { id } = await params;
        if (!id)
            return NextResponse.json(
                { success: false, data: null, message: "ID required" },
                { status: 400 }
            );

        const objectId = parseObjectId(id);
        if (!objectId)
            return NextResponse.json(
                { success: false, data: null, message: "Invalid ID format" },
                { status: 400 }
            );

        await dbConnect();
        const project = await Project.findById(objectId);

        if (!project)
            return NextResponse.json(
                { success: false, data: null, message: "Project not found" },
                { status: 404 }
            );

        if (project.coverImagePublicId) {
            try {
                const deleteImageRes = await deleteFromCloudinary(
                    project.coverImagePublicId
                );
                if (deleteImageRes.result !== "ok") {
                    console.error(
                        `Cloudinary delete for ${project.title} result:`,
                        deleteImageRes
                    );
                    return NextResponse.json(
                        {
                            success: false,
                            data: null,
                            message: `Cloudinary delete for ${
                                project.title
                            } failed: ${
                                deleteImageRes.result || "unknown error"
                            }`,
                        },
                        { status: 500 }
                    );
                }
            } catch (err) {
                console.error(
                    `Cloudinary delete for ${project.title} error:`,
                    err
                );
                return NextResponse.json(
                    {
                        success: false,
                        data: null,
                        message: `Failed to delete ${project.title} image from Cloudinary`,
                    },
                    { status: 500 }
                );
            }
        }

        await Project.findByIdAndDelete(objectId);

        return NextResponse.json({
            success: true,
            data: null,
            message: "Project deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, data: null, message: "Failed to delete project" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const auth = await verifyToken(request);
        if (!auth)
            return NextResponse.json(
                { success: false, data: null, message: "Unauthorized" },
                { status: 401 }
            );

        const { id } = await params;
        if (!id)
            return NextResponse.json(
                { success: false, data: null, message: "ID required" },
                { status: 400 }
            );

        const objectId = parseObjectId(id);
        if (!objectId)
            return NextResponse.json(
                { success: false, data: null, message: "Invalid ID format" },
                { status: 400 }
            );

        await dbConnect();
        const existingProject = await Project.findById(objectId);

        if (!existingProject)
            return NextResponse.json(
                { success: false, data: null, message: "Project not found" },
                { status: 404 }
            );

        const body = await request.json();
        const parsed = projectSchema.safeParse(body);

        if (!parsed.success)
            return NextResponse.json(
                { success: false, data: null, message: "Invalid data" },
                { status: 400 }
            );

        const { coverImage, coverImagePublicId } = parsed.data;

        if (
            coverImage !== existingProject.coverImage &&
            coverImagePublicId !== existingProject.coverImagePublicId
        ) {
            try {
                const deleteImageRes = await deleteFromCloudinary(
                    existingProject.coverImagePublicId
                );
                if (deleteImageRes.result !== "ok") {
                    console.error(
                        `Cloudinary delete for ${existingProject.title} result:`,
                        deleteImageRes
                    );
                    return NextResponse.json(
                        {
                            success: false,
                            data: null,
                            message: `Cloudinary delete for ${
                                existingProject.title
                            } failed: ${
                                deleteImageRes.result || "unknown error"
                            }`,
                        },
                        { status: 500 }
                    );
                }
            } catch (err) {
                console.error(
                    `Cloudinary delete for ${existingProject.title} error:`,
                    err
                );
                return NextResponse.json(
                    {
                        success: false,
                        data: null,
                        message: `Failed to delete ${existingProject.title} image from Cloudinary`,
                    },
                    { status: 500 }
                );
            }
        }

        const updatedProject = await Project.findByIdAndUpdate(
            objectId,
            parsed.data,
            { new: true }
        );

        return NextResponse.json({
            success: true,
            data: updatedProject,
            message: "Project updated successfully",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, data: null, message: "Failed to update project" },
            { status: 500 }
        );
    }
}
