import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { fetchHomeFeed } from '../instagramSlice'
import Post from './Post'

export default function Feed() {
  const dispatch = useAppDispatch()
  const posts = useAppSelector((state) => state.instagram.homeFeed)
  const isLoading = useAppSelector((state) => state.instagram.isLoading)
  const error = useAppSelector((state) => state.instagram.error)

  useEffect(() => {
    dispatch(fetchHomeFeed())
  }, [dispatch])

  if (isLoading && posts.length === 0) {
    return (
      <div className="flex justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500 mb-4">{typeof error === 'string' ? error : 'Failed to load feed'}</p>
        <button
          onClick={() => dispatch(fetchHomeFeed())}
          className="text-primary hover:underline"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No posts yet. Follow users to see their posts!</p>
        </div>
      )}
    </div>
  )
}
