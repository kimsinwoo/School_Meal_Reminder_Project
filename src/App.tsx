import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import { isMobile } from 'react-device-detect';
import { DeskTopAdmin, DeskTopChart, DeskTopHome, DeskTopMypage, DeskTopVote, MobileAdmin, MobileChart, MobileHome, MobileMypage, MobileVote } from './pages';

const App: React.FC = () => {
  return (
    <Routes>
      {
        isMobile ?
          <>
            <Route index element={<MobileHome/>} /> 
            <Route path="/vote" element={<MobileVote/>} />
            <Route path="/chart" element={<MobileChart/>} />
            <Route path="/admin" element={<MobileAdmin/>} />
            <Route path="/mypage" element={<MobileMypage/>} />
          </> :
          <>
            <Route index element={<DeskTopHome/>} />
            <Route path="/vote" element={<DeskTopVote/>} />
            <Route path="/chart" element={<DeskTopChart/>} />
            <Route path="/admin" element={<DeskTopAdmin/>} />
            <Route path="/mypage" element={<DeskTopMypage/>} />
          </>
      }
    </Routes>
  );
}

export default App;
