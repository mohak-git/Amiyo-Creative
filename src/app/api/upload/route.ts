import { verifyToken } from "@/lib/utils/auth";
import {
    deleteFromCloudinary,
    uploadToCloudinary,
} from "@/lib/utils/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const auth = await verifyToken(request);
        if (!auth)
            return NextResponse.json(
                { success: false, data: null, message: "Unauthorized" },
                { status: 401 }
            );

        const formData = await request.formData();
        const file = formData.get("image") as File;

        if (!file)
            return NextResponse.json(
                { success: false, data: null, message: "No file provided" },
                { status: 400 }
            );

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const originalName = file.name.split(".")[0];
        const timestamp = Date.now();
        const safeFilename = `${originalName}-${timestamp}`.replace(
            /[^a-zA-Z0-9-_]/g,
            ""
        );
        const { secure_url, public_id } = await uploadToCloudinary(
            buffer,
            safeFilename
        );

        if (!secure_url)
            return NextResponse.json(
                {
                    success: false,
                    data: null,
                    message: "Failed to upload image to Cloudinary",
                },
                { status: 500 }
            );

        return NextResponse.json({
            success: true,
            data: { url: secure_url, public_id },
            message: "Image uploaded successfully",
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { success: false, data: null, message: "Upload failed" },
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

        const { public_id }: { public_id: string } = await request.json();

        if (!public_id)
            return NextResponse.json(
                {
                    success: false,
                    data: null,
                    message: "Invalid public_id",
                },
                { status: 400 }
            );

        const result = await deleteFromCloudinary(public_id);

        if (result.result !== "ok")
            return NextResponse.json(
                {
                    success: false,
                    data: null,
                    message: "Failed to delete image",
                },
                { status: 500 }
            );

        return NextResponse.json(
            {
                success: true,
                data: null,
                message: "Image deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            {
                success: false,
                data: null,
                message: "Unexpected error during deletion",
            },
            { status: 500 }
        );
    }
}
