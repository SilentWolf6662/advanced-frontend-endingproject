import { NextRequest, NextResponse } from 'next/server'

import { dbClient } from '@/lib/client'

type RouteParams = {
	params: {
		id: string
	}
}

const supabase = dbClient

export const GET = async (req: NextRequest, route: RouteParams) => {
	let { data: contacts, error } = await supabase
		.from('nou_contacts')
		.select(`*`)

	if (error) {
		return NextResponse.json(
			{ error: 'Error fetching data' },
			{ status: 500 }
		)
	}

	if (!contacts) {
		return NextResponse.json(
			{ error: 'Contacts not found' },
			{ status: 404 }
		)
	}

	return NextResponse.json({ contacts: contacts }, { status: 200 })
}
