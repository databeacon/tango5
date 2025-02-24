import Image from 'next/image';

const WelcomeTango5Title = () => {
    return (
        <div className="relative mb-14 flex h-32 flex-col items-end justify-between pl-32">
            <Image
                src="/images/tango5-logo.svg"
                width="100"
                height="124"
                className="absolute bottom-0 left-0"
                alt="Tango5 logo"
            />
            <span className="font-barlow text-6xl font-light leading-10">Welcome to</span>
            <Image src="/images/tango5.svg" width="304" height="62" alt="Tango5" />
        </div>
    );
};
// 4.81
export { WelcomeTango5Title };
