import { HTMLAttributes, ReactNode } from 'react'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'custom',
    padding?: boolean,
    withBorder?: boolean,
    custom?: string,
}

export default function Container(props: ContainerProps) {
    const {
        children,
        size = 'xl',
        padding = true,
        className = '',
        withBorder = false,
        custom = '',
        ...rests
    } = props;

    const sizes = {
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-full sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1330px]',
        full: 'max-w-full',
        custom: custom,
    }

    const paddingClass = padding ? 'px-3.5' : ''
    const borderClass = withBorder ? 'border-l border-r border-[#EEEDF2]' : ''
    const classes = `mx-auto w-full ${sizes[size]} ${paddingClass} ${borderClass} ${className}`
    
    return (
        <div className={classes} {...rests}>
            {children}
        </div>
    )
}
