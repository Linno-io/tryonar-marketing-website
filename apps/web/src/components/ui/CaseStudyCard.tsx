import { memo, useState, useRef, useEffect } from 'react';

interface CaseStudyCardProps {
    _key: string
    index: number
    companyName: string
    summary: string
    length: number
    metrics: {
      _key: string
      value: string
      label: string
    }[]
}

const CaseStudyCard = (props: CaseStudyCardProps) => {
    const {
        _key,
        companyName,
        summary,
        metrics,
        index,
        length,
    } = props;

    const [isExpanded, setIsExpanded] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (textRef.current) {
            const lineHeight = 24; // 1.5rem = 24px (leading-6)
            const maxLines = 2.5;
            const maxHeight = lineHeight * maxLines;
            
            if (textRef.current.scrollHeight > maxHeight) {
                setShowReadMore(true);
            }
        }
    }, [summary]);

    return (
        <div 
            className={`p-6 sm:p-8 md:p-12 lg:p-14 ${
                index % 2 === 0 ? 'lg:border-r' : ''
            } ${
                index < length - 2 ? 'border-b' : ''
            } ${
                index === length - 1 && length % 2 === 1 ? 'lg:border-t' : ''
            } border-[#E5E3EA]`}
        >
            <h3 className='text-[#2A2730E5] text-lg font-bold leading-none tracking-[-0.48px] mb-4'>
                {companyName}
            </h3>

            <div>
                <p 
                    ref={textRef}
                    className={`text-[#0C0020] text-base leading-6 transition-all duration-300 ease-in-out overflow-hidden ${
                        !isExpanded && showReadMore ? 'line-clamp-2' : ''
                    }`}
                >
                    {summary}
                </p>
                {showReadMore && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-[#AA73E4] cursor-pointer font-semibold text-base mt-1 hover:underline focus:outline-none transition-opacity duration-200"
                    >
                        {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                )}
            </div>

            <div className="flex items-stretch gap-2.5 mt-8">
                {
                    metrics && metrics.map((metric, index) => (
                        <div key={index} className='px-5 py-5 bg-[#F8F8F9] rounded-[10px]'>
                            <p className='text-[#838383] text-[22px] leading-none mb-2 font-medium'>
                                {metric.value}
                            </p>
                            <h5 className='text-[#646464] text-[15px] leading-none font-normal'>
                                {metric.label}
                            </h5>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default memo(CaseStudyCard);