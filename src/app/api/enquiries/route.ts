import { Enquiry } from "@/lib/db/models/Enquiry";
import dbConnect from "@/lib/db/mongoose";
import { verifyToken } from "@/lib/utils/auth";
import { sendNotifications } from "@/lib/utils/notify";
import { enquirySchema } from "@/lib/utils/validation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const auth = await verifyToken(request);
        if (!auth)
            return NextResponse.json(
                { success: false, data: null, message: "Unauthorized" },
                { status: 401 }
            );

        await dbConnect();
        const allEnquiries = await Enquiry.find().sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: allEnquiries,
            message: "Enquiries fetched successfully",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                data: null,
                message: "Failed to fetch enquiries",
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parsed = enquirySchema.safeParse(body);

        if (!parsed.success)
            return NextResponse.json(
                { success: false, data: null, message: "Invalid data" },
                { status: 400 }
            );

        const { name, email, phone, message } = parsed.data;

        await dbConnect();
        const newEnquiry = await Enquiry.create({
            name,
            email,
            phone,
            message,
        });

        sendNotifications({ name, email, phone, message }).catch((err) =>
            console.error("Failed to trigger notification:", err)
        );

        return NextResponse.json({
            success: true,
            data: newEnquiry,
            message: "Enquiry submitted successfully",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, data: null, message: "Failed to submit enquiry" },
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

        const body = await request.json();
        const { ids, deleteAll } = body;

        if (!deleteAll && (!ids || !Array.isArray(ids) || ids.length === 0))
            return NextResponse.json(
                { success: false, data: null, message: "No IDs provided" },
                { status: 400 }
            );

        await dbConnect();

        if (deleteAll) await Enquiry.deleteMany();
        else await Enquiry.deleteMany({ _id: { $in: ids } });

        return NextResponse.json({
            success: true,
            data: null,
            message: deleteAll
                ? "All enquiries deleted successfully"
                : "Enquiries deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                data: null,
                message: "Failed to delete enquiry(s)",
            },
            { status: 500 }
        );
    }
}
