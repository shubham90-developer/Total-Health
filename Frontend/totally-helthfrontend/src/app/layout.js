import { Barlow } from "next/font/google";
import "./globals.css";
import Subscribe from "./components/Subscribe";
import Footer from "./components/Footer";
import ClientNavWrapper from "./components/ClientNavWrapper";
import Script from "next/script";
import ReduxProvider from "../../providers/reduxProviders";

<Script
  src="https://checkout.razorpay.com/v1/checkout.js"
  strategy="beforeInteractive"
/>;

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
export const metadata = {
  title: "Totally Healthy",
  description: "Healthy Food",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${barlow.variable}`}>
      <body className="font-barlow antialiased">
        <ReduxProvider>
          <ClientNavWrapper />
          {children}
          <Subscribe />
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
