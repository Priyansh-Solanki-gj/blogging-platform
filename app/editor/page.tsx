"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Eye, Send, X, Plus } from "lucide-react"

export default function EditorPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [status, setStatus] = useState("draft")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSave = async (publishStatus: string) => {
    setIsLoading(true)

    // Validate required fields
    if (!title.trim()) {
      alert("Please enter a title")
      setIsLoading(false)
      return
    }

    if (!content.trim()) {
      alert("Please enter some content")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          tags,
          status: publishStatus,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Article saved:", data)

        // Show success message
        alert(`Article ${publishStatus === "published" ? "published" : "saved as draft"} successfully!`)

        // Redirect to dashboard
        router.push("/dashboard")
      } else {
        const errorData = await response.json()
        alert(`Error: ${errorData.message}`)
      }
    } catch (error) {
      console.error("Error saving article:", error)
      alert("An error occurred while saving the article")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Article Editor</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => handleSave("draft")} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button onClick={() => handleSave("published")} disabled={isLoading}>
              <Send className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Article Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter your article title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Write a brief description of your article..."
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={3}
                  />
                </div>

                <Tabs defaultValue="write" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="write">Write</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="write" className="space-y-4">
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        placeholder="Start writing your article..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={20}
                        className="font-mono"
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="preview" className="space-y-4">
                    <div className="border rounded-lg p-4 min-h-[500px] bg-muted/50">
                      <h2 className="text-2xl font-bold mb-4">{title || "Article Title"}</h2>
                      <p className="text-muted-foreground mb-6">{excerpt || "Article excerpt will appear here..."}</p>
                      <div className="prose max-w-none">
                        {content ? (
                          <pre className="whitespace-pre-wrap font-sans">{content}</pre>
                        ) : (
                          <p className="text-muted-foreground">Start writing to see your content here...</p>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Publish Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                  />
                  <Button size="sm" onClick={handleAddTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Article Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Article Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Words:</span>
                  <span>{content.split(/\s+/).filter((word) => word.length > 0).length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Characters:</span>
                  <span>{content.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Reading time:</span>
                  <span>{Math.ceil(content.split(/\s+/).filter((word) => word.length > 0).length / 200)} min</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
