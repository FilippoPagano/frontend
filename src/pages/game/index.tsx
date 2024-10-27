import './game-card.scss'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { GameCard } from './game-card'
import { useState } from 'react'
import { UserDTO } from '@src/types/dto/user.dto'

export const Game = () => {
  const [opponent, setOpponent] = useState<UserDTO>()
  const options: UserDTO[] = [
    { id: 0, name: 'ciccio' },
    { id: 1, name: 'franco' }
  ]
  return (
    <div style={{ width: '100%', maxWidth: '90vw' }}>
      <ReactSearchAutocomplete
        styling={{ borderRadius: '16px', border: 'none', height: '40px' }}
        items={options}
        placeholder="Cerca avversario..."
        showNoResultsText="Nessun giocatore"
        className="custom-textfield"
        onSelect={(o) => setOpponent(o)}
      />
      {opponent && <GameCard players={{ me: 'Me', opponent: opponent }} />}
    </div>
  )
}
