import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './styles/theme-provider'
import { AppLayout } from './layouts/app-layout'
import { HomePage } from './pages/home-page'
import { ComponentsIndexPage } from './pages/components-index'
import { ComponentDetailPage } from './pages/component-detail-page'
import { NotFoundPage } from './pages/not-found-page'

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/components" element={<ComponentsIndexPage />} />
            <Route path="/components/:name" element={<ComponentDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
