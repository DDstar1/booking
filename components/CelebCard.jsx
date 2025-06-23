import Image from "next/image";

const CelebCard = ({ celeb, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white relative rounded-2xl shadow-lg overflow-hidden w-full aspect-square ${
      onClick ? "cursor-pointer" : ""
    }`}
  >
    <img
      src={celeb.image}
      alt={celeb.name}
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute bottom-0 left-0 w-full h-fit pt-6 p-2 bg-gradient-to-t from-black/80 to-transparent">
      <h2 className="text-lg text-white font-semibold">{celeb.name}</h2>
    </div>
  </div>
);

export default CelebCard;
