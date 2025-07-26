import { type NextRequest, NextResponse } from "next/server"

// Mock user database (in real app, this would be MongoDB)
const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password, // In real app, hash this password
    }

    users.push(newUser)

    // In a real app, you'd generate a proper JWT token
    const token = `mock-jwt-token-${newUser.id}`

    return NextResponse.json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
