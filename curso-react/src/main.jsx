import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { install } from '@twind/core'
import presetAutoprefix from '@twind/preset-autoprefix'
import presetTailwind from '@twind/preset-tailwind'
install({
  presets:[
    presetAutoprefix(),
    presetTailwind(),
  ],
  theme: {
    extend : {
      colors: {
        primary: '#5782AD',
        secondary: '#B3D9FF',
      },
    }, 
  },
   
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
