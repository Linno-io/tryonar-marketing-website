import { memo } from 'react';

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

            <p className='text-[#0C0020] text-base leading-6'>
                {summary}
            </p>

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