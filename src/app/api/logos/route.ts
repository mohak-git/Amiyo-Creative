import { Logo } from "@/lib/db/models/Logo";
import dbConnect from "@/lib/db/mongoose";
import { verifyToken } from "@/lib/utils/auth";
import { deleteFromCloudinary } from "@/lib/utils/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const logos = await Logo.find().sort({ createdAt: -1 });
        return NextResponse.json(
            {
                success: true,
                data: logos,
                message: "Logos fetched successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, data: null, message: "Failed to fetch logos" },
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

        const { title, logo, logoPublicId } = await request.json();
        if (!title || !logo || !logoPublicId)
            return NextResponse.json(
                {
                    success: false,
                    data: null,
                    message: "Title, logo, and logoPublicId are required",
                },
                { status: 400 }
            );

        await dbConnect();
        const newLogo = await Logo.create({ title, logo, logoPublicId });

        return NextResponse.json(
            {
                success: true,
                data: newLogo,
                message: "Logo created successfully",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, data: null, message: "Failed to create logo" },
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

        await dbConnect();

        let logosToDelete;
        if (deleteAll) logosToDelete = await Logo.find();
        else logosToDelete = await Logo.find({ _id: { $in: ids } });

        if (logosToDelete.length === 0)
            return NextResponse.json(
                { success: false, data: null, message: "Logos not found" },
                { status: 404 }
            );

        for (const logo of logosToDelete)
            if (logo.logoPublicId) {
                try {
                    const deleteImageRes = await deleteFromCloudinary(
                        logo.logoPublicId
                    );
                    if (deleteImageRes.result !== "ok")
                        console.error(
                            `Cloudinary delete for ${logo.title} result:`,
                            deleteImageRes
                        );
                } catch (err) {
                    console.error(
                        `Cloudinary delete for ${logo.title} error:`,
                        err
                    );
                }
            }

        if (deleteAll) await Logo.deleteMany();
        else await Logo.deleteMany({ _id: { $in: ids } });

        return NextResponse.json(
            {
                success: true,
                data: null,
                message: deleteAll
                    ? "All logos deleted successfully"
                    : "Logos deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, data: null, message: "Failed to delete logo(s)" },
            { status: 500 }
        );
    }
}
