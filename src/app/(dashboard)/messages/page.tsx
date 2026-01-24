import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { EmptyState } from "@/components/shared/empty-state"
import { UserAvatar } from "@/components/shared/user-avatar"
import { MessageSquare } from "lucide-react"
import Link from "next/link"
import { formatTimeAgo } from "@/lib/utils/format-date"

export const metadata = {
  title: "Berichten",
}

export default async function MessagesPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // Get conversations for this user
  const { data: participations } = await supabase
    .from("conversation_participants")
    .select(`
      conversation_id,
      last_read_at,
      conversation:conversations (
        id,
        updated_at,
        studio:studios (title),
        booking:bookings (booking_number)
      )
    `)
    .eq("user_id", user.id)
    .order("conversation(updated_at)", { ascending: false })

  // Get the latest message and other participant for each conversation
  const conversationsWithDetails = await Promise.all(
    (participations || []).map(async (p) => {
      // Get other participant
      const { data: otherParticipant } = await supabase
        .from("conversation_participants")
        .select(`
          user:users (id, full_name, avatar_url)
        `)
        .eq("conversation_id", p.conversation_id)
        .neq("user_id", user.id)
        .single()

      // Get latest message
      const { data: latestMessage } = await supabase
        .from("messages")
        .select("content, created_at, sender_id")
        .eq("conversation_id", p.conversation_id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single()

      // Count unread messages
      const { count: unreadCount } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("conversation_id", p.conversation_id)
        .neq("sender_id", user.id)
        .gt("created_at", p.last_read_at || "1970-01-01")

      return {
        ...p,
        otherUser: otherParticipant?.user,
        latestMessage,
        unreadCount: unreadCount || 0,
      }
    })
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Berichten</h1>
        <p className="text-muted-foreground mt-1">
          Chat met hosts en huurders
        </p>
      </div>

      {conversationsWithDetails.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="Geen berichten"
          description="Start een gesprek door contact op te nemen met een host"
          actionLabel="Ontdek studios"
          actionHref="/studios"
        />
      ) : (
        <div className="space-y-2">
          {conversationsWithDetails.map((conv) => (
            <Link key={conv.conversation_id} href={`/messages/${conv.conversation_id}`}>
              <Card className="hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <UserAvatar
                        src={conv.otherUser?.avatar_url}
                        name={conv.otherUser?.full_name}
                        size="lg"
                      />
                      {conv.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold truncate">
                          {conv.otherUser?.full_name || "Gebruiker"}
                        </p>
                        {conv.latestMessage && (
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(conv.latestMessage.created_at)}
                          </span>
                        )}
                      </div>
                      {conv.conversation?.studio && (
                        <p className="text-sm text-muted-foreground">
                          {conv.conversation.studio.title}
                        </p>
                      )}
                      {conv.latestMessage && (
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          {conv.latestMessage.sender_id === user.id ? "Jij: " : ""}
                          {conv.latestMessage.content}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
