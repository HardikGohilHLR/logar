// Database connection
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

const client = postgres(process.env.NEXT_PUBLIC_DATABASE_URL!);

export const db = drizzle({ client });
