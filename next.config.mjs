/** @type {import('next').NextConfig} */
const nextConfig = {
  // Files read with fs at request time aren't traced automatically; ship them
  // with the serverless functions (Vercel) that need them.
  outputFileTracingIncludes: {
    '/api/card/*': ['./assets/fonts/**/*'],
    '/api/demo-card/*': ['./assets/fonts/**/*'],
    '/i/*': ['./public/music.mp3'],
  },
};

export default nextConfig;
