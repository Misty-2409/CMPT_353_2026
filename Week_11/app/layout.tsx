import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav style={{ padding: "10px", background: "#15abd0" }}>
          <Link href="/login" style={{ color: "white" , marginRight: "10px" }}>
            Sign In
          </Link>
          <Link href="/signup" style={{ color: "white" , marginRight: "10px" }}>
            Sign Up
          </Link>
        </nav>

        <div className="container">{children}</div>
      </body>
    </html>
  );
}