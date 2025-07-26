import { type NextRequest, NextResponse } from "next/server"

// Mock articles database - in production, this would be MongoDB
const articles: any[] = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    excerpt: "A comprehensive guide to understanding and using React Hooks effectively in your applications.",
    content:
      "React Hooks are a powerful feature that allows you to use state and other React features without writing a class component...",
    status: "published",
    publishedAt: "2024-01-15",
    tags: ["React", "JavaScript", "Hooks"],
    likes: 24,
    comments: 5,
    views: 156,
    authorId: 1,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Building RESTful APIs with Express",
    excerpt: "Learn how to create robust and scalable APIs using Express.js and Node.js.",
    content: "Express.js is a minimal and flexible Node.js web application framework...",
    status: "draft",
    publishedAt: null,
    tags: ["Node.js", "Express", "API"],
    likes: 0,
    comments: 0,
    views: 0,
    authorId: 1,
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    // In a real app, you'd verify the JWT token and filter by user
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Return articles for the authenticated user
    return NextResponse.json(articles)
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, excerpt, tags, status } = await request.json()

    // Verify authentication
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const newArticle = {
      id: articles.length + 1,
      title,
      content,
      excerpt,
      tags: tags || [],
      status,
      authorId: 1, // Mock author ID
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: status === "published" ? new Date().toISOString() : null,
      likes: 0,
      comments: 0,
      views: 0,
    }

    articles.push(newArticle)

    return NextResponse.json(newArticle, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
