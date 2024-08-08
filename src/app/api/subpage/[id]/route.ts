import { NextRequest, NextResponse } from 'next/server'

import { dbClient } from '@/lib/client'

type RouteParams = {
	params: {
		id: string
	}
}

const supabase = dbClient

export const GET = async (req: NextRequest, route: RouteParams) => {
	const subpageId = route.params.id

	let { data: subpage, error } = await supabase
		.from('nou_subpage')
		.select(`*, nou_contacts(id, name, imagesrc)`)
		.eq('id', subpageId)

	if (error) {
		return NextResponse.json(
			{ error: 'Error fetching data' },
			{ status: 500 }
		)
	}

	if (!subpage) {
		return NextResponse.json(
			{ error: 'Subpage not found' },
			{ status: 404 }
		)
	}

	return NextResponse.json({ subpage: subpage }, { status: 200 })
}
