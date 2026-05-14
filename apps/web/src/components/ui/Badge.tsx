import { clsx } from 'clsx';
import { memo } from 'react';

export interface BadgeProps {
    text: string;
    icon?: React.ReactNode;
    showDash?: boolean;
}
const Badge = (props: BadgeProps) => {
    const { text, icon, showDash } = props;
    return (
        <>
            <span className={clsx(
                'rounded-[100px] border border-[#C5BBCC] bg-white p-[5px_9px] lg:p-[9px_14px] flex items-center justify-center gap-2.5 text-[#1A202C] text-[14px] lg:text-[18px] font-medium',
                showDash ? 'border-dashed' : ''
            )}>
                {icon && <span className="inline-block">{icon}</span>}
                <span>
                    {text}
                </span>
            </span>
        </>
    );
};

export default memo(Badge);