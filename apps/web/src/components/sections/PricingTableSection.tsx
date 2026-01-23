import { PricingTableSection as PricingTableSectionProps } from '@/lib/types/section';
import { memo, useState } from 'react';
import { Container } from '../ui';
import { TabList } from '../ui/TabList';
import PricingCards from '../ui/PricingCards';

const PricingTableSection = ({data} : {data: PricingTableSectionProps}) => {
    const {
        vatInfo,
        stats,
        tabs,
    } = data;

    const [activeTab, setActiveTab] = useState(tabs && tabs.length !== 0 ? tabs[0]?._key : '');

    const handleTabChange = (key: string) => {
        setActiveTab(key);
    }

    if(!data || !tabs || tabs.length === 0) return null;
    return (
        <>
            <section className='pricing-table-section bg-[#F8F8F9]'>
                <Container withBorder={true} padding={false} className='pt-8 md:pt-10 lg:pt-12'>
                    <div className='flex items-center justify-center mb-6 md:mb-7 lg:mb-8 px-4 md:px-6'>
                        <TabList
                            onChange={handleTabChange}
                            tabs={tabs}
                            defaultActiveKey={activeTab}
                        />
                    </div>
                    <PricingCards 
                        cards={tabs.find(item => activeTab === item._key)?.cards || []} 
                        stats={stats}
                        vatInfo={vatInfo}
                    />
                </Container>
            </section>
        </>
    );
};

export default memo(PricingTableSection);