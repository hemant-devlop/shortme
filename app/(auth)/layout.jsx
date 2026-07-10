import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      {/* <div className="fixed top-0 left-0">
        <Image src='/images/Overlay+Blur.jpg' height={400} width={400} alt="overlay"/>
      </div> */}
      <div className="w-full max-w-350">
        {children}
      </div>

    </main>
  );
}