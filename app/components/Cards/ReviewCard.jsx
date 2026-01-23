import Image from "next/image";

export default function ReviewCard({ review }) {
  return (
    <div className="relative rounded-lg shadow p-5 w-full h-60 my-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-3">
        <Image
          src={review.avatar}
          width={60}
          height={60}
          alt={review.name}
          className="rounded-full object-cover object-center w-10 h-10"
        />
        <div>
          <h3 className="font-semibold">{review.name}</h3>
          <p className="text-gray-500 text-sm">{review.date}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="text-yellow-500 text-lg mb-2">
        {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
      </div>

      {/* Review Text */}
      <p className="text-gray-700 mb-4 text-sm">{review.comment}</p>

      {/* Etsy footer */}
      <div className="flex items-center gap-2 text-sm absolute bottom-3">
        <Image
          src="/assets/logos/etsy.png"
          width={25}
          height={25}
          alt="Etsy icon"
          className="rounded"
        />
        <div className="flex flex-col">
          <span className="text-gray-500 text-xs">Posted on</span>

          <a
            href="https://www.etsy.com"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Etsy
          </a>
        </div>
      </div>
    </div>
  );
}
