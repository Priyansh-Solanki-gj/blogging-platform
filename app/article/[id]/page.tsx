"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Heart, MessageCircle, Share2, Calendar, Clock, Send } from "lucide-react"

// Mock article data
const mockArticle = {
  id: 1,
  title: "Getting Started with React and TypeScript",
  content: `# Introduction

React and TypeScript make a powerful combination for building modern web applications. In this comprehensive guide, we'll explore how to set up and use these technologies together.

## Why TypeScript with React?

TypeScript brings static typing to JavaScript, which helps catch errors early in development and provides better IDE support. When combined with React, it offers:

- **Better Developer Experience**: Enhanced autocomplete and IntelliSense
- **Fewer Runtime Errors**: Catch type-related bugs during development
- **Improved Refactoring**: Safe and confident code changes
- **Better Documentation**: Types serve as inline documentation

## Setting Up Your Project

To get started with React and TypeScript, you can use Create React App with the TypeScript template:

\`\`\`bash
npx create-react-app my-app --template typescript
cd my-app
npm start
\`\`\`

## Basic Component Example

Here's a simple example of a React component written in TypeScript:

\`\`\`tsx
interface Props {
  name: string;
  age: number;
}

const UserProfile: React.FC<Props> = ({ name, age }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
    </div>
  );
};
\`\`\`

## Conclusion

React and TypeScript together provide a robust foundation for building scalable web applications. The initial learning curve is worth the long-term benefits in code quality and developer productivity.`,
  excerpt:
    "Learn how to build modern web applications with React and TypeScript. This comprehensive guide covers everything you need to know.",
  author: {
    name: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Full-stack developer passionate about React and TypeScript",
  },
  publishedAt: "2024-01-15",
  tags: ["React", "TypeScript", "Web Development"],
  likes: 42,
  comments: 8,
  readTime: "5 min read",
  isLiked: false,
}

const mockComments = [
  {
    id: 1,
    author: "Alice Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    content: "Great article! Really helped me understand the benefits of using TypeScript with React.",
    createdAt: "2024-01-16",
    likes: 3,
  },
  {
    id: 2,
    author: "Bob Smith",
    avatar: "/placeholder.svg?height=32&width=32",
    content: "The code examples are very clear. Thanks for sharing!",
    createdAt: "2024-01-17",
    likes: 1,
  },
]

export default function ArticlePage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState(mockArticle)
  const [comments, setComments] = useState(mockComments)
  const [newComment, setNewComment] = useState("")
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setArticle((prev) => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1,
    }))
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Current User",
        avatar: "/placeholder.svg?height=32&width=32",
        content: newComment,
        createdAt: new Date().toISOString().split("T")[0],
        likes: 0,
      }
      setComments([...comments, comment])
      setNewComment("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            BlogSpace
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{article.excerpt}</p>

          {/* Author Info */}
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-12 w-12">
              <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
              <AvatarFallback>
                {article.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{article.author.name}</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant={isLiked ? "default" : "outline"}
              size="sm"
              onClick={handleLike}
              className="flex items-center space-x-2"
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              <span>{article.likes}</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
              <MessageCircle className="h-4 w-4" />
              <span>{comments.length}</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="whitespace-pre-wrap">{article.content}</div>
        </div>

        <Separator className="mb-8" />

        {/* Comments Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>

          {/* Add Comment */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Add a comment</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
              />
              <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Post Comment
              </Button>
            </CardContent>
          </Card>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                      <AvatarFallback>
                        {comment.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <p className="font-semibold">{comment.author}</p>
                        <span className="text-sm text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-2">{comment.content}</p>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>{comment.likes}</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
