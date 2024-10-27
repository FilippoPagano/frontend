import './index.scss'
import { ClassExtender } from '@src/types/components/class-extender'
import { DetailedHTMLProps } from 'react'

interface CustomButtonProps {
  label: string | JSX.Element
  onClick: () => void
  customClass?: ClassExtender
  htmlProps?: DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
}

export const Button = ({ label, onClick, customClass, ...props }: CustomButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={customClass && customClass?.overWrite ? customClass.class : `custom-button ${customClass?.class}`}
      {...props}
    >
      {label}
    </button>
  )
}
