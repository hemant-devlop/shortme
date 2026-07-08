import "./globals.css";

export const metadata = {
  title: "ShortMe",
  description: "Fast & Secure URL Shortener",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}