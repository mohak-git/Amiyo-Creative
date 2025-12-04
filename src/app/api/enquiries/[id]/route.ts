import { db } from "@/lib/db/drizzle";
import { enquiries } from "@/lib/db/schema";
import { verifyToken } from "@/lib/utils/auth";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
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

        const enquiry = await db
            .select()
            .from(enquiries)
            .where(eq(enquiries.id, parseInt(id)))
            .get();

        if (!enquiry)
            return NextResponse.json(
                { success: false, data: null, message: "Enquiry not found" },
                { status: 404 }
            );

        return NextResponse.json({
            success: true,
            data: enquiry,
            message: "Enquiry fetched successfully",
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, data: null, message: "Failed to fetch enquiry" },
            { status: 500 }
        );
    }
}

export async function PATCH(
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

        const { status } = await request.json();
        if (!["new", "in-progress", "closed"].includes(status))
            return NextResponse.json(
                { success: false, data: null, message: "Invalid status" },
                { status: 400 }
            );

        const enquiry = await db
            .update(enquiries)
            .set({ status })
            .where(eq(enquiries.id, parseInt(id)))
            .run();

        if (!enquiry)
            return NextResponse.json(
                { success: false, data: null, message: "Enquiry not found" },
                { status: 404 }
            );

        return NextResponse.json({
            success: true,
            data: enquiry,
            message: "Enquiry updated successfully",
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, data: null, message: "Failed to update enquiry" },
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

        await db
            .delete(enquiries)
            .where(eq(enquiries.id, parseInt(id)))
            .run();

        return NextResponse.json({
            success: true,
            data: null,
            message: "Enquiry deleted successfully",
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, data: null, message: "Failed to delete enquiry" },
            { status: 500 }
        );
    }
}
