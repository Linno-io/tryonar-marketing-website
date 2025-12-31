import { memo } from 'react';

interface TypographyProps {
    as: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}
const Typography = (props: TypographyProps) => {
    const { as, className = '', style = {}, children } = props;

    const Component = as;

    // Default classes for h1
    const h1Classes = "text-[var(--font-heading)] text-[#1A202C] font-bold leading-[1.1] text-[32px] sm:text-[40px] md:text-[64px] lg:text-[82px]";
    const mergedClassName = as === 'h1' ? `${h1Classes} ${className}`.trim() : className;

    return (
        <Component className={mergedClassName} style={style}>
            {children}
        </Component>
    );
};

export default memo(Typography);