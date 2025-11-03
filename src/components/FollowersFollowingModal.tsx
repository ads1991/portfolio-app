import { useState, useEffect } from 'react'
import { X, UserPlus, UserCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { userAPI, socialAPI } from '@/services/instagram.api'
import type { UserProfileResponse } from '@/services/instagram.api'
import { useAppSelector } from '@/store/hooks'

interface FollowersFollowingModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
  initialTab: 'followers' | 'following'
}

export default function FollowersFollowingModal({
  isOpen,
  onClose,
  userId,
  initialTab,
}: FollowersFollowingModalProps) {
  const navigate = useNavigate()
  const currentUser = useAppSelector((state) => state.auth.user)
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>(initialTab)
  const [followers, setFollowers] = useState<UserProfileResponse[]>([])
  const [following, setFollowing] = useState<UserProfileResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab)
      loadData()
    }
  }, [isOpen, initialTab, userId])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [followersData, followingData] = await Promise.all([
        userAPI.getFollowers(userId),
        userAPI.getFollowing(userId),
      ])
      setFollowers(followersData)
      setFollowing(followingData)
    } catch (error) {
      console.error('Failed to load followers/following:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFollow = async (targetUserId: number) => {
    try {
      await socialAPI.followUser(String(targetUserId))
      // Update local state
      setFollowers(prev => prev.map(u =>
        u.id === targetUserId ? { ...u, is_following: true } : u
      ))
      setFollowing(prev => prev.map(u =>
        u.id === targetUserId ? { ...u, is_following: true } : u
      ))
    } catch (error) {
      console.error('Failed to follow user:', error)
    }
  }

  const handleUnfollow = async (targetUserId: number) => {
    try {
      await socialAPI.unfollowUser(String(targetUserId))
      // Update local state
      setFollowers(prev => prev.map(u =>
        u.id === targetUserId ? { ...u, is_following: false } : u
      ))
      setFollowing(prev => prev.map(u =>
        u.id === targetUserId ? { ...u, is_following: false } : u
      ))
    } catch (error) {
      console.error('Failed to unfollow user:', error)
    }
  }

  const UserItem = ({ user }: { user: UserProfileResponse }) => (
    <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
      <div
        className="flex items-center gap-3 flex-1 cursor-pointer"
        onClick={() => {
          navigate(`/instagram/profile/${user.id}`)
          onClose()
        }}
      >
        <img
          src={user.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{user.name}</p>
          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
        </div>
      </div>

      {currentUser && user.id !== currentUser.id && (
        <button
          onClick={() => user.is_following ? handleUnfollow(user.id) : handleFollow(user.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
            user.is_following
              ? 'bg-muted hover:bg-muted/80'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
        >
          {user.is_following ? (
            <>
              <UserCheck className="w-4 h-4" />
              Following
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              Follow
            </>
          )}
        </button>
      )}
    </div>
  )

  if (!isOpen) return null

  const displayList = activeTab === 'followers' ? followers : following

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg max-w-md w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('followers')}
              className={`font-semibold ${
                activeTab === 'followers'
                  ? 'text-foreground border-b-2 border-primary'
                  : 'text-muted-foreground'
              }`}
            >
              Followers ({followers.length})
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`font-semibold ${
                activeTab === 'following'
                  ? 'text-foreground border-b-2 border-primary'
                  : 'text-muted-foreground'
              }`}
            >
              Following ({following.length})
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : displayList.length > 0 ? (
            <div className="divide-y">
              {displayList.map((user) => (
                <UserItem key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {activeTab === 'followers' ? 'No followers yet' : 'Not following anyone yet'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
