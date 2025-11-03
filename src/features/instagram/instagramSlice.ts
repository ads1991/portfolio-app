import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { feedAPI, postAPI, interactionAPI, socialAPI, userAPI } from '@/services/instagram.api'
import type { PostResponse, CommentResponse, UserProfileResponse } from '@/services/instagram.api'

// Transform API response to internal Post format
const transformPost = (apiPost: PostResponse): Post => ({
  id: String(apiPost.id),
  userId: String(apiPost.author_id),
  username: apiPost.author.name,
  userAvatar: apiPost.author.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${apiPost.author.name}`,
  imageUrl: apiPost.image_url,
  caption: apiPost.caption,
  likes: apiPost.likes_count,
  commentsCount: apiPost.comments_count,
  timestamp: new Date(apiPost.created_at).getTime(),
  isLiked: apiPost.is_liked,
  isBookmarked: apiPost.is_bookmarked,
})

// Transform API comment to internal format
const transformComment = (apiComment: CommentResponse): Comment => ({
  id: String(apiComment.id),
  userId: String(apiComment.author_id),
  username: apiComment.author.name,
  userAvatar: apiComment.author.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${apiComment.author.name}`,
  text: apiComment.content,
  timestamp: new Date(apiComment.created_at).getTime(),
})

export interface Post {
  id: string
  userId: string
  username: string
  userAvatar: string
  imageUrl: string
  caption: string
  likes: number
  commentsCount: number
  timestamp: number
  isLiked: boolean
  isBookmarked: boolean
}

export interface Comment {
  id: string
  userId: string
  username: string
  userAvatar: string
  text: string
  timestamp: number
}

export interface User {
  id: string
  username: string
  fullName: string
  avatar: string
  bio: string
  followersCount: number
  followingCount: number
  postsCount: number
  isFollowing?: boolean
}

interface InstagramState {
  homeFeed: Post[]
  exploreFeed: Post[]
  bookmarks: Post[]
  userPosts: { [userId: string]: Post[] }
  userProfiles: { [userId: string]: User }
  postComments: { [postId: string]: Comment[] }
  isLoading: boolean
  error: string | null
}

const initialState: InstagramState = {
  homeFeed: [],
  exploreFeed: [],
  bookmarks: [],
  userPosts: {},
  userProfiles: {},
  postComments: {},
  isLoading: false,
  error: null,
}

// Async Thunks

// Feed operations
export const fetchHomeFeed = createAsyncThunk(
  'instagram/fetchHomeFeed',
  async (_, { rejectWithValue }) => {
    try {
      const posts = await feedAPI.getHomeFeed()
      return posts.map(transformPost)
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch home feed')
    }
  }
)

export const fetchExploreFeed = createAsyncThunk(
  'instagram/fetchExploreFeed',
  async (_, { rejectWithValue }) => {
    try {
      const posts = await feedAPI.getExploreFeed()
      return posts.map(transformPost)
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch explore feed')
    }
  }
)

export const fetchBookmarks = createAsyncThunk(
  'instagram/fetchBookmarks',
  async (_, { rejectWithValue }) => {
    try {
      const posts = await feedAPI.getBookmarks()
      return posts.map(transformPost)
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch bookmarks')
    }
  }
)

// Post operations
export const createPost = createAsyncThunk(
  'instagram/createPost',
  async ({ image, caption }: { image: File; caption: string }, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('caption', caption)

      const post = await postAPI.createPost(formData)
      return transformPost(post)
    } catch (error: any) {
      const detail = error.response?.data?.detail
      let errorMessage = 'Failed to create post'

      if (typeof detail === 'string') {
        errorMessage = detail
      } else if (Array.isArray(detail) && detail.length > 0) {
        errorMessage = detail[0].msg || detail[0].message || errorMessage
      }

      return rejectWithValue(errorMessage)
    }
  }
)

export const fetchUserPosts = createAsyncThunk(
  'instagram/fetchUserPosts',
  async (userId: string, { rejectWithValue }) => {
    try {
      const posts = await postAPI.getUserPosts(userId)
      return { userId, posts: posts.map(transformPost) }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch user posts')
    }
  }
)

export const deletePost = createAsyncThunk(
  'instagram/deletePost',
  async (postId: string, { rejectWithValue }) => {
    try {
      await postAPI.deletePost(postId)
      return postId
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to delete post')
    }
  }
)

// Interaction operations
export const toggleLike = createAsyncThunk(
  'instagram/toggleLike',
  async ({ postId, isLiked }: { postId: string; isLiked: boolean }, { rejectWithValue }) => {
    try {
      if (isLiked) {
        await interactionAPI.unlikePost(postId)
      } else {
        await interactionAPI.likePost(postId)
      }
      return { postId, isLiked: !isLiked }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to toggle like')
    }
  }
)

export const toggleBookmark = createAsyncThunk(
  'instagram/toggleBookmark',
  async ({ postId, isBookmarked }: { postId: string; isBookmarked: boolean }, { rejectWithValue }) => {
    try {
      if (isBookmarked) {
        await interactionAPI.removeBookmark(postId)
      } else {
        await interactionAPI.bookmarkPost(postId)
      }
      return { postId, isBookmarked: !isBookmarked }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to toggle bookmark')
    }
  }
)

