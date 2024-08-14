import { NextRequest, NextResponse } from 'next/server';
import { dbClient } from '@/lib/client';

const supabase = dbClient;

export const GET = async (req: NextRequest, route: RouteParams) => {
    const subpageId = route.params.id;

    try {
        const { data: subpage, error } = await supabase
            .from('nou_subpage')
            .select(`*, nou_contacts(id, name, imagesrc)`)
            .eq('id', subpageId);

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