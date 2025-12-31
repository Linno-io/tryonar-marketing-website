'use client'
import { Button, Container, Heading, Text, DotBackground } from '@/components/ui'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

export default function ReadyToSolveSection() {
    return (
        <section className="bg-white">
            <Container size="xl" padding={false} className="relative">
                <DotBackground
                    dotSize={2}
                    gap={20}
                    color="bg-gray-300"
                    borderColor="border-[#eeedf2]"
                    className="h-32 w-full border-x"
                />
            </Container>



            <Container withBorder={true} className='py-10 md:py-24 !px-[10px]'>
                <div className="relative z-10 text-center mx-auto mb-16">
                    <Heading level={2} className="text-[#1A202C] text-4xl lg:text-5xl font-bold mb-6">
                        Ready to Solve These <span className="text-[#838383]">Challenges?</span>
                    </Heading>
                    <Text className="text-[#3E3E42] max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
                        TryonAR transforms these pain points into competitive advantages with our no-code AR solution.
                    </Text>
                </div>

                {/* The Product Image */}
                <div className="relative z-10 rounded-[32px] overflow-hidden shadow-2xl border border-gray-100/50">
                    <Image
                        src="/ready-to-solve-image.png"
                        alt="TryonAR dashboard interface"
                        width={1400}
                        height={900}
                        className="w-full h-auto object-contain"
                        priority
                    />
                </div>

                {/* Buttons inside the Container at the bottom */}
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 mt-16">
                    <Button
                        variant="primary"
                        className="h-[52px] lg:h-[64px] px-10 !bg-[#1A202C] !text-white !rounded-2xl !font-bold text-lg flex items-center gap-2 shadow-2xl shadow-black/5"
                    >
                        See Our Solution <ArrowUpRight size={20} />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-[52px] lg:h-[64px] px-10 !bg-[#F3F4F6] !border-transparent !text-[#1A202C] !rounded-2xl !font-bold text-lg"
                    >
                        Calculate ROI
                    </Button>
                </div>
            </Container>
        </section>
    )
}