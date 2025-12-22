import { HTMLAttributes, ReactNode } from 'react'

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: 'body' | 'small' | 'large' | 'muted' | 'lead'
  children: ReactNode
  as?: 'p' | 'span' | 'div'
}

export default function Text({
  variant = 'body',
  children,
  as: Component = 'p',
  className = '',
  ...props
}: TextProps) {
  const variants = {
    body: 'text-base',
    small: 'text-sm',
    large: 'text-lg',
    muted: 'text-sm text-gray-600',
    lead: 'text-xl text-gray-700',
  }

  const classes = `${variants[variant]} ${className}`

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}
