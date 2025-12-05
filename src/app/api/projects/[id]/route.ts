import { Project } from "@/lib/db/models/Project";
import dbConnect from "@/lib/db/mongoose";
import { parseObjectId } from "@/lib/db/util";
import { verifyToken } from "@/lib/utils/auth";
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
            const deleteImageRes = await fetch(
                `${process.env.APP_URL}/api/upload`,
                {
                    method: "DELETE",
                    body: JSON.stringify({
                        public_id: project.coverImagePublicId,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: request.headers.get("cookie")!,
                    },
                }
            );

            if (!deleteImageRes.ok)
                console.error(
                    `Failed to delete image for project ${project._id}`
                );
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

        const {
            title,
            coverImage,
            coverImagePublicId,
            projectUrl,
            tags,
            category,
        } = parsed.data;

        if (
            coverImage !== existingProject.coverImage &&
            coverImagePublicId !== existingProject.coverImagePublicId
        ) {
            const deleteImageRes = await fetch(
                `${process.env.APP_URL}/api/upload`,
                {
                    method: "DELETE",
                    body: JSON.stringify({
                        public_id: existingProject.coverImagePublicId,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: request.headers.get("cookie")!,
                    },
                }
            );

            if (!deleteImageRes.ok)
                return NextResponse.json(
                    {
                        success: false,
                        data: null,
                        message: "Failed to delete image from cloudinary",
                    },
                    { status: 500 }
                );
        }

        const updatedProject = await Project.findByIdAndUpdate(
            objectId,
            {
                title,
                coverImage,
                coverImagePublicId,
                projectUrl,
                category,
                tags,
            },
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
