import { NextRequest, NextResponse } from 'next/server';
import { dbClient } from '@/lib/client';

const supabase = dbClient;

export const GET = async (req: NextRequest, route: RouteParams) => {
    const contactId = route.params.id;

    try {
        const { data: contacts, error } = await supabase
            .from('nou_contacts')
            .select('*')
            .eq('id', contactId);

        if (error) {
            throw new Error('Error fetching data from nou_contacts');
        }

        if (!contacts) {
            return NextResponse.json(
                { error: 'Contact not found' },
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