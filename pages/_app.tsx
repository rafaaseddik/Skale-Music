import '@styles/main.scss'
import type { AppProps } from 'next/app'
import { Raleway} from "next/font/google";
import Image from "next/image";

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['200','400','500','600', '700'], // Pick the weights you need
})
function MyApp({ Component, pageProps }: AppProps) {
    return <main className={`flex flex-col min-h-screen ${raleway.className}`}>
        <div className="text-2xl flex justify-center p-2"><Image src="/skale.svg" alt="logo" width={150} height={50}/></div>
        <div className={"grow"}>
            <Component {...pageProps} className='grow' />
        </div>

        <div className="text-center p-2">Copyright © 2025 Skale. All rights reserved.</div>
    </main>
}

export default MyApp
