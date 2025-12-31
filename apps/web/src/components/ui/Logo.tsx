import Link from 'next/link';
import { memo } from 'react';
import Image from 'next/image'

interface LogoProps {
    url: string;
    alt?: string;
}
const Logo = (props: LogoProps) => {
    const { 
        url, 
        alt 
    } = props;

    return (
        <>
            <Link href="/" className="flex items-center">
                <Image
                    src={url}
                    alt={alt || 'Logo'}
                    width={32}
                    height={32}
                    className="h-8 w-auto brightness-200"
                />
            </Link>
        </>
    );
};

export default memo(Logo);