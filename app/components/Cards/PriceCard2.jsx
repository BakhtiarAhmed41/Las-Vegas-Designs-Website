export default function PriceCard({
  title,
  startingPrice,
  maxPrice,
  maxPriceNote,
  features,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 w-full  md:max-w-xs mx-auto border border-gray-200">
      {/* Title */}
      <h3 className="text-xl font-bold text-center uppercase">{title}</h3>

      {/* Prices */}
      <div className="text-center mt-3">
        <p className="text-3xl font-bold">{startingPrice}</p>
        <p className="text-sm font-semibold text-gray-500">STARTING PRICE</p>

        {maxPrice && (
          <>
            <p className="text-2xl font-bold mt-2">{maxPrice}</p>
            <p className="text-sm font-semibold text-gray-500">
              {maxPriceNote}
            </p>
          </>
        )}

        {!maxPrice && (
          <p className="text-sm font-semibold text-gray-500 mt-2">
            {maxPriceNote}
          </p>
        )}
      </div>

      {/* Features Box */}
      <div className="bg-black text-white rounded-3xl p-5 mt-4 text-sm leading-relaxed">
        {features.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );
}
