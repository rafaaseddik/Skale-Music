import '@styles/main.scss'
import type { AppProps } from 'next/app'
import { Raleway} from "next/font/google";

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['200','400','500','600', '700'], // Pick the weights you need
})
function MyApp({ Component, pageProps }: AppProps) {
    return <main className={raleway.className}><Component {...pageProps} /></main>
}

export default MyApp
