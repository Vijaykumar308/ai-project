import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import BotList from './pages/BotList';
import BotBuilder from './pages/BotBuilder';
import BotDetails from './pages/BotDetails';
import TestBot from './pages/TestBot';
import VoiceConversion from './pages/VoiceConversion';

import Aniket from './pages/Aniket';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="bots" element={<BotList />} />
          <Route path="bots/new" element={<BotBuilder />} />
          <Route path="bots/:botId" element={<BotDetails />} />
          <Route path="test-bot" element={<TestBot />} />
          <Route path="voice-demo" element={<VoiceConversion />} />
          <Route path="aniket" element={<Aniket />} />
          <Route path="settings" element={<div className="p-4">Settingsasd  Page (Coming Soon)</div>} />
          <Route path="aniket" element={<Aniket />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
