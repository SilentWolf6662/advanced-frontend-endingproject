import { NextRequest, NextResponse } from 'next/server'

import { dbClient } from '@/lib/client'

type RouteParams = {
	params: {
		id: string
	}
}

const supabase = dbClient

export const GET = async (req: NextRequest, route: RouteParams) => {

	let { data: front, error } = await supabase
		.from('nou_front')
		.select(`*, nou_subpagelink(*, nou_subpage(*, nou_contacts(id, name, imagesrc)))`)

	if (error) {
		return NextResponse.json(
			{ error: 'Error fetching data' },
			{ status: 500 }
		)
	}

	if (!front) {
		return NextResponse.json(
			{ error: 'Front Page not found' },
			{ status: 404 }
		)
	}

	return NextResponse.json({ front: front }, { status: 200 })
}
