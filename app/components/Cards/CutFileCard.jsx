import Image from "next/image";

export default function CutFileCard({ title, description, image, imageAlt }) {
  return (
    <article className="flex gap-4 items-start bg-white rounded-xl p-4 shadow-sm border border-white/30">
      <div className="flex-shrink-0">
        <Image
          src={image}
          alt={imageAlt || title}
          width={56}
          height={56}
          className="rounded-md object-cover"
          priority={false}
        />
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
        <p className="text-xs text-slate-500 mt-2 leading-5">{description}</p>
      </div>
    </article>
  );
}
