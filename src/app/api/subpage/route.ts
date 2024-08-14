import { NextResponse } from 'next/server';
import { dbClient } from '@/lib/client';

const supabase = dbClient;

export const GET = async () => {
    try {
        const { data: subpage, error } = await supabase
            .from('nou_subpage')
            .select(`*, nou_contacts(id, name, imagesrc)`);

        if (error) {
            throw new Error('Error fetching data from nou_subpage');
        }

        if (!subpage) {
            return NextResponse.json(
                { error: 'Subpage not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ subpage }, { status: 200 });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
};