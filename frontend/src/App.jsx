import { Routes, Route , Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import useAuthUser from './hooks/useAuthUser'
import pageLoader from './components/pageLoader.jsx'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import CallPage from './pages/CallPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'


const App = () => {
  const {isLoading, authUser} = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;
  if(isLoading){
    return <pageLoader/>
  }

  return (
    <div className='h-screen' data-theme="night">
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ? (
          <HomePage />
        ) : (<Navigate to= {!isAuthenticated ? "/login" : "/onboarding"} />)}/>
        <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/notifications" element={isAuthenticated ? <NotificationsPage /> : <Navigate to="/login" />} />
        <Route path="/call" element={isAuthenticated ?<CallPage /> : <Navigate to="/login" /> } />
        <Route path="/chat" element={isAuthenticated ?<ChatPage /> : <Navigate to="/login" /> } />
        <Route path="/onboarding" element={isAuthenticated ? <OnboardingPage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
