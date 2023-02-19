import { GameProvider } from "@/contexts/GameManager";
import { TimerProvider } from "@/contexts/TimerContext";
import "@/styles/globals.css";
import { theme } from "@/styles/theme";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TimerProvider>
      <GameProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </GameProvider>
    </TimerProvider>
  );
}
