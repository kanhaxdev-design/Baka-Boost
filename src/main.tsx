import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ScrollAnimationProvider } from './lib/scroll-animation-provider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ScrollAnimationProvider>
      <App />
    </ScrollAnimationProvider>
  </React.StrictMode>,
)
