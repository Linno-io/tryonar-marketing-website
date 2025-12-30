import { HTMLAttributes, ReactNode } from 'react'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: boolean,
  withBorder?: boolean
}

export default function Container({
  children,
  size = 'xl',
  padding = true,
  className = '',
  withBorder = false,
  ...props
}: ContainerProps) {
  const sizes = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-[1170px]',
    full: 'max-w-full',
  }

  const paddingClass = padding ? 'px-4 sm:px-6 md:px-8' : ''
  const borderClass = withBorder ? 'border-l border-r border-[#EEEDF2]' : ''
  const classes = `mx-auto w-full ${sizes[size]} ${paddingClass} ${borderClass} ${className}`
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
