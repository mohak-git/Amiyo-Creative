import { Testimonial } from "@/lib/db/models/Testimonial";
import dbConnect from "@/lib/db/mongoose";
import { verifyToken } from "@/lib/utils/auth";
import { testimonialSchema } from "@/lib/utils/validation";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const allTestimonials = await Testimonial.find().sort({
            createdAt: -1,
        });

        return NextResponse.json({
            success: true,
            data: allTestimonials,
            message: "Testimonials fetched successfully",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                data: null,
                message: "Failed to fetch testimonials",
            },
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
        const parsed = testimonialSchema.safeParse(body);

        if (!parsed.success)
            return NextResponse.json(
                { success: false, data: null, message: "Invalid data" },
                { status: 400 }
            );

        const {
            isVideo,
            name,
            role,
            company,
            avatar,
            rating,
            content,
            videoUrl,
            videoTitle,
        } = parsed.data;
        if (isVideo && (!videoUrl || !videoTitle))
            return NextResponse.json(
                {
                    success: false,
                    data: null,
                    message: "Video URL and title are required",
                },
                { status: 400 }
            );
        else if (
            !isVideo &&
            (!name || !role || !company || !avatar || !content || !rating)
        )
            return NextResponse.json(
                {
                    success: false,
                    data: null,
                    message:
                        "Avatar, name, role, company, content, and rating are required",
                },
                { status: 400 }
            );

        await dbConnect();
        const newTestimonial = await Testimonial.create(parsed.data);

        return NextResponse.json(
            {
                success: true,
                data: newTestimonial,
                message: "Testimonial created successfully",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                data: null,
                message: "Failed to create testimonial",
            },
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

        if (deleteAll) await Testimonial.deleteMany();
        else await Testimonial.deleteMany({ _id: { $in: ids } });

        return NextResponse.json({
            success: true,
            data: null,
            message: deleteAll
                ? "All testimonials deleted successfully"
                : "Testimonial(s) deleted successfully",
        });
    } catch (error) {
        console.error("Delete testimonials error:", error);
        return NextResponse.json(
            {
                success: false,
                data: null,
                message: "Failed to delete testimonial(s)",
            },
            { status: 500 }
        );
    }
}
