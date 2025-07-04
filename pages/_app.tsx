import '@styles/main.scss'
import type { AppProps } from 'next/app'
import { Raleway} from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import SmartLookScript from "@/shared/components/smartlook/smartlook-script.component";

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['200','400','500','600', '700'], // Pick the weights you need
})
function MyApp({ Component, pageProps }: AppProps) {
    return <div  className={`flex flex-col min-h-screen ${raleway.className}`}><main className={"grow"}>
        <div className="text-2xl flex justify-center p-2">
            <Link href="/"><Image src="/skale.svg" alt="logo" width={150} height={50}/></Link></div>
        <div className={"grow"}>
            <SmartLookScript/>
            <Component {...pageProps} className='grow' />
        </div>


    </main>
    <footer>
        <div className="text-center p-1">Copyright © 2025 Skale. All rights reserved.</div>
        <div className="text-center px-1 mb-3">Contact us onFacebook: <a className={"underline"} href={"https://www.facebook.com/profile.php?id=61577715346970"} target="_blank">Skale Music App</a></div>
        <div className="text-center px-1 mb-3">Source code: <a className={"underline"} href={"https://github.com/rafaaseddik/Skale-Music"} target="_blank">rafaaseddik/Skale-Music</a></div>
    </footer>
    </div>
}

export default MyApp
