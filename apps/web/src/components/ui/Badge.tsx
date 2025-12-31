import { memo } from 'react';

interface BadgeProps {
    text: string;
    icon?: React.ReactNode;
}
const Badge = (props: BadgeProps) => {
    const { text, icon } = props;
    return (
        <>
            <span className="rounded-[100px] border border-dashed border-[#C5BBCC] bg-white p-[5px_9px] lg:p-[9px_14px] flex items-center justify-center gap-2.5 text-[#1A202C] text-[14px] lg:text-[18px] font-medium">
                {icon && <span className="inline-block">{icon}</span>}
                <span>
                    {text}
                </span>
            </span>
        </>
    );
};

export default memo(Badge);