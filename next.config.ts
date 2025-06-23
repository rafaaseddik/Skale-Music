import withPWA from 'next-pwa'

const withPWAConfig = withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
})

export default withPWAConfig({
    eslint: {
        ignoreDuringBuilds: true,
    },
})
