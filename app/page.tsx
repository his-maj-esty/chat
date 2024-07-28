import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-3xl font-bold mb-6 text-center text-gray-800">
        Welcome to the Landing Page
      </div>
      <div className="flex flex-col gap-4">
        <Link href="/chat">
          <Button className="bg-blue-500 text-white hover:bg-blue-600">
            Go to Chat Dashboard
          </Button>
        </Link>
        <Link href="/api/auth/signin">
          <Button className="bg-green-500 text-white hover:bg-green-600">
            Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
}
