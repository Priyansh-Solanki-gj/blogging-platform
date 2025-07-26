"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Save, Camera, Heart, MessageCircle, Eye } from "lucide-react"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    website: "",
    location: "",
  })

  useEffect(() => {
    // Get user from localStorage (in a real app, you'd fetch from API)
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setFormData({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        bio: parsedUser.bio || "",
        website: parsedUser.website || "",
        location: parsedUser.location || "",
      })
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSave = () => {
    // Update user data (in a real app, you'd send to API)
    const updatedUser = { ...user, ...formData }
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
    setIsEditing(false)
  }

  // Mock user articles
  const userArticles = [
    {
      id: 1,
      title: "Getting Started with React Hooks",
      excerpt: "A comprehensive guide to understanding and using React Hooks effectively.",
      publishedAt: "2024-01-15",
      tags: ["React", "JavaScript"],
      likes: 24,
      comments: 5,
      views: 156,
    },
    {
      id: 2,
      title: "Building RESTful APIs with Express",
      excerpt: "Learn how to create robust and scalable APIs using Express.js.",
      publishedAt: "2024-01-10",
      tags: ["Node.js", "Express"],
      likes: 18,
      comments: 3,
      views: 89,
    },
  ]

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt={user.name} />
                    <AvatarFallback className="text-2xl">{user.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isEditing ? (
                  <>
                    {user.bio && (
                      <div>
                        <Label className="text-sm font-medium">Bio</Label>
                        <p className="text-sm text-muted-foreground mt-1">{user.bio}</p>
                      </div>
                    )}
                    {user.location && (
                      <div>
                        <Label className="text-sm font-medium">Location</Label>
                        <p className="text-sm text-muted-foreground mt-1">{user.location}</p>
                      </div>
                    )}
                    {user.website && (
                      <div>
                        <Label className="text-sm font-medium">Website</Label>
                        <p className="text-sm text-muted-foreground mt-1">{user.website}</p>
                      </div>
                    )}
                    <Button onClick={() => setIsEditing(true)} className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange} rows={3} />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" name="location" value={formData.location} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" name="website" value={formData.website} onChange={handleInputChange} />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} className="flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Articles</span>
                  <span className="font-semibold">{userArticles.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Likes</span>
                  <span className="font-semibold">{userArticles.reduce((sum, article) => sum + article.likes, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Views</span>
                  <span className="font-semibold">{userArticles.reduce((sum, article) => sum + article.views, 0)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="articles" className="space-y-4">
              <TabsList>
                <TabsTrigger value="articles">Articles</TabsTrigger>
                <TabsTrigger value="liked">Liked</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="articles" className="space-y-4">
                {userArticles.map((article) => (
                  <Card key={article.id}>
                    <CardHeader>
                      <CardTitle className="text-xl">{article.title}</CardTitle>
                      <CardDescription>{article.excerpt}</CardDescription>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>Published {new Date(article.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{article.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{article.comments}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{article.views}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="liked">
                <Card>
                  <CardHeader>
                    <CardTitle>Liked Articles</CardTitle>
                    <CardDescription>Articles you've liked will appear here</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">No liked articles yet.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={user.email} disabled />
                    </div>
                    <Button variant="outline">Change Password</Button>
                    <Button variant="destructive">Delete Account</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
