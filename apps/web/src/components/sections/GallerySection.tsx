'use client'
import { useEffect, useRef, useState } from 'react';
import { GallerySection as GallerySectionProps } from '@/lib/types/section';
import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';

// --- Icons ---
const StoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="26" viewBox="0 0 28 26" fill="none"><path d="M2.65714 11.9429V22.4667C2.65714 23.8343 3.83098 24.9429 5.27898 24.9429H22.321C23.769 24.9429 24.9428 23.8343 24.9428 22.4667V11.9429" stroke="#838383" strokeWidth="1.6" strokeLinejoin="round"/><path d="M17.5143 19.3711C16.6672 19.9349 15.3188 20.2997 13.7999 20.2997C12.281 20.2997 10.9327 19.9349 10.0857 19.3711" stroke="#838383" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.5143 19.3711C16.6673 19.9349 15.3189 20.2997 13.8 20.2997C12.2811 20.2997 10.9327 19.9349 10.0857 19.3711" stroke="#838383" strokeWidth="1.6" strokeLinecap="round"/><path d="M4.69999 11.9427C6.85389 11.9427 8.59999 10.2798 8.59999 8.22838C8.59999 10.7046 11.377 11.9427 13.8 11.9427C16.2229 11.9427 19 10.7046 19 8.22838C19 10.2798 20.746 11.9427 22.9 11.9427C25.054 11.9427 26.8 10.2798 26.8 8.22838L24.2 3.89504V2.0379C24.2 1.35412 23.618 0.799805 22.9 0.799805H4.69999C3.98202 0.799805 3.39999 1.35412 3.39999 2.0379V3.89504L0.799988 8.22838C0.799988 10.2798 2.54608 11.9427 4.69999 11.9427Z" stroke="#838383" strokeWidth="1.6" strokeLinejoin="round"/></svg>
);
const VRIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="25" viewBox="0 0 27 25" fill="none"><path d="M7.078 0.799805H19.6335C21.9804 0.799805 23.1538 0.799805 24.028 1.30444C24.6006 1.63504 25.0761 2.11053 25.4067 2.68313C25.9113 3.55719 25.9113 4.73065 25.9113 7.07757C25.9113 9.42449 25.9113 10.5979 25.4067 11.472C25.0761 12.0447 24.6006 12.5201 24.028 12.8507C23.1538 13.3553 21.9804 13.3553 19.6335 13.3553H19.1392C18.2768 13.3553 17.8455 13.3553 17.4421 13.2657C16.9019 13.1458 16.395 12.9082 15.957 12.5701C15.6298 12.3175 15.3537 11.9863 14.8017 11.3237C14.3617 10.7958 14.1417 10.5318 13.8892 10.4133C13.5513 10.2547 13.1603 10.2547 12.8223 10.4133C12.5698 10.5318 12.3498 10.7958 11.9099 11.3237C11.3578 11.9863 11.0817 12.3175 10.7545 12.5701C10.3166 12.9082 9.80957 13.1458 9.26946 13.2657C8.86598 13.3553 8.43476 13.3553 7.5723 13.3553H7.078C4.73108 13.3553 3.55761 13.3553 2.68356 12.8507C2.11095 12.5201 1.63546 12.0447 1.30486 11.472C0.800232 10.5979 0.800232 9.42449 0.800232 7.07757C0.800232 4.73065 0.800232 3.55719 1.30486 2.68313C1.63546 2.11053 2.11095 1.63504 2.68356 1.30444C3.55761 0.799805 4.73108 0.799805 7.078 0.799805Z" stroke="#838383" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M4.56677 4.56641H7.07788" stroke="#838383" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M10.9455 23.4L13.4821 20.8889L10.9455 18.3778M13.4821 20.8889C7.14168 20.8889 1.81585 18.3778 0.800232 15.8667M17.287 20.6015C21.6454 19.9239 24.9901 18.1131 25.9113 15.8667" stroke="#838383" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const ChartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M6.48425 19.1155V14.0628M12.8 19.1155V6.48389M19.1158 19.1155V11.5365" stroke="#838383" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M24.8 3.32612V22.2735C24.8 23.6688 23.669 24.7998 22.2737 24.7998H3.32636C1.93112 24.7998 0.800049 23.6688 0.800049 22.2735V3.32612C0.800049 1.93087 1.93112 0.799805 3.32636 0.799805H22.2737C23.669 0.799805 24.8 1.93087 24.8 3.32612Z" stroke="#838383" strokeWidth="1.6" strokeLinejoin="round"/></svg>
);
const RefreshIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="27" viewBox="0 0 25 27" fill="none"><path d="M20.1026 7.4001L17.3512 10.1515C16.8826 10.6202 16.8826 11.38 17.3512 11.8486C17.8198 12.3172 18.5796 12.3172 19.0482 11.8486L23.8482 7.04864C24.3168 6.58001 24.3168 5.82023 23.8482 5.3516L19.0482 0.55166C18.5796 0.0830406 17.8198 0.0830406 17.3512 0.55166C16.8826 1.02029 16.8826 1.78007 17.3512 2.2487L20.1026 5.00013H6.19987C4.6086 5.00013 3.08249 5.63226 1.95729 6.75747C0.832079 7.88267 0.199951 9.40878 0.199951 11.0001V12.2C0.199951 12.8628 0.737208 13.4 1.39994 13.4C2.06266 13.4 2.59992 12.8628 2.59992 12.2V11.0001C2.59992 10.0453 2.9792 9.12963 3.65432 8.4545C4.32944 7.77938 5.2451 7.4001 6.19987 7.4001H20.1026Z" fill="#838383" stroke="#fff" strokeWidth=".4"/><path d="M7.04839 16.6484C7.51701 16.1798 7.51701 15.42 7.04839 14.9514C6.57976 14.4828 5.81998 14.4828 5.35135 14.9514L0.551415 19.7513C0.0827967 20.2199 0.0827967 20.9797 0.551415 21.4483L5.35135 26.2483C5.81998 26.7168 6.57976 26.7168 7.04839 26.2483C7.51701 25.7797 7.51701 25.0198 7.04839 24.5512L4.29695 21.7998H18.1997C19.791 21.7998 21.3172 21.1676 22.4423 20.0424C23.5675 18.9173 24.1996 17.3912 24.1996 15.7999V14.5999C24.1996 13.9371 23.6624 13.3999 22.9997 13.3999C22.3369 13.3999 21.7997 13.9371 21.7997 14.5999V15.7999C21.7997 16.7546 21.4204 17.6703 20.7452 18.3454C20.0701 19.0205 19.1544 19.3998 18.1997 19.3998H4.29695L7.04839 16.6484Z" fill="#838383" stroke="#fff" strokeWidth=".4"/></svg>
)

