// pages/login.tsx
import Image from "next/image";
import Link from "next/link";

export default function Login() {
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
            WELCOME BACK :)
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md"
            />
            <div className="text-right text-sm">
              <Link href="#" className="text-blue-500">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-red-400 text-white py-2 rounded-md hover:bg-red-500 transition"
            >
              Sign in
            </button>
          </form>

          <div className="my-4 flex items-center justify-center">
            <span className="text-sm text-gray-500">or</span>
          </div>

          <div className="space-y-2">
            <button className="w-full flex items-center justify-center border py-2 rounded-md">
              <Image
                src="/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Log in with Google
            </button>
            <button className="w-full flex items-center justify-center border py-2 rounded-md">
              <Image
                src="/apple.svg"
                alt="Apple"
                width={20}
                height={20}
                className="mr-2"
              />
              Log in with Apple
            </button>
          </div>

          <p className="mt-4 text-center text-sm">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
