import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { X, Heart, MessageCircle, Bookmark, MoreHorizontal, Trash2, Send } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleLike, addComment, toggleBookmark, fetchComments, deletePost as deletePostAction } from '@/features/instagram/instagramSlice'
import { postAPI } from '@/services/instagram.api'
import type { PostResponse } from '@/services/instagram.api'
import { cn } from '@/lib/utils'

export default function PostDetail() {
  const { postId } = useParams<{ postId: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.auth.user)
  const comments = useAppSelector((state) => postId ? state.instagram.postComments[postId] || [] : [])

  const [post, setPost] = useState<PostResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const [showMenu, setShowMenu] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (postId) {
      loadPost()
      dispatch(fetchComments(postId))
    }
  }, [postId])

  const loadPost = async () => {
    if (!postId) return

    try {
      setLoading(true)
      const data = await postAPI.getPost(postId)
      setPost(data)
    } catch (error) {
      console.error('Failed to load post:', error)
      navigate('/instagram')
    } finally {
      setLoading(false)
    }
  }

  if (!currentUser || !postId) {
    navigate('/instagram')
    return null
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!post) return null

  const isOwner = currentUser.id === post.author_id

  const handleLike = () => {
    if (!postId) return
    dispatch(toggleLike({ postId, isLiked: post.is_liked }))
    setPost({ ...post, is_liked: !post.is_liked, likes_count: post.is_liked ? post.likes_count - 1 : post.likes_count + 1 })
  }

  const handleBookmark = () => {
    if (!postId) return
    dispatch(toggleBookmark({ postId, isBookmarked: post.is_bookmarked }))
    setPost({ ...post, is_bookmarked: !post.is_bookmarked })
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!postId || !comment.trim()) return
    await dispatch(addComment({ postId, text: comment }))
    setComment('')
    setPost({ ...post, comments_count: post.comments_count + 1 })
  }

  const handleDelete = async () => {
    if (!postId || !window.confirm('Are you sure you want to delete this post?')) return

    try {
      setDeleting(true)
      await dispatch(deletePostAction(postId))
      navigate('/instagram')
    } catch (error) {
      console.error('Failed to delete post:', error)
      alert('Failed to delete post')
    } finally {
      setDeleting(false)
    }
  }

  const handleUsernameClick = () => {
    navigate(`/instagram/profile/${post.author_id}`)
  }

  const handleClose = () => {
    navigate(-1)
  }

  const timeAgo = (timestamp: string) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-card max-w-5xl w-full max-h-[90vh] rounded-xl overflow-hidden flex flex-col md:flex-row border-2 border-border shadow-2xl">
        {/* Image Section */}
        <div className="md:w-3/5 bg-black flex items-center justify-center">
          <img
            src={post.image_url}
            alt="Post"
            className="w-full h-full object-contain max-h-[90vh]"
          />
        </div>

        {/* Content Section */}
        <div className="md:w-2/5 flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <img
                src={post.author.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author.name}`}
                alt={post.author.name}
                className="w-8 h-8 rounded-full object-cover cursor-pointer"
                onClick={handleUsernameClick}
              />
              <span
                className="font-semibold text-sm cursor-pointer hover:text-muted-foreground"
                onClick={handleUsernameClick}
              >
                {post.author.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {isOwner && (
                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="hover:text-muted-foreground transition-colors"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-popover border rounded-lg shadow-lg py-1 z-10">
                      <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-accent flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        {deleting ? 'Deleting...' : 'Delete Post'}
                      </button>
                    </div>
                  )}
                </div>
              )}
              <button onClick={handleClose} className="hover:text-muted-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Caption */}
            {post.caption && (
              <div className="flex gap-3">
                <img
                  src={post.author.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author.name}`}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="text-sm">
                    <span className="font-semibold mr-2">{post.author.name}</span>
                    <span>{post.caption}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{timeAgo(post.created_at)}</div>
                </div>
              </div>
            )}

            {/* Comments */}
            {comments.length > 0 && (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <img
                      src={comment.userAvatar}
                      alt={comment.username}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="text-sm">
                        <span className="font-semibold mr-2">{comment.username}</span>
                        <span>{comment.text}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{timeAgo(new Date(comment.timestamp).toISOString())}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {comments.length === 0 && !post.caption && (
              <div className="text-center text-muted-foreground text-sm py-8">
                No comments yet. Be the first to comment!
              </div>
            )}
          </div>

          {/* Actions Section */}
          <div className="border-t p-4 space-y-3">
            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={cn(
                    'hover:text-muted-foreground transition-colors',
                    post.is_liked && 'text-red-500'
                  )}
                >
                  <Heart className={cn('w-6 h-6', post.is_liked && 'fill-current')} />
                </button>
                <button className="hover:text-muted-foreground transition-colors">
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
                  post.is_bookmarked && 'text-primary'
                )}
              >
                <Bookmark className={cn('w-6 h-6', post.is_bookmarked && 'fill-current')} />
              </button>
            </div>

            {/* Likes Count */}
            <div className="font-semibold text-sm">{post.likes_count} likes</div>

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
      </div>
    </div>
  )
}
