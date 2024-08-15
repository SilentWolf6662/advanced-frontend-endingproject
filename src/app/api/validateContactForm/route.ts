import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';

const contactSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
    email: z.string().email({ message: 'Email must be a valid email address' }).min(5, { message: 'Email must be at least 5 characters long' }),
    subject: z.string().min(5, { message: 'Subject must be at least 5 characters long' }),
    message: z.string().min(10, { message: 'Message must be at least 10 characters long' }),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); // Ensure the request body is parsed correctly
        const result = contactSchema.safeParse(body);

        if (!result.success) {
            const errors = result.error.errors.map(err => ({
                field: err.path[0],
                message: err.message,
            }));
            if (body.email === '') {
                errors.push({ field: 'email', message: 'Email is required' });
            }
            if (body.name === '') {
                errors.push({ field: 'name', message: 'Name is required' });
            }
            if (body.subject === '') {
                errors.push({ field: 'subject', message: 'Subject is required' });
            }
            if (body.message === '') {
                errors.push({ field: 'message', message: 'Message is required' });
            }
            return NextResponse.json({ errors }, { status: 400 });
        }

        return NextResponse.json({ message: 'Validation successful' });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}