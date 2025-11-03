import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { googleLogin } from '@/features/auth/authSlice'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/instagram')
    }
  }, [isAuthenticated, navigate])

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      // credentialResponse.credential contains the ID token
      const result = await dispatch(googleLogin(credentialResponse.credential)).unwrap()
      if (result) {
        navigate('/instagram')
      }
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleGoogleError = () => {
    console.error('Google Login Failed')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-card border rounded-lg p-8">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            Instagram
          </h1>

          <div className="space-y-4">
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                size="large"
                width="320"
                text="signin_with"
              />
            </div>

            {isLoading && (
              <div className="text-center text-sm text-muted-foreground">
                Logging in...
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded">
                {error}
              </div>
            )}
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Sign in with your Google account to continue</p>
          </div>
        </div>

        <div className="mt-4 bg-card border rounded-lg p-4 text-center text-sm">
          <span className="text-muted-foreground">
            New to Instagram? Sign in with Google to get started!
          </span>
        </div>
      </div>
    </div>
  )
}
