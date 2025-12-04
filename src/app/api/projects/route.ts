import { db } from "@/lib/db/drizzle";
import { projects } from "@/lib/db/schema";
import { verifyToken } from "@/lib/utils/auth";
import { projectSchema } from "@/lib/utils/validation";
import { inArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const allProjects = await db.select().from(projects).all();
        const formatted = allProjects.map((p) => ({
            ...p,
            tags: JSON.parse(p.tags),
        }));

        return NextResponse.json({
            success: true,
            data: formatted,
            message: "Projects fetched successfully",
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, data: null, message: "Failed to fetch projects" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const auth = await verifyToken(request);
        if (!auth)
            return NextResponse.json(
                { success: false, data: null, message: "Unauthorized" },
                { status: 401 }
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

        const newProject = await db
            .insert(projects)
            .values({
                title,
                coverImage,
                coverImagePublicId,
                projectUrl,
                category,
                tags: JSON.stringify(tags),
            })
            .returning()
            .get();

        const formatted = {
            ...newProject,
            tags: JSON.parse(newProject.tags),
        };

        return NextResponse.json(
            {
                success: true,
                data: formatted,
                message: "Project created successfully",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, data: null, message: "Failed to create project" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const auth = await verifyToken(request);
        if (!auth)
            return NextResponse.json(
                { success: false, data: null, message: "Unauthorized" },
                { status: 401 }
            );

        const { ids, deleteAll } = await request.json();

        if (!deleteAll && (!ids || !Array.isArray(ids) || ids.length === 0))
            return NextResponse.json(
                { success: false, data: null, message: "No IDs provided" },
                { status: 400 }
            );

        let projectsToDelete;
        if (deleteAll)
            projectsToDelete = await db.select().from(projects).all();
        else
            projectsToDelete = await db
                .select()
                .from(projects)
                .where(inArray(projects.id, ids))
                .all();

        if (projectsToDelete.length === 0)
            return NextResponse.json(
                {
                    success: false,
                    data: null,
                    message: "No projects found to delete",
                },
                { status: 404 }
            );

        for (const project of projectsToDelete)
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

        if (deleteAll) await db.delete(projects).run();
        else await db.delete(projects).where(inArray(projects.id, ids)).run();

        return NextResponse.json({
            success: true,
            data: null,
            message: deleteAll
                ? "All projects deleted successfully"
                : "Project(s) deleted successfully",
        });
    } catch (error) {
        console.error("Delete projects error:", error);
        return NextResponse.json(
            {
                success: false,
                data: null,
                message: "Failed to delete project(s)",
            },
            { status: 500 }
        );
    }
}
