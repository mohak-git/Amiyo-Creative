import { Logo } from "@/lib/db/models/Logo";
import dbConnect from "@/lib/db/mongoose";
import { parseObjectId } from "@/lib/db/util";
import { verifyToken } from "@/lib/utils/auth";
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
        const logo = await Logo.findById(objectId);

        if (!logo)
            return NextResponse.json(
                { success: false, data: null, message: "Logo not found" },
                { status: 404 }
            );

        return NextResponse.json({
            success: true,
            data: logo,
            message: "Logo fetched successfully",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, data: null, message: "Failed to fetch logo" },
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
        const logo = await Logo.findById(objectId);

        if (!logo)
            return NextResponse.json(
                { success: false, data: null, message: "Logo not found" },
                { status: 404 }
            );

        if (logo.logoPublicId) {
            const deleteImageRes = await fetch(
                `${process.env.APP_URL}/api/upload`,
                {
                    method: "DELETE",
                    body: JSON.stringify({
                        public_id: logo.logoPublicId,
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

        await Logo.findByIdAndDelete(objectId);

        return NextResponse.json({
            success: true,
            data: null,
            message: "Logo deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, data: null, message: "Failed to delete logo" },
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
        const existingLogo = await Logo.findById(objectId);

        if (!existingLogo)
            return NextResponse.json(
                { success: false, data: null, message: "Logo not found" },
                { status: 404 }
            );

        const { title, logo, logoPublicId } = await request.json();

        if (!title || !logo || !logoPublicId)
            return NextResponse.json(
                {
                    success: false,
                    data: null,
                    message: "Title, logo and logoPublicId are required",
                },
                { status: 400 }
            );

        if (
            logo !== existingLogo.logo &&
            logoPublicId !== existingLogo.logoPublicId
        ) {
            const deleteImageRes = await fetch(
                `${process.env.APP_URL}/api/upload`,
                {
                    method: "DELETE",
                    body: JSON.stringify({
                        public_id: existingLogo.logoPublicId,
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

        const updatedLogo = await Logo.findByIdAndUpdate(
            objectId,
            { title, logo, logoPublicId },
            { new: true }
        );

        return NextResponse.json({
            success: true,
            data: updatedLogo,
            message: "Logo updated successfully",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, data: null, message: "Failed to update project" },
            { status: 500 }
        );
    }
}
