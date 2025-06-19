import { notFound } from "next/navigation";
import { use } from "react"; // ✅ use() must be imported
import celebrities from "@/utils/celebrities";
import BookingForm from "@/components/BookingForm";

export default function CelebPage({ params }) {
  const { celeb } = use(params); // ✅ unwrap the promise

  const celebData = celebrities.find((c) => c.id === celeb);

  if (!celebData) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-white">
      <div className="flex flex-col items-center gap-4">
        <img
          src={celebData.profileImage}
          alt={celebData.name}
          className="w-48 h-48 rounded-full shadow-md"
        />
        <h1 className="text-3xl font-bold">{celebData.name}</h1>
        <p className="text-blue-400 italic">{celebData.role}</p>
        <p className="text-sm text-gray-400">{celebData.yearsActive}</p>
        <p className="text-center text-gray-300">{celebData.bio}</p>

        <BookingForm celebName={celebData.name} />
      </div>
    </div>
  );
}
