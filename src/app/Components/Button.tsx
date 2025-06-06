import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children:React.ReactNode,
    className?:string
}
const Button=forwardRef<HTMLButtonElement,ButtonProps>(({
  children,
  className,
  disabled,
  type='button',
  ...props
},ref)=>{
  return (
    <button type={type} ref={ref} disabled={disabled} {...props} className={twMerge('rounded-full w-full bg-green-500 border border-transparent px-4 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition',className)}>
      {children}
    </button>
  )
})
Button.displayName='Button'
export default Button;