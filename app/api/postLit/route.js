// app/api/postLit/route.js

import { NextResponse } from 'next/server';

import { encryptJsonFile } from '../../utils/encryptJsonFile';

export async function POST(request) {
  try {
    const body = await request.json();
    const { recipient } = body;

    if (!recipient) {
      return NextResponse.json({ error: 'Recipient address is required.' }, { status: 400 });
    }

    // Call your encryptJsonFile function
    const result = await encryptJsonFile({ recipient });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error in encryptJsonFile API:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
