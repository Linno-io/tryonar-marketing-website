import { HTMLAttributes, ReactNode } from 'react'

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'primary' | 'secondary' | 'default'
  icon?: ReactNode
  children: ReactNode
}

export default function Badge({
  variant = 'success',
  icon,
  children,
  className = '',
  ...props
}: BadgeProps) {
  const variants = {
    success: 'bg-[#E6F7ED] text-[#0AA44C] border-[#0AA44C]/20',
    primary: 'bg-[#F3E8FF] text-[#9F3AED] border-[#9F3AED]/20',
    secondary: 'bg-gray-100 text-gray-700 border-gray-300',
    default: 'bg-gray-50 text-gray-600 border-gray-200',
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-medium text-sm ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </div>
  )
}
