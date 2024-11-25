import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { BasicAppShell } from './components/BasicAppShell';
import Manga from './pages/Manga.page';
import MangaRead from './pages/MangaRead.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BasicAppShell />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'manga/:id',
        element: <Manga />,
      },
      {
        path: 'search',
        element: <p>search</p>
      }
    ]
  },
  {
    path: 'manga/:id/ep/:ep',
    element: <MangaRead />
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
