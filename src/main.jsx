import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './Pages/App.jsx'
import {TrendingCrypto} from './Pages/TrendingCrypto.jsx'
import { CryptoNews } from './Pages/CryptoNews.jsx'
import { CoinInfo } from './Pages/CoinDetail.jsx'
import { CryptoProvider } from './components/ChartContext.jsx'
import { GeneralDetail } from './components/DetailInfo.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CryptoProvider>
        <Routes>
          <Route path="/" element={<App />}/>
          <Route path="/trending" element={<TrendingCrypto />}/>
          <Route path="/news" element={<CryptoNews />}/>
          <Route path="/detail/:id" element={<CoinInfo />}/>
        </Routes>
      </CryptoProvider>
    </BrowserRouter>
  </React.StrictMode>
    
)
