import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import {
  fetchUserProfile,
  fetchUserPosts,
  fetchBookmarks,
  followUser,
  unfollowUser,
} from '@/features/instagram/instagramSlice'
import { Grid, Bookmark } from 'lucide-react'
import FollowersFollowingModal from '@/components/FollowersFollowingModal'

export default function Profile() {
  const { userId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentUser = useAppSelector((state) => state.auth.user)
  const userProfiles = useAppSelector((state) => state.instagram.userProfiles)
  const userPosts = useAppSelector((state) => state.instagram.userPosts)
  const bookmarks = useAppSelector((state) => state.instagram.bookmarks)
  const isLoading = useAppSelector((state) => state.instagram.isLoading)
  const [activeTab, setActiveTab] = useState<'posts' | 'bookmarks'>('posts')
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false)
  const [followModalTab, setFollowModalTab] = useState<'followers' | 'following'>('followers')

  // Determine which user profile to show
  const isOwnProfile = !userId || userId === String(currentUser?.id)
  const targetUserId = isOwnProfile ? String(currentUser?.id) : userId

  const profileUser = targetUserId ? userProfiles[targetUserId] : null

  useEffect(() => {
    if (targetUserId) {
      // Fetch user profile
      if (!userProfiles[targetUserId]) {
        dispatch(fetchUserProfile(targetUserId))
      }
      // Fetch user posts
      dispatch(fetchUserPosts(targetUserId))

      // Fetch bookmarks if it's own profile
      if (isOwnProfile) {
        dispatch(fetchBookmarks())
      }
    }
  }, [targetUserId, dispatch, isOwnProfile, userProfiles])

  if (!currentUser) {
    return null
  }

  if (isLoading && !profileUser) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!profileUser) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">User not found</p>
      </div>
    )
  }

  const posts = targetUserId ? userPosts[targetUserId] || [] : []

  const handleFollowToggle = async () => {
    if (!targetUserId) return

    if (profileUser.isFollowing) {
      await dispatch(unfollowUser(targetUserId))
    } else {
      await dispatch(followUser(targetUserId))
    }

    // Refresh user profile to get updated counts
    dispatch(fetchUserProfile(targetUserId))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex items-start gap-20 mb-12">
        <img
          src={profileUser.avatar}
          alt={profileUser.username}
          className="w-36 h-36 rounded-full object-cover"
        />

        <div className="flex-1">
          <div className="flex items-center gap-6 mb-6">
            <h1 className="text-2xl font-light">{profileUser.username}</h1>
            {!isOwnProfile && (
              <button
                onClick={handleFollowToggle}
                className={`px-6 py-1.5 rounded-lg font-semibold text-sm transition-colors ${
                  profileUser.isFollowing
                    ? 'bg-muted hover:bg-muted/80'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {profileUser.isFollowing ? 'Following' : 'Follow'}
              </button>
            )}
          </div>

          <div className="flex gap-10 mb-6">
            <div>
              <span className="font-semibold">{profileUser.postsCount}</span>
              <span className="text-muted-foreground ml-1">posts</span>
            </div>
            <button
              onClick={() => {
                setFollowModalTab('followers')
                setIsFollowModalOpen(true)
              }}
              className="hover:text-muted-foreground transition-colors"
            >
              <span className="font-semibold">{profileUser.followersCount}</span>
              <span className="text-muted-foreground ml-1">followers</span>
            </button>
            <button
              onClick={() => {
                setFollowModalTab('following')
                setIsFollowModalOpen(true)
              }}
              className="hover:text-muted-foreground transition-colors"
            >
              <span className="font-semibold">{profileUser.followingCount}</span>
              <span className="text-muted-foreground ml-1">following</span>
            </button>
          </div>

          <div>
            <p className="font-semibold mb-1">{profileUser.fullName}</p>
            <p className="text-sm">{profileUser.bio}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t">
        <div className="flex justify-center gap-16">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex items-center gap-2 py-4 text-xs font-semibold tracking-wider border-t ${
              activeTab === 'posts'
                ? 'border-foreground'
                : 'border-transparent text-muted-foreground'
            }`}
          >
            <Grid className="w-4 h-4" />
            POSTS
          </button>
          {isOwnProfile && (
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`flex items-center gap-2 py-4 text-xs font-semibold tracking-wider border-t ${
                activeTab === 'bookmarks'
                  ? 'border-foreground'
                  : 'border-transparent text-muted-foreground'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              BOOKMARKS
            </button>
          )}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1 mt-4">
        {activeTab === 'posts' &&
          posts.map((post) => (
            <div
              key={post.id}
              className="aspect-square bg-muted cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => navigate(`/instagram/post/${post.id}`)}
            >
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

        {activeTab === 'bookmarks' &&
          bookmarks.map((post) => (
            <div
              key={post.id}
              className="aspect-square bg-muted cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => navigate(`/instagram/post/${post.id}`)}
            >
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
      </div>

      {/* Empty States */}
      {activeTab === 'posts' && posts.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No posts yet</p>
        </div>
      )}

      {activeTab === 'bookmarks' && bookmarks.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No bookmarks yet</p>
        </div>
      )}

      {/* Followers/Following Modal */}
      <FollowersFollowingModal
        isOpen={isFollowModalOpen}
        onClose={() => setIsFollowModalOpen(false)}
        userId={targetUserId || ''}
        initialTab={followModalTab}
      />
    </div>
  )
}
