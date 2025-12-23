import { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  href?: string
  asChild?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'

  const variants = {
    primary: 'bg-[#9F3AED] text-white hover:bg-[#8B2FD9] shadow-md hover:shadow-lg focus-visible:ring-[#9F3AED]',
    secondary: 'bg-[#0AA44C] text-white hover:bg-[#089038] shadow-md hover:shadow-lg focus-visible:ring-[#0AA44C]',
    outline: 'border-2 border-gray-900 bg-transparent text-gray-900 hover:bg-gray-50 focus-visible:ring-gray-900',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-600',
  }

  const sizes = {
    sm: 'text-sm px-4 py-2 rounded-lg',
    md: 'text-base px-6 py-2.5 rounded-lg',
    lg: 'text-base px-8 py-3.5 rounded-xl font-semibold',
  }
  
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
