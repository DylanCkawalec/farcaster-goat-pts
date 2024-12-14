/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'picsum.photos',
            },
        ],
    },
    // redirects: async () => {
    //     return [
    //         {
    //             source: '/',
    //             destination: '/ecosystem/projects',
    //             permanent: true,
    //         },
    //     ];
    // },
};

export default nextConfig;
