import Image from "next/image";
import { Container } from "@/components/ui";

const testimonial = {
  name: "Jonathon Doe",
  handle: "@daviswin",
  quote:
    "The 3-tap setup was incredible. We had AR running on our sneaker store in under 10 minutes. Sales increased 94% for AR-enabled products.",
};

// 12 cards → 4 rows × 3 cols
const items = Array.from({ length: 12 }, () => testimonial);

export default function TestimonialSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[520px] h-[520px] bg-purple-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[520px] h-[520px] bg-orange-100/30 rounded-full blur-[120px]" />
      </div>

      <Container size="xl" className="relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1c20] mb-4">
            Join thousands of{" "}
            <span className="text-gray-400 font-medium">
              successful stores
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            See how leading e-commerce brands are transforming their customer
            experience with TryonAR
          </p>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-h-[720px] overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        >
          {items.map((item, i) => {
            const rowIndex = Math.floor(i / 3);

            const isFaded = rowIndex === 0 || rowIndex === 3;

            return (
              <div
                key={i}
                className={`bg-white border border-gray-100 rounded-[28px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between transition-opacity duration-300 ${
                  isFaded ? "opacity-40" : "opacity-100"
                }`}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, starI) => (
                    <svg
                      key={starI}
                      className="w-4 h-4 text-orange-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 text-[15px] leading-relaxed mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                    <Image
                      src="/api/placeholder/40/40"
                      alt={item.name}
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400 font-medium">
                      {item.handle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
