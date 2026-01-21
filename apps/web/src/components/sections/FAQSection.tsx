import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui";
import { FAQSection as FAQSectionProps } from '@/lib/types/section';

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg
        width="11"
        height="13"
        viewBox="0 0 11.1489 13"
        fill="none"
        className="transition-colors duration-200"
    >
        <path
            d="M4.66198 0.781373C4.65334 0.834566 4.64936 0.888398 4.65006 0.942259L4.65006 10.1135L4.55704 9.91352C4.46452 9.71804 4.33861 9.54021 4.18499 9.38799L1.61314 6.81614C1.2898 6.47742 0.769646 6.42051 0.380701 6.68127C-0.0337648 6.98476 -0.123756 7.56677 0.179732 7.98126C0.204265 8.01475 0.231006 8.04657 0.259783 8.07648L4.9105 12.7272C5.27355 13.0907 5.86247 13.091 6.22592 12.7279C6.22616 12.7277 6.22642 12.7274 6.22665 12.7272L10.8774 8.07648C11.2401 7.71274 11.2393 7.12381 10.8755 6.76106C10.8469 6.73251 10.8164 6.70586 10.7844 6.68127C10.3954 6.42051 9.87525 6.47742 9.55191 6.81614L6.97542 9.38333C6.8388 9.5198 6.72425 9.67671 6.63591 9.84841L6.51034 10.1274L6.51034 0.993445C6.52799 0.518288 6.19607 0.101409 5.72902 0.0121442C5.22195 -0.0700863 4.74424 0.2743 4.66198 0.781373Z"
            fill={isOpen ? "white" : "#1F1738"}
        />
    </svg>
);

export default function FAQAccordion({data} : {data: FAQSectionProps }) {
    const {
        title,
        description,
        faq
    } = data;

    const [openId, setOpenId] = useState<string | null>(faq.length > 0 ? faq[0]._key : null);


    const toggleAccordion = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="relative bg-[#F8F8F9] overflow-hidden faq-section">
            <Container withBorder padding={true} className="py-10 md:py-24 !px-2.5">
                <div className="text-center mx-auto mb-12 md:mb-16">
                    {
                        title && title.length > 0 && (
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a202c] mb-4">
                                {
                                    title.map((block, index) => {
                                        if(block.type === 'normal') {
                                            return <Fragment key={index}>{block.text}</Fragment>
                                        }else {
                                            return (
                                                <span key={index} className="text-[#838383] font-bold">{' ' + block.text + ' '}</span>
                                            )
                                        }
                                    })
                                }
                            </h2>
                        )
                    }

                    {
                        description && (
                            <p className="text-[#E7E5EABF] text-base md:text-lg mx-auto">{description}</p>
                        )
                    }
                </div>
                

                {/* FAQ Items */}
                <div className="space-y-4 max-w-220 mx-auto relative z-10">
                    {faq.map((faq) => {
                        const isOpen = openId === faq._key;
                        return (
                            <div
                                key={faq._key}
                                className={`rounded-[14px] md:rounded-2xl transition-all duration-300 border border-[#ededf0] ${isOpen
                                        ? "bg-white shadow-lg"
                                        : "bg-[#f8f8f9] hover:bg-[#f3f3f6]"
                                    }`}
                            >
                                {/* Question header - clickable */}
                                <button
                                    onClick={() => toggleAccordion(faq._key)}
                                    className="w-full flex cursor-pointer items-center justify-between p-5 text-left"
                                >
                                    <span className="font-medium text-base md:text-[20px] leading-[26px] md:leading-[30px] tracking-tight md:tracking-[-1px] text-[#1a202c] pr-4">
                                        {faq.question}
                                    </span>
                                    {/* Icon button */}
                                    <motion.div
                                        animate={{ rotate: isOpen ? 0 : 180 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className={`flex-shrink-0 w-8 h-8 md:w-[36px] md:h-[36px] rounded-full flex items-center justify-center ${isOpen ? "bg-[#202020]" : "bg-[#f2f1f3]"
                                            }`}
                                    >
                                        <ChevronIcon isOpen={isOpen} />
                                    </motion.div>
                                </button>

                                {/* Answer - animated */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 md:px-[30px] pb-5 md:pb-[30px] pt-0">
                                                <p className="font-['Inter',sans-serif] text-sm md:text-[16px] leading-[22px] md:leading-[28px] text-[#3e3e42]">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
