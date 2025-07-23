import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react' // provides global Auth0 context to the app.
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './providers/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain= {import.meta.env.VITE_Auth0_DOMAIN}
      clientId={import.meta.env.VITE_Auth0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Auth0Provider>
  </StrictMode>,
)

/*
WHAT DOES AUTH0PROVIDE provide?
 It gives you:
  - useAuth0() hook
  - user, isAuthenticated, loginWithRedirect(), logout(), etc
  - Automatically handles:
    -> Redirect back after login
    -> Storing session
    -> Refreshing tokens
*/