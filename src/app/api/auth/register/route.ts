import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    console.log('username: ', username);
    console.log('email: ', email);
    console.log('password: ', password);

    return NextResponse.json(
      { message: 'New user successfully registered.' },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occured while registering user.' },
      { status: 500 },
    );
  }
}
