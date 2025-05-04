
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import Student from './pages/Student';
import Dashboard from './pages/Dashboard';
import ChatRoom from './pages/ChatRoom';
import PrivateChat from './pages/PrivateChat';
import VoiceRecorder from './pages/VoiceRecorder';
import VideoRecorder from './pages/VideoRecorder';
import FileUpload from './pages/FileUpload';
import AdminPanel from './pages/AdminPanel';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student/:name" element={<Student />} />
        <Route path="/dashboard/:name" element={<Dashboard />} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route path="/private-chat/:name" element={<PrivateChat />} />
        <Route path="/record" element={<VoiceRecorder />} />
        <Route path="/video" element={<VideoRecorder />} />
        <Route path="/files" element={<FileUpload />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
