import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://miami.vexanode.cloud:2000';
        const response = await fetch(`${apiUrl}/api/stats`, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            },
        });
    } catch (error: any) {
        console.error('Error fetching stats:', error);
        return NextResponse.json(
            { error: 'Failed to fetch stats', message: error.message },
            { status: 500 }
        );
    }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
