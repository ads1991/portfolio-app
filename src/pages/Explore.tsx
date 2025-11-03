import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { fetchExploreFeed } from '@/features/instagram/instagramSlice'
import { X, Heart, MessageCircle } from 'lucide-react'
import type { Post as PostType } from '@/features/instagram/instagramSlice'

export default function Explore() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const posts = useAppSelector((state) => state.instagram.exploreFeed)
  const isLoading = useAppSelector((state) => state.instagram.isLoading)
  const [expandedPost, setExpandedPost] = useState<PostType | null>(null)
  const [pressTimer, setPressTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    dispatch(fetchExploreFeed())
  }, [dispatch])

  const handlePostClick = (postId: string) => {
    if (pressTimer) {
      clearTimeout(pressTimer)
      setPressTimer(null)
    }
    navigate(`/instagram/post/${postId}`)
  }

  const handleMouseDown = (post: PostType) => {
    const timer = setTimeout(() => {
      setExpandedPost(post)
    }, 500) // 500ms long press
    setPressTimer(timer)
  }

  const handleMouseUp = (post: PostType) => {
    if (pressTimer) {
      clearTimeout(pressTimer)
      setPressTimer(null)
      // Navigate to post detail on regular click
      handlePostClick(post.id)
    }
  }

  const handleMouseLeave = () => {
    if (pressTimer) {
      clearTimeout(pressTimer)
      setPressTimer(null)
    }
  }

  const closeExpanded = () => {
    setExpandedPost(null)
  }

  if (isLoading && posts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold mb-6">Explore</h2>

        {posts.length > 0 ? (
          <div className="grid grid-cols-3 gap-1">
            {posts.map((post) => (
              <div
                key={post.id}
                className="aspect-square bg-muted cursor-pointer relative group"
                onMouseDown={() => handleMouseDown(post)}
                onMouseUp={() => handleMouseUp(post)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <Heart className="w-6 h-6 fill-current" />
                    <span className="font-semibold">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-6 h-6 fill-current" />
                    <span className="font-semibold">{post.commentsCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No posts to explore yet!</p>
          </div>
        )}
      </div>

      {/* Expanded Post Modal */}
      {expandedPost && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8"
          onClick={closeExpanded}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            onClick={closeExpanded}
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="relative max-w-5xl max-h-[85vh] bg-card rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={expandedPost.imageUrl}
              alt={expandedPost.caption}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}
