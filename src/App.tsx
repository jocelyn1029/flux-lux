import { ConversationHistoryScreen } from './components/ConversationHistoryScreen'
import { ConversationAnalysisScreen } from './components/ConversationAnalysisScreen'
import { HomeScreen } from './components/HomeScreen'
import { ProfileScreen } from './components/ProfileScreen'
import './App.css'

function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  if (path === '/conversation-history') return <ConversationHistoryScreen />
  if (path === '/conversation-analysis') return <ConversationAnalysisScreen />
  if (path === '/profile') return <ProfileScreen />
  return <HomeScreen />
}

export default App
