import { HTMLAttributes, ReactNode } from 'react'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    padding?: boolean,
    withBorder?: boolean
}

export default function Container(props: ContainerProps) {
    const {
        children,
        size = 'xl',
        padding = true,
        className = '',
        withBorder = false,
        ...rests
    } = props;

    const sizes = {
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-full lg:max-w-[1190px] xl:max-w-[1300px]',
        full: 'max-w-full',
    }

    const paddingClass = padding ? 'px-2.5 sm:px-3' : ''
    const borderClass = withBorder ? 'border-l border-r border-[#EEEDF2]' : ''
    const classes = `mx-auto w-full ${sizes[size]} ${paddingClass} ${borderClass} ${className}`
    
    return (
        <div className={classes} {...rests}>
            {children}
        </div>
    )
}
