import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { store } from './store/store'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import InstagramClone from './pages/InstagramClone'
import FeedPage from './pages/FeedPage'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import Search from './pages/Search'
import PostDetail from './pages/PostDetail'

// Get Google Client ID from environment variable
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

function App() {
  if (!GOOGLE_CLIENT_ID) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full bg-card border rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-500">Configuration Required</h1>
          <p className="text-muted-foreground mb-4">
            Google OAuth Client ID is not configured.
          </p>
          <div className="bg-muted p-4 rounded-lg text-left text-sm mb-4">
            <p className="font-semibold mb-2">To fix this:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Create a <code className="bg-background px-1 rounded">.env</code> file in the portfolio-app directory</li>
              <li>Add: <code className="bg-background px-1 rounded">VITE_GOOGLE_CLIENT_ID=your_client_id</code></li>
              <li>Get your Client ID from <a href="https://console.cloud.google.com/" target="_blank" className="text-primary hover:underline">Google Cloud Console</a></li>
              <li>Restart the dev server</li>
            </ol>
          </div>
          <p className="text-xs text-muted-foreground">
            See <code>SETUP.md</code> for detailed instructions
          </p>
        </div>
      </div>
    )
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/instagram"
              element={
                <ProtectedRoute>
                  <InstagramClone />
                </ProtectedRoute>
              }
            >
              <Route index element={<FeedPage />} />
              <Route path="explore" element={<Explore />} />
              <Route path="search" element={<Search />} />
              <Route path="post/:postId" element={<PostDetail />} />
              <Route path="profile" element={<Profile />} />
              <Route path="profile/:userId" element={<Profile />} />
            </Route>
            <Route path="/projects/instagram-clone" element={<Navigate to="/login" replace />} />
            <Route path="/projects/:projectId" element={
              <div className="min-h-screen flex items-center justify-center">
                <p className="text-2xl text-muted-foreground">Project Coming Soon</p>
              </div>
            } />
          </Routes>
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  )
}

export default App
