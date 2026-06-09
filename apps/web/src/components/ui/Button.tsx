import { ButtonHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'primary_ghost' | 'secondary_ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  href?: string
  target?: string
  icon?: ReactNode
  showIcon?: boolean
  asChild?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  target,
  icon,
  showIcon = true,
  className = '',
  ...props
}: ButtonProps) {
	const baseStyles = 'inline-flex items-center justify-center font-bold leading-[1.2] gap-2 xl:gap-[10px] border rounded-xl xl:rounded-2xl transition-all duration-300 ease focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer text-sm xl:text-base px-5 py-3 xl:px-[27px] xl:py-[18px]'

	const variants = {
		primary: 'bg-[#151515] text-white border-transparent shadow-[20px_20px_60px_0_rgba(59,26,115,0.20)] hover:shadow-[20px_20px_60px_0_rgba(59,26,115,0)]',
		secondary: 'bg-[#F0F1F0] text-[#202020] border-transparent hover:bg-gray-300',
		outline: 'bg-transparent border-[#202020] text-[#202020] hover:bg-gray-50',
		primary_ghost: 'bg-[#F0F1F0] text-[#2A2730] border-transparent',
		secondary_ghost: 'bg-[#151515] text-white border-transparent',
	}

	const sizes = {
		sm: 'text-sm px-4 py-2 rounded-lg',
		md: 'text-base px-4 xl:px-6 py-1 xl:py-2.5 rounded-2xl',
		lg: 'text-base px-8 py-3.5 rounded-xl font-semibold',
	}

	const arrowIcon = (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none" className="w-2.5 h-2.5 xl:w-3.5 xl:h-3.5">
			<path d="M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M13 9.80286V1H4.19714" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	)

	const classes = `${baseStyles} ${variants[variant]} ${className}`

	const iconElement = showIcon ? (icon ?? arrowIcon) : null

	if (href) {
		return (
			<Link href={href} target={target} className={classes}>
				{children}
				{iconElement}
			</Link>
		)
	}

	return (
		<button className={classes} {...props}>
			{children}
			{iconElement}
		</button>
	)
}
