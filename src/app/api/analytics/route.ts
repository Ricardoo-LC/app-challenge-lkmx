import { getAnalyticsMetrics } from '@/services/analytics';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const metrics = await getAnalyticsMetrics();
    return NextResponse.json(metrics, { status: 200 });
  } catch (error) {
    console.error('API Error: Failed to fetch analytics:', error);
    return NextResponse.json(
      {
        message: 'Failed to fetch analytics',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
