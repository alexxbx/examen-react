import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Lessons from './Pages/Lessons';
import Profile from './Pages/Profile';
import Leaderboard from './Pages/Leaderboard';
import Quiz from './Pages/Quiz';
import Review from './Pages/Review';
import Flashcards from './Pages/Flashcards';
import ImmersionMode from './Pages/ImmersionMode';
import Multiplayer from './Pages/Multiplayer';
import Chat from './Pages/Chat';
import Dashboard from './Pages/Dashboard';
import LessonQuiz from './Pages/LessonQuiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/review" element={<Review />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/immersion-mode" element={<ImmersionMode />} />
        <Route path="/multiplayer" element={<Multiplayer />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/lessons/:id" element={<LessonQuiz />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;