import { NextResponse } from 'next/server';
import { dbClient } from '@/lib/client';

const supabase = dbClient;

export const GET = async () => {
    try {
        const { data: contacts, error } = await supabase
            .from('nou_contacts')
            .select('*');

        if (error) {
            throw new Error('Error fetching data from nou_contacts');
        }

        if (!contacts) {
            return NextResponse.json(
                { error: 'Contacts not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ contacts }, { status: 200 });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
};