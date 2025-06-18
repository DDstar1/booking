import Image from "next/image";

const CelebCard = ({ celeb }) => (
  <div className=" bg-white relative rounded-2xl shadow-lg overflow-hidden w-full aspect-square">
    <Image src={celeb.image} alt={celeb.name} layout="fill" objectFit="cover" />
    <div className="absolute bottom-0 left-0 w-full h-fit p-2 bg-gradient-to-t from-black/60 to-transparent">
      <h2 className="text-lg text-white font-semibold">{celeb.name}</h2>
    </div>
  </div>
);

export default CelebCard;
