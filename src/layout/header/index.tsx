import './header.scss'
import { Button } from '@src/components/shared/button'
import PingPongLogo from '@src/assets/ping-pong.svg'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
  const navigate = useNavigate()

  return (
    <header className="app-header">
      <div className="content">
        <div className="logo-container">
          <img src={PingPongLogo} alt="ping-pong-logo" />
        </div>
        <div className="actions-container">
          <Button
            label={'ELO'}
            onClick={() => {
              navigate('/')
            }}
          />
          <Button
            label={'Registra partita'}
            onClick={() => {
              navigate('/game')
            }}
          />
        </div>
      </div>
    </header>
  )
}
