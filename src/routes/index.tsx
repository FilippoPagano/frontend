import { Elo } from '@src/pages/elo'
import { Game } from '@src/pages/game'
import { useRoutes } from 'react-router-dom'

export const Routes = () => {
  return useRoutes([
    {
      path: '/',
      element: <Elo />
    },
    { path: '/game', element: <Game /> }
  ])
}
