import api from './api'

// Types
export interface PostResponse {
  id: number
  author_id: number
  author: {
    id: number
    name: string
    profile_picture?: string
  }
  image_url: string
  caption: string
  created_at: string
  updated_at?: string
  likes_count: number
  comments_count: number
  is_liked: boolean
  is_bookmarked: boolean
}

export interface CommentResponse {
  id: number
  post_id: number
  author_id: number
  author: {
    id: number
    name: string
    profile_picture?: string
  }
  content: string
  created_at: string
  updated_at?: string
}

export interface UserProfileResponse {
  id: number
  email: string
  name: string
  profile_picture?: string
  bio?: string
  followers_count: number
  following_count: number
  posts_count: number
  is_following?: boolean
  created_at: string
}

// Post APIs
export const postAPI = {
  // Create post
  createPost: async (formData: FormData) => {
    const response = await api.post('/posts/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Get post by ID
  getPost: async (postId: string): Promise<PostResponse> => {
    const response = await api.get(`/posts/${postId}`)
    return response.data
  },

  // Update post caption
  updatePost: async (postId: string, caption: string) => {
    const response = await api.put(`/posts/${postId}`, { caption })
    return response.data
  },

  // Delete post
  deletePost: async (postId: string) => {
    const response = await api.delete(`/posts/${postId}`)
    return response.data
  },

  // Get user's posts
  getUserPosts: async (userId: string): Promise<PostResponse[]> => {
    const response = await api.get(`/posts/user/${userId}`)
    return response.data.posts
  },
}

// Feed APIs
export const feedAPI = {
  // Get home feed (following users)
  getHomeFeed: async (page: number = 1, page_size: number = 20): Promise<PostResponse[]> => {
    const response = await api.get('/feed/home', {
      params: { page, page_size },
    })
    return response.data.posts
  },

  // Get explore feed (non-following users)
  getExploreFeed: async (page: number = 1, page_size: number = 20): Promise<PostResponse[]> => {
    const response = await api.get('/feed/explore', {
      params: { page, page_size },
    })
    return response.data.posts
  },

  // Get bookmarked posts
  getBookmarks: async (page: number = 1, page_size: number = 20): Promise<PostResponse[]> => {
    const response = await api.get('/feed/bookmarks', {
      params: { page, page_size },
    })
    return response.data.posts
  },
}

// Interaction APIs
export const interactionAPI = {
  // Like post
  likePost: async (postId: string) => {
    const response = await api.post(`/interactions/posts/${postId}/like`)
    return response.data
  },

  // Unlike post
  unlikePost: async (postId: string) => {
    const response = await api.delete(`/interactions/posts/${postId}/like`)
    return response.data
  },

  // Add comment
  addComment: async (postId: string, text: string): Promise<CommentResponse> => {
    const response = await api.post(`/interactions/posts/${postId}/comments`, { content: text })
    return response.data
  },

  // Get comments
  getComments: async (postId: string, offset: number = 0, limit: number = 50): Promise<CommentResponse[]> => {
    const response = await api.get(`/interactions/posts/${postId}/comments`, {
      params: { offset, limit },
    })
    return response.data
  },

  // Update comment
  updateComment: async (commentId: string, text: string) => {
    const response = await api.put(`/interactions/comments/${commentId}`, { content: text })
    return response.data
  },

  // Delete comment
  deleteComment: async (commentId: string) => {
    const response = await api.delete(`/interactions/comments/${commentId}`)
    return response.data
  },

  // Bookmark post
  bookmarkPost: async (postId: string) => {
    const response = await api.post(`/interactions/posts/${postId}/bookmark`)
    return response.data
  },

  // Remove bookmark
  removeBookmark: async (postId: string) => {
    const response = await api.delete(`/interactions/posts/${postId}/bookmark`)
    return response.data
  },
}

// Social APIs
export const socialAPI = {
  // Follow user
  followUser: async (userId: string) => {
    const response = await api.post(`/social/follow/${userId}`)
    return response.data
  },

  // Unfollow user
  unfollowUser: async (userId: string) => {
    const response = await api.delete(`/social/unfollow/${userId}`)
    return response.data
  },

  // Check if following
  isFollowing: async (userId: string): Promise<{ is_following: boolean }> => {
    const response = await api.get(`/social/is-following/${userId}`)
    return response.data
  },
}

// User APIs
export const userAPI = {
  // Get my profile
  getMyProfile: async (): Promise<UserProfileResponse> => {
    const response = await api.get('/users/me')
    return response.data
  },

  // Get user profile by ID
  getUserProfile: async (userId: string): Promise<UserProfileResponse> => {
    const response = await api.get(`/users/${userId}`)
    return response.data
  },

  // Update my profile
  updateMyProfile: async (data: { username?: string; full_name?: string; bio?: string }) => {
    const response = await api.put('/users/me', data)
    return response.data
  },

  // Search users
  searchUsers: async (query: string = ''): Promise<UserProfileResponse[]> => {
    const response = await api.get('/users/search', {
      params: { query },
    })
    return response.data
  },

  // Get followers
  getFollowers: async (userId: string, offset: number = 0, limit: number = 50): Promise<UserProfileResponse[]> => {
    const response = await api.get(`/users/${userId}/followers`, {
      params: { offset, limit },
    })
    return response.data
  },

  // Get following
  getFollowing: async (userId: string, offset: number = 0, limit: number = 50): Promise<UserProfileResponse[]> => {
    const response = await api.get(`/users/${userId}/following`, {
      params: { offset, limit },
    })
    return response.data
  },
}
