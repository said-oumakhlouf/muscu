const nextConfig = {
  images: {
    localPatterns: [
      { pathname: '/assets/**' },
      { pathname: '/icons/**' },
      { pathname: '/public/**' },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};


export default nextConfig;
