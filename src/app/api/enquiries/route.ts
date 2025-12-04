import { db } from "@/lib/db/drizzle";
import { enquiries } from "@/lib/db/schema";
import { verifyToken } from "@/lib/utils/auth";
import { enquirySchema } from "@/lib/utils/validation";
import { inArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const auth = await verifyToken(request);
        if (!auth)
            return NextResponse.json(
                { success: false, data: null, message: "Unauthorized" },
                { status: 401 }
            );

        const allEnquiries = await db.select().from(enquiries).all();
        return NextResponse.json({
            success: true,
            data: allEnquiries,
            message: "Enquiries fetched successfully",
        });
    } catch (error) {
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
        const auth = await verifyToken(request);
        if (!auth)
            return NextResponse.json(
                { success: false, data: null, message: "Unauthorized" },
                { status: 401 }
            );

        const body = await request.json();
        const parsed = enquirySchema.safeParse(body);

        if (!parsed.success)
            return NextResponse.json(
                { success: false, data: null, message: "Invalid data" },
                { status: 400 }
            );

        const { name, email, phone, message } = parsed.data;

        const newEnquiry = await db
            .insert(enquiries)
            .values({ name, email, phone, message })
            .returning()
            .get();

        void fetch(`${process.env.APP_URL}/api/notify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, phone, message }),
        }).catch((err) =>
            console.error("Failed to trigger notification:", err)
        );

        return NextResponse.json({
            success: true,
            data: newEnquiry,
            message: "Enquiry submitted successfully",
        });
    } catch (error) {
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

        if (deleteAll) await db.delete(enquiries).run();
        else await db.delete(enquiries).where(inArray(enquiries.id, ids)).run();

        return NextResponse.json({
            success: true,
            data: null,
            message: deleteAll
                ? "All enquiries deleted successfully"
                : "Enquiries deleted successfully",
        });
    } catch (error) {
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
