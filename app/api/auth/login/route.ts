import { type NextRequest, NextResponse } from "next/server"

// Mock user database
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In real app, this would be hashed
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Find user
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // In a real app, you'd generate a proper JWT token
    const token = `mock-jwt-token-${user.id}`

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
