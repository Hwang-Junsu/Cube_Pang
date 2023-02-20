import {GameProvider} from "@/contexts/GameManager";
import {TimerProvider} from "@/contexts/TimerContext";
import {UserProvider} from "@/contexts/UserContext";
import {theme} from "@/styles/theme";
import type {AppProps} from "next/app";
import {ThemeProvider} from "styled-components";
import "@/styles/globals.css";

export default function App({Component, pageProps}: AppProps) {
  return (
    <TimerProvider>
      <GameProvider>
        <UserProvider>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </UserProvider>
      </GameProvider>
    </TimerProvider>
  );
}
