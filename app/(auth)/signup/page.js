// pages/signup.tsx
import Image from "next/image";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Image section */}
      <div className="md:w-1/2 w-full h-64 md:h-full relative">
        <Image
          src="/band.jpg"
          alt="Band"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Form section */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Create Your Account
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-red-400 text-white py-2 rounded-md hover:bg-red-500 transition"
            >
              Sign up
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
