import { useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { Home, Compass, Search, PlusSquare, User, LogOut } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { logoutUser } from '@/features/auth/authSlice'
import CreatePostModal from '@/components/CreatePostModal'

export default function InstagramClone() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.auth.user)
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)

  const handleLogout = async () => {
    await dispatch(logoutUser())
    navigate('/login')
  }

  if (!currentUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-card p-6 flex flex-col">
        <h1
          className="text-2xl font-bold mb-10 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent cursor-pointer"
          onClick={() => navigate('/instagram')}
        >
          Instagram
        </h1>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => navigate('/instagram')}
            className="flex items-center gap-4 w-full px-4 py-3 rounded-lg hover:bg-muted transition-colors"
          >
            <Home className="w-6 h-6" />
            <span className="font-medium">Home</span>
          </button>

          <button
            onClick={() => navigate('/instagram/explore')}
            className="flex items-center gap-4 w-full px-4 py-3 rounded-lg hover:bg-muted transition-colors"
          >
            <Compass className="w-6 h-6" />
            <span className="font-medium">Explore</span>
          </button>

          <button
            onClick={() => navigate('/instagram/search')}
            className="flex items-center gap-4 w-full px-4 py-3 rounded-lg hover:bg-muted transition-colors"
          >
            <Search className="w-6 h-6" />
            <span className="font-medium">Search</span>
          </button>

          <button
            onClick={() => setIsCreatePostOpen(true)}
            className="flex items-center gap-4 w-full px-4 py-3 rounded-lg hover:bg-muted transition-colors"
          >
            <PlusSquare className="w-6 h-6" />
            <span className="font-medium">Create</span>
          </button>

          <button
            onClick={() => navigate('/instagram/profile')}
            className="flex items-center gap-4 w-full px-4 py-3 rounded-lg hover:bg-muted transition-colors"
          >
            <User className="w-6 h-6" />
            <span className="font-medium">Profile</span>
          </button>
        </nav>

        <div className="border-t pt-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-4 py-3 rounded-lg hover:bg-muted transition-colors text-red-500"
          >
            <LogOut className="w-6 h-6" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        <Outlet />
      </main>

      {/* Create Post Modal */}
      <CreatePostModal isOpen={isCreatePostOpen} onClose={() => setIsCreatePostOpen(false)} />
    </div>
  )
}
