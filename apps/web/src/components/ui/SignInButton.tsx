import { SignInInfo } from '@/lib/types/siteSettings';
import Link from 'next/link';
import { memo } from 'react';
import { useDictionary } from '@/lib/i18n/LocaleProvider';

interface SignInButtonProps {
    data: SignInInfo
}

const SignInButton = (props: SignInButtonProps) => {
    const {
        data
    } = props;
    const { navigation } = useDictionary();

    return (
        <>
            <Link href={data?.internalSlug ?? data.externalLink ?? ''} className="cursor-pointer bg-white text-[#00020B] h-11 px-6 rounded-full font-bold text-sm hover:bg-[#00020B] hover:text-white border border-white transition-all w-full md:w-auto flex items-center justify-center">
                {data?.label || navigation.signIn}
            </Link>
        </>
    );
};

export default memo(SignInButton);