import { Enquiry } from "@/lib/db/models/Enquiry";
import dbConnect from "@/lib/db/mongoose";
import { parseObjectId } from "@/lib/db/util";
import { verifyToken } from "@/lib/utils/auth";
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

        const objectId = parseObjectId(id);
        if (!objectId)
            return NextResponse.json(
                { success: false, data: null, message: "Invalid ID format" },
                { status: 400 }
            );

        await dbConnect();
        const enquiry = await Enquiry.findById(objectId);

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
        console.error(error);
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

        const objectId = parseObjectId(id);
        if (!objectId)
            return NextResponse.json(
                { success: false, data: null, message: "Invalid ID format" },
                { status: 400 }
            );

        await dbConnect();
        const enquiry = await Enquiry.findByIdAndUpdate(
            objectId,
            { status },
            { new: true }
        );

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
        console.error(error);
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

        const objectId = parseObjectId(id);
        if (!objectId)
            return NextResponse.json(
                { success: false, data: null, message: "Invalid ID format" },
                { status: 400 }
            );

        await dbConnect();
        await Enquiry.findByIdAndDelete(objectId);

        return NextResponse.json({
            success: true,
            data: null,
            message: "Enquiry deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, data: null, message: "Failed to delete enquiry" },
            { status: 500 }
        );
    }
}
