import { PricingTable } from '@/lib/types/section';
import { memo } from 'react';

const ComparisonTable = ({data} : {data: PricingTable}) => {
    const {
        heading,
        plans,
        features
    } = data;

    if(!data) return null;
    return (
        <>
            
        </>
    );
};

export default memo(ComparisonTable);