import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;
if (!API_URL) throw new Error("API_URL environment variable is not set!");

type ProxyParams = { slug: string[] };

export async function GET(
    request: NextRequest,
    { params }: { params: ProxyParams }
) {
    return proxyRequest(request, params);
}

export async function POST(
    request: NextRequest,
    { params }: { params: ProxyParams }
) {
    return proxyRequest(request, params);
}

export async function PUT(
    request: NextRequest,
    { params }: { params: ProxyParams }
) {
    return proxyRequest(request, params);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: ProxyParams }
) {
    return proxyRequest(request, params);
}

async function proxyRequest(
    request: NextRequest,
    params: ProxyParams
): Promise<NextResponse> {
    try {
        const { slug } = await params;

        if (!slug || slug.length === 0)
            return NextResponse.json(
                { error: "Invalid path" },
                { status: 400 }
            );

        const path = slug.join("/");

        const url = new URL(`${API_URL}/api/${path}`);

        const requestUrl = new URL(request.url);
        requestUrl.searchParams.forEach((value, key) => {
            if (key !== "slug") url.searchParams.append(key, value);
        });

        let body: string | null = null;
        if (!["GET", "HEAD"].includes(request.method)) {
            const jsonBody = await request.json().catch(() => null);
            body = jsonBody ? JSON.stringify(jsonBody) : null;
        }

        const strapiResponse = await fetch(url.href, {
            method: request.method,
            headers: { "Content-Type": "application/json" },
            body,
        });

        const data: unknown = await strapiResponse.json();

        return NextResponse.json(data, { status: strapiResponse.status });
    } catch (error) {
        console.error("Proxy error:", error);
        return NextResponse.json(
            { error: "Failed to fetch from Strapi" },
            { status: 500 }
        );
    }
}
