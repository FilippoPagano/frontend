import { ClassExtender } from '@src/types/components/class-extender'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

interface TextfieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  customClass?: ClassExtender
}
export const Textfield = ({ customClass, ...props }: TextfieldProps) => {
  return (
    <input
      className={
        customClass && customClass?.overWrite ? customClass.class : `custom-textfield ${customClass?.class ?? ''}`
      }
      {...props}
    />
  )
}