export const addComment = createAsyncThunk(
  'instagram/addComment',
  async ({ postId, text }: { postId: string; text: string }, { rejectWithValue }) => {
    try {
      const comment = await interactionAPI.addComment(postId, text)
      return { postId, comment: transformComment(comment) }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to add comment')
    }
  }
)

export const fetchComments = createAsyncThunk(
  'instagram/fetchComments',
  async (postId: string, { rejectWithValue }) => {
    try {
      const comments = await interactionAPI.getComments(postId)
      return { postId, comments: comments.map(transformComment) }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch comments')
    }
  }
)

// Social operations
export const followUser = createAsyncThunk(
  'instagram/followUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      await socialAPI.followUser(userId)
      return userId
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to follow user')
    }
  }
)

export const unfollowUser = createAsyncThunk(
  'instagram/unfollowUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      await socialAPI.unfollowUser(userId)
      return userId
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to unfollow user')
    }
  }
)

// User operations
export const fetchUserProfile = createAsyncThunk(
  'instagram/fetchUserProfile',
  async (userId: string | number, { rejectWithValue }) => {
    try {
      const profile = await userAPI.getUserProfile(String(userId))
      const user: User = {
        id: String(profile.id),
        username: profile.name,
        fullName: profile.name,
        avatar: profile.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`,
        bio: profile.bio || '',
        followersCount: profile.followers_count,
        followingCount: profile.following_count,
        postsCount: profile.posts_count,
        isFollowing: profile.is_following,
      }
      return user
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch user profile')
    }
  }
)

const instagramSlice = createSlice({
  name: 'instagram',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Fetch home feed
    builder
      .addCase(fetchHomeFeed.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchHomeFeed.fulfilled, (state, action) => {
        state.isLoading = false
        state.homeFeed = action.payload
      })
      .addCase(fetchHomeFeed.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Fetch explore feed
    builder
      .addCase(fetchExploreFeed.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchExploreFeed.fulfilled, (state, action) => {
        state.isLoading = false
        state.exploreFeed = action.payload
      })
      .addCase(fetchExploreFeed.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Fetch bookmarks
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.isLoading = false
        state.bookmarks = action.payload
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Create post
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.homeFeed.unshift(action.payload)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Fetch user posts
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.userPosts[action.payload.userId] = action.payload.posts
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Delete post
    builder
      .addCase(deletePost.fulfilled, (state, action) => {
        const postId = action.payload
        state.homeFeed = state.homeFeed.filter(p => p.id !== postId)
        state.exploreFeed = state.exploreFeed.filter(p => p.id !== postId)
        state.bookmarks = state.bookmarks.filter(p => p.id !== postId)
        Object.keys(state.userPosts).forEach(userId => {
          state.userPosts[userId] = state.userPosts[userId].filter(p => p.id !== postId)
        })
      })

    // Toggle like
    builder.addCase(toggleLike.fulfilled, (state, action) => {
      const { postId, isLiked } = action.payload
      const updatePost = (post: Post) => {
        if (post.id === postId) {
          post.isLiked = isLiked
          post.likes += isLiked ? 1 : -1
        }
      }
      state.homeFeed.forEach(updatePost)
      state.exploreFeed.forEach(updatePost)
      state.bookmarks.forEach(updatePost)
      Object.values(state.userPosts).forEach(posts => posts.forEach(updatePost))
    })

    // Toggle bookmark
    builder.addCase(toggleBookmark.fulfilled, (state, action) => {
      const { postId, isBookmarked } = action.payload
      const updatePost = (post: Post) => {
        if (post.id === postId) {
          post.isBookmarked = isBookmarked
        }
      }
      state.homeFeed.forEach(updatePost)
      state.exploreFeed.forEach(updatePost)
      state.bookmarks.forEach(updatePost)
      Object.values(state.userPosts).forEach(posts => posts.forEach(updatePost))

      if (!isBookmarked) {
        state.bookmarks = state.bookmarks.filter(p => p.id !== postId)
      }
    })

    // Add comment
    builder.addCase(addComment.fulfilled, (state, action) => {
      const { postId, comment } = action.payload
      if (!state.postComments[postId]) {
        state.postComments[postId] = []
      }
      state.postComments[postId].push(comment)

      // Update comments count
      const updatePost = (post: Post) => {
        if (post.id === postId) {
          post.commentsCount += 1
        }
      }
      state.homeFeed.forEach(updatePost)
      state.exploreFeed.forEach(updatePost)
      state.bookmarks.forEach(updatePost)
      Object.values(state.userPosts).forEach(posts => posts.forEach(updatePost))
    })

    // Fetch comments
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false
        state.postComments[action.payload.postId] = action.payload.comments
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Follow user
    builder.addCase(followUser.fulfilled, (state, action) => {
      const userId = action.payload
      if (state.userProfiles[userId]) {
        state.userProfiles[userId].isFollowing = true
        state.userProfiles[userId].followersCount += 1
      }
    })

    // Unfollow user
    builder.addCase(unfollowUser.fulfilled, (state, action) => {
      const userId = action.payload
      if (state.userProfiles[userId]) {
        state.userProfiles[userId].isFollowing = false
        state.userProfiles[userId].followersCount -= 1
      }
    })

    // Fetch user profile
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.userProfiles[action.payload.id] = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError } = instagramSlice.actions
export default instagramSlice.reducer