type GalleryImage = {
    url: string
    alt?: string
    width?: number
    height?: number
    video?: string
}

const GalleryItem = ({ image, shouldLoad, idx }: { image: GalleryImage; shouldLoad: boolean; idx: number }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!shouldLoad || !videoRef.current) return;
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
    }, [shouldLoad]);

    if (image.video) {
        return (
            <video
                ref={videoRef}
                preload="none"
                loop
                muted
                playsInline
                poster={image.url}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110 cursor-pointer"
            >
                <source src={image.video} />
            </video>
        );
    }

    return image.url ? (
        <Image
            src={image.url}
            alt={image.alt || `Gallery image ${idx + 1}`}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110 cursor-pointer"
            loading="lazy"
        />
    ) : null;
};

const GallerySection = ({ data }: { data: GallerySectionProps }) => {
    const { stats: dynamicStats, primaryButton, images: dynamicGallery } = data;
    const [shouldLoadVideos, setShouldLoadVideos] = useState(false);
    const galleryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = galleryRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setShouldLoadVideos(true);
                observer.disconnect();
            }
        }, { rootMargin: '300px' });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const icons = [
        <StoreIcon key="store" />,
        <VRIcon key="vr" />,
        <ChartIcon key="chart" />,
        <RefreshIcon key="refresh" />,
    ];

    const stats = dynamicStats.map((stat, index) => ({
        label: stat.label,
        value: stat.value,
        icon: icons[index] || <StoreIcon key={index} />,
    }));

    // Desktop (≥1024px): 7 cols, col 4 has 1 item
    const desktopColCounts = [2, 2, 2, 1, 2, 2, 2];
    const desktopColumns = desktopColCounts.reduce<{ cols: GalleryImage[][], offset: number }>(
        ({ cols, offset }, count) => ({
            cols: [...cols, dynamicGallery.slice(offset, offset + count)],
            offset: offset + count,
        }),
        { cols: [], offset: 0 }
    ).cols;

    // Mobile (<1024px): equal distribution across 2 cols
    const mobileColCount = 2;
    const mobileItemsPerCol = Math.ceil(dynamicGallery.length / mobileColCount);
    const mobileColumns: GalleryImage[][] = Array.from({ length: mobileColCount }, (_, i) =>
        dynamicGallery.slice(i * mobileItemsPerCol, (i + 1) * mobileItemsPerCol)
    );
