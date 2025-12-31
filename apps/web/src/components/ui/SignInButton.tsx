import { memo } from 'react';

const SignInButton = () => {
    const onSignIn = () => {
        console.warn('Sign In clicked');
    };

    return (
        <>
            <button onClick={onSignIn} className="cursor-pointer bg-white text-[#00020B] h-11 px-6 rounded-full font-bold text-sm hover:bg-[#00020B] hover:text-white border border-white transition-all w-full md:w-auto">
                Sign In
            </button>
        </>
    );
};

export default memo(SignInButton);