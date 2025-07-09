import '../styles/globals.css';
import type { AppProps } from 'next/app';

/**
 * @component MyApp
 * @description Componente raiz da aplicação Next.js, usado para injetar estilos globais.
 */
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;