import { ClassExtender } from '@src/types/components/class-extender'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

interface CustomButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label: string | JSX.Element
  disabled?: boolean
  customClass?: ClassExtender
}
export const IconButton = ({ label, disabled, customClass, ...props }: CustomButtonProps) => {
  return (
    <div
      className={customClass && customClass?.overWrite ? customClass.class : `custom-icon-button ${customClass?.class}`}
      {...props}
    >
      {label}
    </div>
  )
}
