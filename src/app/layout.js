import "./globals.css";
import { Bebas_Neue } from "next/font/google";
import { CartProvider } from "../context/CartContext";
import CartSidebar from "../components/CartSidebar";
import FloatingCart from "../components/FloatingCart";
import Header from "../components/Header";

const bebas = Bebas_Neue({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

export const metadata = {
  title: "Titansita | Entrenadora Profesional y Tienda",
  description: "Entrenamiento profesional, nutrición deportiva y asesoría premium por Titansita.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning className={bebas.variable}>
      <body>
        <CartProvider>
          <Header />
          {children}
          <CartSidebar />
          <FloatingCart />
        </CartProvider>
      </body>
    </html>
  );
}
