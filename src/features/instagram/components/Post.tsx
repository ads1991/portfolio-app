import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleLike, addComment, toggleBookmark, fetchComments } from '../instagramSlice'
import type { Post as PostType } from '../instagramSlice'
import { cn } from '@/lib/utils'

interface PostProps {
  post: PostType
}

export default function Post({ post }: PostProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentUser = useAppSelector((state) => state.auth.user)
  const comments = useAppSelector((state) => state.instagram.postComments[post.id] || [])
  const [comment, setComment] = useState('')
  const [showComments, setShowComments] = useState(false)

  useEffect(() => {
    if (showComments && !comments.length && post.commentsCount > 0) {
      dispatch(fetchComments(post.id))
    }
  }, [showComments, post.id, post.commentsCount, comments.length, dispatch])

  if (!currentUser) return null

  const handleLike = () => {
    dispatch(toggleLike({ postId: post.id, isLiked: post.isLiked }))
  }

  const handleBookmark = () => {
    dispatch(toggleBookmark({ postId: post.id, isBookmarked: post.isBookmarked }))
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (comment.trim()) {
      await dispatch(addComment({ postId: post.id, text: comment }))
      setComment('')
    }
  }

  const handleUsernameClick = () => {
    navigate(`/instagram/profile/${post.userId}`)
  }

  const handlePostClick = () => {
    navigate(`/instagram/post/${post.id}`)
  }

  const timeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <div className="bg-card border rounded-lg overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <img
            src={post.userAvatar}
            alt={post.username}
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
            onClick={handleUsernameClick}
          />
          <span
            className="font-semibold text-sm cursor-pointer hover:text-muted-foreground"
            onClick={handleUsernameClick}
          >
            {post.username}
          </span>
        </div>
        <button className="hover:text-muted-foreground transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Post Image */}
      <div className="aspect-square bg-muted cursor-pointer" onClick={handlePostClick}>
        <img
          src={post.imageUrl}
          alt="Post"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Post Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={cn(
                'hover:text-muted-foreground transition-colors',
                post.isLiked && 'text-red-500'
              )}
            >
              <Heart className={cn('w-6 h-6', post.isLiked && 'fill-current')} />
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="hover:text-muted-foreground transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
            <button className="hover:text-muted-foreground transition-colors">
              <Send className="w-6 h-6" />
            </button>
          </div>
          <button
            onClick={handleBookmark}
            className={cn(
              'hover:text-muted-foreground transition-colors',
              post.isBookmarked && 'text-primary'
            )}
          >
            <Bookmark className={cn('w-6 h-6', post.isBookmarked && 'fill-current')} />
          </button>
        </div>

        {/* Likes Count */}
        <div className="font-semibold text-sm mb-2">{post.likes} likes</div>

        {/* Caption */}
        <div className="text-sm mb-2">
          <span className="font-semibold mr-2">{post.username}</span>
          <span>{post.caption}</span>
        </div>

        {/* View Comments */}
        {post.commentsCount > 0 && !showComments && (
          <button
            onClick={() => setShowComments(true)}
            className="text-sm text-muted-foreground mb-2"
          >
            View all {post.commentsCount} comments
          </button>
        )}

        {/* Comments */}
        {showComments && comments.length > 0 && (
          <div className="space-y-2 mb-2">
            {comments.map((comment) => (
              <div key={comment.id} className="text-sm">
                <span className="font-semibold mr-2">{comment.username}</span>
                <span>{comment.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <div className="text-xs text-muted-foreground mb-3">{timeAgo(post.timestamp)}</div>

        {/* Add Comment */}
        <form onSubmit={handleComment} className="flex items-center gap-2 border-t pt-3">
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
          />
          {comment.trim() && (
            <button type="submit" className="text-primary font-semibold text-sm">
              Post
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
