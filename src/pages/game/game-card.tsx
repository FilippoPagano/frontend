import { Button } from '@src/components/shared/button'
import { UserDTO } from '@src/types/dto/user.dto'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'

type Props = {
  players: {
    me: string
    opponent: UserDTO
  }
}
export const GameCard = ({ players }: Props) => {
  const [myPoints, setMyPoints] = useState<number>(0)
  const [opponentPoints, setOpponentPoints] = useState<number>(0)

  const advantage: number = myPoints === opponentPoints ? 0 : myPoints > opponentPoints ? 1 : 2

  const handleMyPoints = (add: boolean) => {
    if (add) {
      setMyPoints((prev) => prev + 1)
    } else if (!add && myPoints > 0) {
      setMyPoints((prev) => prev - 1)
    } else {
      enqueueSnackbar({ message: 'Non è possibile un punteggio negativo', variant: 'error' })
    }
  }
  const handleOpponentPoints = (add: boolean) => {
    if (add) {
      setOpponentPoints((prev) => prev + 1)
    } else if (!add && myPoints > 0) {
      setOpponentPoints((prev) => prev - 1)
    } else {
      enqueueSnackbar({ message: 'Non è possibile un punteggio negativo', variant: 'error' })
    }
  }

  return (
    <div className="game-card">
      <div className="players">
        <div className="player-card">
          <h3>{players.me}</h3>
          <h1 className={!advantage ? '' : advantage === 1 ? 'winning' : 'losing'}>{myPoints}</h1>
          <div className="buttons-container">
            <div className="icon-btn minus" onClick={() => handleMyPoints(false)}>
              <h1>-</h1>
            </div>
            <div className="icon-btn plus" onClick={() => handleMyPoints(true)}>
              <h1>+</h1>
            </div>
          </div>
        </div>
        <div className="player-card">
          <h3>{players.opponent.name}</h3>
          <h1 className={!advantage ? '' : advantage === 2 ? 'winning' : 'losing'}>{opponentPoints}</h1>
          <div className="buttons-container">
            <div className="icon-btn minus" onClick={() => handleOpponentPoints(false)}>
              <h1>-</h1>
            </div>
            <div className="icon-btn plus" onClick={() => handleOpponentPoints(true)}>
              <h1>+</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="submit">
        <Button
          label="Partita terminata"
          onClick={() => enqueueSnackbar({ message: 'Partita terminata', variant: 'success' })}
        />
      </div>
    </div>
  )
}
