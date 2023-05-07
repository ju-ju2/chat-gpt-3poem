import { PortfolioProvider } from "@/context/context";
import { prefix } from "@/config/config";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PortfolioProvider value={{ prefix }}>
      <Component {...pageProps} />
    </PortfolioProvider>
  );
}
