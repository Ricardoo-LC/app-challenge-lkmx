import { query } from '@/lib/db';

export async function getAnalyticsMetrics() {
  const { rows: userCountResult } = await query<{ count: string }>(
    'SELECT COUNT(*) FROM users'
  );
  const totalUsers = parseInt(userCountResult[0].count, 10);

  const { rows: usersTodayResult } = await query<{ count: string }>(
    `SELECT COUNT(*) FROM users WHERE created_at >= NOW() - INTERVAL '1 day'`
  );
  const usersCreatedToday = parseInt(usersTodayResult[0].count, 10);

  return { totalUsers, usersCreatedToday };
}
