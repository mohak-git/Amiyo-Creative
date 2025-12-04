import { db } from "@/lib/db/drizzle";
import { projects } from "@/lib/db/schema";
import { verifyToken } from "@/lib/utils/auth";
import { projectSchema } from "@/lib/utils/validation";
import { eq } from "drizzle-orm";
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

        const project = await db
            .select()
            .from(projects)
            .where(eq(projects.id, parseInt(id)))
            .get();

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

        const project = await db
            .select()
            .from(projects)
            .where(eq(projects.id, parseInt(id)))
            .get();

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
                    `Failed to delete image for project ${project.id}`
                );
        }

        await db
            .delete(projects)
            .where(eq(projects.id, parseInt(id)))
            .run();

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

        const existingProject = await db
            .select()
            .from(projects)
            .where(eq(projects.id, parseInt(id)))
            .get();

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

        const updatedProject = await db
            .update(projects)
            .set({
                title,
                coverImage,
                coverImagePublicId,
                projectUrl,
                category,
                tags: JSON.stringify(tags),
                updatedAt: new Date(),
            })
            .where(eq(projects.id, parseInt(id)))
            .returning()
            .get();

        const formatted = {
            ...updatedProject,
            tags: JSON.parse(updatedProject.tags),
        };

        return NextResponse.json({
            success: true,
            data: formatted,
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
