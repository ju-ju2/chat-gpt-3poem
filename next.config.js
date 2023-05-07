/** @type {import('next').NextConfig} */
const debug = process.env.NODE_ENV !== "production";
const repository = "chat-gpt-3poem";

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: !debug ? `/${repository}/` : "", // production 일때 prefix 경로
  trailingSlash: true, // 빌드 시 폴더 구조 그대로 생성하도록
  env: {
    NEXT_PUBLIC_CHAT_API_KEY: process.env.NEXT_PUBLIC_CHAT_API_KEY,
  },
};

module.exports = nextConfig;
// module.exports = {
//   env: {
//     NEXT_PUBLIC_CHAT_API_KEY: process.env.NEXT_PUBLIC_CHAT_API_KEY,
//   },
// };
