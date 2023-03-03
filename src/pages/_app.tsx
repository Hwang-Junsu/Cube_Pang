import {UserProvider} from "@/contexts/UserContext";
import {theme} from "@/styles/theme";
import type {AppProps} from "next/app";
import {ThemeProvider} from "styled-components";
import "@/styles/globals.css";

export default function App({Component, pageProps}: AppProps) {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </UserProvider>
  );
}
