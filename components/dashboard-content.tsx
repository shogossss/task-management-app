"use client"

import { useState } from "react"
import { CheckCircle2, Clock, MoreHorizontal, Plus, Search, XCircle } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data
const projects = [
  {
    id: 1,
    name: "ウェブサイトリニューアル",
    progress: 75,
    tasks: { total: 24, completed: 18 },
    dueDate: "2024-04-15",
    members: [
      { id: 1, name: "田中", image: "/placeholder.svg?height=32&width=32" },
      { id: 2, name: "佐藤", image: "/placeholder.svg?height=32&width=32" },
      { id: 3, name: "鈴木", image: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: 2,
    name: "モバイルアプリ開発",
    progress: 45,
    tasks: { total: 32, completed: 14 },
    dueDate: "2024-05-20",
    members: [
      { id: 2, name: "佐藤", image: "/placeholder.svg?height=32&width=32" },
      { id: 4, name: "高橋", image: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: 3,
    name: "マーケティングキャンペーン",
    progress: 90,
    tasks: { total: 18, completed: 16 },
    dueDate: "2024-04-05",
    members: [
      { id: 1, name: "田中", image: "/placeholder.svg?height=32&width=32" },
      { id: 5, name: "渡辺", image: "/placeholder.svg?height=32&width=32" },
    ],
  },
]

const tasks = [
  {
    id: 1,
    title: "デザインレビュー",
    project: "ウェブサイトリニューアル",
    status: "進行中",
    priority: "高",
    dueDate: "2024-03-28",
    assignee: { id: 1, name: "田中", image: "/placeholder.svg?height=32&width=32" },
  },
  {
    id: 2,
    title: "API統合",
    project: "モバイルアプリ開発",
    status: "未着手",
    priority: "中",
    dueDate: "2024-04-10",
    assignee: { id: 2, name: "佐藤", image: "/placeholder.svg?height=32&width=32" },
  },
  {
    id: 3,
    title: "SNS投稿スケジュール作成",
    project: "マーケティングキャンペーン",
    status: "完了",
    priority: "低",
    dueDate: "2024-03-25",
    assignee: { id: 5, name: "渡辺", image: "/placeholder.svg?height=32&width=32" },
  },
  {
    id: 4,
    title: "ユーザーテスト",
    project: "ウェブサイトリニューアル",
    status: "進行中",
    priority: "高",
    dueDate: "2024-04-05",
    assignee: { id: 3, name: "鈴木", image: "/placeholder.svg?height=32&width=32" },
  },
  {
    id: 5,
    title: "バグ修正",
    project: "モバイルアプリ開発",
    status: "進行中",
    priority: "高",
    dueDate: "2024-03-30",
    assignee: { id: 4, name: "高橋", image: "/placeholder.svg?height=32&width=32" },
  },
]

export function DashboardContent() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <>
      <header className="flex h-16 items-center gap-4 border-b px-6">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">ダッシュボード</h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="検索..." className="w-64 rounded-lg pl-8" />
          </div>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="ユーザー" />
            <AvatarFallback>PM</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">こんにちは、プロジェクトマネージャーさん 👋</h2>
          <p className="text-muted-foreground">今日のタスクとプロジェクトの概要を確認しましょう。</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList>
            <TabsTrigger value="overview">概要</TabsTrigger>
            <TabsTrigger value="tasks">タスク</TabsTrigger>
            <TabsTrigger value="projects">プロジェクト</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">総タスク数</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">74</div>
                  <p className="text-xs text-muted-foreground">前週比 +12%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">完了タスク</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">48</div>
                  <p className="text-xs text-muted-foreground">前週比 +8%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">進行中プロジェクト</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">前月比 +1</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">期限超過タスク</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">前週比 -2</p>
                </CardContent>
              </Card>
            </div>

            <h3 className="text-lg font-semibold">最近のタスク</h3>
            <div className="space-y-2">
              {tasks.slice(0, 3).map((task) => (
                <Card key={task.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {task.status === "完了" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : task.status === "進行中" ? (
                          <Clock className="h-5 w-5 text-blue-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-400" />
                        )}
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-muted-foreground">{task.project}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge
                          variant={
                            task.priority === "高" ? "destructive" : task.priority === "中" ? "default" : "outline"
                          }
                        >
                          {task.priority}
                        </Badge>
                        <div className="text-sm">{task.dueDate}</div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={task.assignee.image} alt={task.assignee.name} />
                          <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">メニュー</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>アクション</DropdownMenuLabel>
                            <DropdownMenuItem>詳細を見る</DropdownMenuItem>
                            <DropdownMenuItem>編集する</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>完了としてマーク</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">削除</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h3 className="text-lg font-semibold">プロジェクト進捗</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>
                      期限: {project.dueDate} · タスク: {project.tasks.completed}/{project.tasks.total}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span>進捗</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex -space-x-2">
                      {project.members.map((member) => (
                        <Avatar key={member.id} className="border-2 border-background">
                          <AvatarImage src={member.image} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <Button variant="outline" size="sm">
                      詳細
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="tasks" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">すべてのタスク</h3>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                新しいタスク
              </Button>
            </div>
            <Separator />
            <div className="space-y-2">
              {tasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {task.status === "完了" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : task.status === "進行中" ? (
                          <Clock className="h-5 w-5 text-blue-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-400" />
                        )}
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-muted-foreground">{task.project}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge
                          variant={
                            task.priority === "高" ? "destructive" : task.priority === "中" ? "default" : "outline"
                          }
                        >
                          {task.priority}
                        </Badge>
                        <div className="text-sm">{task.dueDate}</div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={task.assignee.image} alt={task.assignee.name} />
                          <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">メニュー</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>アクション</DropdownMenuLabel>
                            <DropdownMenuItem>詳細を見る</DropdownMenuItem>
                            <DropdownMenuItem>編集する</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>完了としてマーク</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">削除</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="projects" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">すべてのプロジェクト</h3>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                新しいプロジェクト
              </Button>
            </div>
            <Separator />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>
                      期限: {project.dueDate} · タスク: {project.tasks.completed}/{project.tasks.total}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span>進捗</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex -space-x-2">
                      {project.members.map((member) => (
                        <Avatar key={member.id} className="border-2 border-background">
                          <AvatarImage src={member.image} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <Button variant="outline" size="sm">
                      詳細
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}

