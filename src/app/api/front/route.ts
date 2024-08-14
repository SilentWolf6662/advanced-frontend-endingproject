import { NextResponse } from 'next/server';
import { dbClient } from '@/lib/client';

const supabase = dbClient;

export const GET = async () => {
    try {
        const { data: front, error } = await supabase
            .from('nou_front')
            .select(`*, nou_subpagelink(*, nou_subpage(*, nou_contacts(id, name, imagesrc)))`);

        if (error) {
            throw new Error('Error fetching data from nou_front');
        }

        if (!front) {
            return NextResponse.json(
                { error: 'Front Page not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ front }, { status: 200 });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
};