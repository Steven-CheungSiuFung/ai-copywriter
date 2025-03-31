import Link from "next/link"

const NavigationBar = (props) => {
    return (
        <header className="sticky top-0 z-50 bg-white shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
            <nav className="container mx-auto h-20 px-4 py-3 flex justify-between items-center">
                <div className="flex space-x-3">
                    <svg className="text-[#030303] fill-[#030303] text-xl top-[26px] left-[24px] w-5 h-7" viewBox="0 0 512 512">
                        <path d="M512 0C460.22 3.56 96.44 38.2 71.01 287.61c-3.09 26.66-4.84 53.44-5.99 80.24l178.87-178.69c6.25-6.25 16.4-6.25 22.65 0s6.25 16.38 0 22.63L7.04 471.03c-9.38 9.37-9.38 24.57 0 33.94 9.38 9.37 24.59 9.37 33.98 0l57.13-57.07c42.09-.14 84.15-2.53 125.96-7.36 53.48-5.44 97.02-26.47 132.58-56.54H255.74l146.79-48.88c11.25-14.89 21.37-30.71 30.45-47.12h-81.14l106.54-53.21C500.29 132.86 510.19 26.26 512 0z">
                        </path>
                    </svg>
                    <Link href="/" className="font-[family-name:var(--font-poppins)] text-[#030303] text-2xl font-bold leading-8">
                        CopyGenius
                    </Link>
                </div>
                <div className="flex space-x-6">
                    <Link href="/chat" className="font-[family-name:var(--font-poppins)] text-[#030303] leading-6">
                        AI-Chat
                    </Link>
                    <Link href="/copy-generator-page" className="font-[family-name:var(--font-poppins)] text-[#030303] leading-6">
                        Copy Generator
                    </Link>
                    <Link href="/image-generator-page" className="font-[family-name:var(--font-poppins)] text-[#030303] leading-6">
                        Image Generator
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default NavigationBar