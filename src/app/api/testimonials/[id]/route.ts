import { Testimonial } from "@/lib/db/models/Testimonial";
import dbConnect from "@/lib/db/mongoose";
import { parseObjectId } from "@/lib/db/util";
import { verifyToken } from "@/lib/utils/auth";
import { testimonialSchema } from "@/lib/utils/validation";
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
        const testimonial = await Testimonial.findById(objectId);

        if (!testimonial)
            return NextResponse.json(
                {
                    success: false,
                    data: null,
                    message: "Testimonial not found",
                },
                { status: 404 }
            );

        return NextResponse.json({
            success: true,
            data: testimonial,
            message: "Testimonial fetched successfully",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                data: null,
                message: "Failed to fetch testimonial",
            },
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
        const testimonial = await Testimonial.findById(objectId);

        if (!testimonial)
            return NextResponse.json(
                {
                    success: false,
                    data: null,
                    message: "Testimonial not found",
                },
                { status: 404 }
            );

        if (!testimonial.isVideo && testimonial.avatarPublicId) {
            const deleteImageRes = await fetch(
                `${process.env.APP_URL}/api/upload`,
                {
                    method: "DELETE",
                    body: JSON.stringify({
                        public_id: testimonial.avatarPublicId,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: request.headers.get("cookie")!,
                    },
                }
            );

            if (!deleteImageRes.ok)
                console.error(
                    `Failed to delete image for testimonial ${testimonial._id}`
                );
        }

        await Testimonial.findByIdAndDelete(objectId);

        return NextResponse.json({
            success: true,
            data: null,
            message: "Testimonial deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                data: null,
                message: "Failed to delete testimonial",
            },
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
        const existingTestimonial = await Testimonial.findById(objectId);

        if (!existingTestimonial)
            return NextResponse.json(
                {
                    success: false,
                    data: null,
                    message: "Testimonial not found",
                },
                { status: 404 }
            );

        const body = await request.json();
        const parsed = testimonialSchema.safeParse(body);

        if (!parsed.success)
            return NextResponse.json(
                { success: false, data: null, message: "Invalid data" },
                { status: 400 }
            );

        const { avatar, avatarPublicId } = parsed.data;

        if (
            !existingTestimonial.isVideo &&
            existingTestimonial.avatarPublicId &&
            avatar !== existingTestimonial.avatar &&
            avatarPublicId !== existingTestimonial.avatarPublicId
        ) {
            const deleteImageRes = await fetch(
                `${process.env.APP_URL}/api/upload`,
                {
                    method: "DELETE",
                    body: JSON.stringify({
                        public_id: existingTestimonial.avatarPublicId,
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

        const updatedTestimonial = await Testimonial.findByIdAndUpdate(
            objectId,
            parsed.data,
            { new: true }
        );

        return NextResponse.json({
            success: true,
            data: updatedTestimonial,
            message: "Testimonial updated successfully",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                data: null,
                message: "Failed to update testimonial",
            },
            { status: 500 }
        );
    }
}
