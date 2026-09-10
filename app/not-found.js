import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <main
      id="main"
      className="site-shell flex min-h-screen flex-col justify-center py-16"
    >
      <p className="section-label">404 / Not found</p>
      <h1 className="display-title mt-6">This page took a wrong turn.</h1>
      <p className="body-copy mt-8 max-w-xl">
        The address may have changed, or the project may no longer be in the
        archive.
      </p>
      <div className="mt-8">
        <Link href="/" className="button-primary">
          <FiArrowLeft aria-hidden="true" /> Return home
        </Link>
      </div>
    </main>
  );
}
