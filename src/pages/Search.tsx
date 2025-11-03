import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search as SearchIcon, UserPlus, UserCheck } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { userAPI, socialAPI } from '@/services/instagram.api'
import type { UserProfileResponse } from '@/services/instagram.api'

export default function Search() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.auth.user)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<UserProfileResponse[]>([])
  const [recommendations, setRecommendations] = useState<UserProfileResponse[]>([])
  const [followingIds, setFollowingIds] = useState<Set<number>>(new Set())
  const [isSearching, setIsSearching] = useState(false)
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true)

  // Load recommendations on mount
  useEffect(() => {
    loadRecommendations()
  }, [])

  const loadRecommendations = async () => {
    try {
      setIsLoadingRecommendations(true)

      // Get current user's following list
      if (currentUser) {
        const following = await userAPI.getFollowing(String(currentUser.id))
        const followingIdSet = new Set(following.map(u => u.id))
        setFollowingIds(followingIdSet)

        // Search for users with empty query returns all users
        // We'll filter out already followed users and current user
        const allUsers = await userAPI.searchUsers('')
        const recommended = allUsers
          .filter(user => user.id !== currentUser.id && !followingIdSet.has(user.id))
          .slice(0, 10)

        setRecommendations(recommended)
      }
    } catch (error) {
      console.error('Failed to load recommendations:', error)
    } finally {
      setIsLoadingRecommendations(false)
    }
  }

  // Search users with debounce
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([])
      return
    }

    const timer = setTimeout(async () => {
      try {
        setIsSearching(true)
        const results = await userAPI.searchUsers(searchQuery)
        setSearchResults(results.filter(user => user.id !== currentUser?.id))
      } catch (error) {
        console.error('Search failed:', error)
      } finally {
        setIsSearching(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, currentUser])

  const handleFollow = async (userId: number) => {
    try {
      await socialAPI.followUser(String(userId))
      setFollowingIds(prev => new Set(prev).add(userId))

      // Update recommendations and search results
      setRecommendations(prev => prev.filter(u => u.id !== userId))
      setSearchResults(prev => prev.map(u =>
        u.id === userId ? { ...u, is_following: true } : u
      ))
    } catch (error) {
      console.error('Failed to follow user:', error)
    }
  }

  const handleUnfollow = async (userId: number) => {
    try {
      await socialAPI.unfollowUser(String(userId))
      setFollowingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(userId)
        return newSet
      })

      setSearchResults(prev => prev.map(u =>
        u.id === userId ? { ...u, is_following: false } : u
      ))
    } catch (error) {
      console.error('Failed to unfollow user:', error)
    }
  }

  const isFollowing = (userId: number) => followingIds.has(userId)

  const UserCard = ({ user }: { user: UserProfileResponse }) => (
    <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
      <div
        className="flex items-center gap-3 flex-1 cursor-pointer"
        onClick={() => navigate(`/instagram/profile/${user.id}`)}
      >
        <img
          src={user.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{user.name}</p>
          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
          {user.bio && (
            <p className="text-sm text-muted-foreground truncate">{user.bio}</p>
          )}
        </div>
      </div>

      <button
        onClick={() => isFollowing(user.id) ? handleUnfollow(user.id) : handleFollow(user.id)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
          isFollowing(user.id)
            ? 'bg-muted hover:bg-muted/80'
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
        }`}
      >
        {isFollowing(user.id) ? (
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
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Search Input */}
      <div className="mb-8">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-muted border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Search Results */}
      {searchQuery.trim() !== '' && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Search Results</h2>
          {isSearching ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="bg-card rounded-lg border divide-y">
              {searchResults.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No users found</p>
            </div>
          )}
        </div>
      )}

      {/* Recommendations */}
      {searchQuery.trim() === '' && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Suggested For You</h2>
          {isLoadingRecommendations ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : recommendations.length > 0 ? (
            <div className="bg-card rounded-lg border divide-y">
              {recommendations.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No more users to follow</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