console.log(dynamicGallery);
    return (
        <section className="bg-white font-sans overflow-hidden">
            {/* Stats Section */}
            <div className="max-w-6xl mx-auto mb-12 sm:mb-16 px-4 sm:px-6 pt-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-10">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="relative flex items-center justify-center text-center px-3">
                            {idx !== stats.length - 1 && (
                                <div className="hidden md:block absolute right-[-30px] top-1/2 -translate-y-1/2 h-20 w-[1px] bg-gray-100">
                                    <div className="h-full w-full bg-gradient-to-b from-purple-400 via-orange-300 to-transparent" />
                                </div>
                            )}
                            <div className='flex flex-col items-start'>
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-4">
                                    {stat.icon}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-[#1A202C] mb-1 tracking-tight">
                                    {stat.value}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wider">
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center mb-16 px-4">
                {primaryButton && (
                    <Link href={primaryButton.internalLink || primaryButton.externalLink || '#'} target={primaryButton.externalLink ? '_blank' : '_self'}>
                        <button className="w-full sm:w-auto bg-[#1A202C] text-white px-10 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl hover:shadow-2xl group">
                            {primaryButton.text}
                            {primaryButton.showIcon && (
                                <svg width="18" height="18" viewBox="0 0 15 15" fill="none" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                                    <path d="M3.64645 11.3536L11 4M11 4H5.5M11 4V9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )}
                        </button>
                    </Link>
                )}
            </div>

            {/* Staggered Gallery with Fade Mask */}
            <div
                ref={galleryRef}
                className="relative w-full px-4 sm:px-10 pb-20 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
            >
                {/* Mobile layout: 2 equal cols, no stagger */}
                <div className="grid grid-cols-2 gap-4 lg:hidden">
                    {mobileColumns.map((colImages, colIdx) => (
                        <div key={colIdx} className="flex flex-col gap-4">
                            {colImages.map((image, imgIdx) => (
                                <div
                                    key={imgIdx}
                                    className={clsx(
                                        "relative aspect-3/4 min-h-30 rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-white",
                                        !image.video && 'hidden md:inline',
                                    )}
                                >
                                    <GalleryItem image={image} shouldLoad={shouldLoadVideos} idx={imgIdx} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Desktop layout: 5 cols, [3,3,3,1,3] distribution, staggered */}
                <div className="hidden lg:grid lg:grid-cols-7 gap-6">
                    {desktopColumns.map((colImages, colIdx) => {
                        const isStaggered = colIdx % 2 !== 0;
                        return (
                            <div
                                key={colIdx}
                                className={`flex flex-col  gap-6 ${isStaggered ? 'translate-y-24' : 'translate-y-18'} ${colImages.length === 1 ? 'justify-end' : 'justify-end'}`}
                            >
                                {colImages.map((image, imgIdx) => (
                                    <div
                                        key={imgIdx}
                                        className={clsx(
                                            'relative w-full justify-end shrink-0 aspect-3/4 rounded-[2.5rem] overflow-hidden shadow-md border border-gray-100 bg-white',
                                            colIdx == 2 && imgIdx == 1 ? 'h-[14px]' : '',
                                            colIdx == 4 && imgIdx == 1 ? 'h-[14px]' : '',
                                        )}
                                    >
                                        <GalleryItem image={image} shouldLoad={shouldLoadVideos} idx={imgIdx} />
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default GallerySection;