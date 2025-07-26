import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Calendar } from "lucide-react"

// Mock data for demonstration
const featuredArticles = [
  {
    id: 1,
    title: "Getting Started with React and TypeScript",
    excerpt:
      "Learn how to build modern web applications with React and TypeScript. This comprehensive guide covers everything you need to know.",
    author: "John Doe",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishedAt: "2024-01-15",
    tags: ["React", "TypeScript", "Web Development"],
    likes: 42,
    comments: 8,
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Building Scalable APIs with Node.js",
    excerpt:
      "Discover best practices for creating robust and scalable APIs using Node.js and Express. Perfect for backend developers.",
    author: "Jane Smith",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishedAt: "2024-01-12",
    tags: ["Node.js", "API", "Backend"],
    likes: 38,
    comments: 12,
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "MongoDB Best Practices for Modern Applications",
    excerpt: "Learn how to design efficient database schemas and optimize queries for better performance in MongoDB.",
    author: "Mike Johnson",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishedAt: "2024-01-10",
    tags: ["MongoDB", "Database", "Performance"],
    likes: 29,
    comments: 6,
    readTime: "6 min read",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            BlogSpace
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/articles" className="text-muted-foreground hover:text-foreground">
              Articles
            </Link>
            <Link href="/authors" className="text-muted-foreground hover:text-foreground">
              Authors
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Share Your Stories with the World</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community of writers and readers. Create, publish, and discover amazing content on topics you love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Start Writing
              </Button>
            </Link>
            <Link href="/articles">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                Explore Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={article.authorAvatar || "/placeholder.svg"} alt={article.author} />
                      <AvatarFallback>
                        {article.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-sm text-muted-foreground">
                      <p>{article.author}</p>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{article.readTime}</span>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{article.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{article.comments}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of writers who are already sharing their knowledge and connecting with readers worldwide.
          </p>
          <Link href="/register">
            <Button size="lg">Create Your Account</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 BlogSpace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
