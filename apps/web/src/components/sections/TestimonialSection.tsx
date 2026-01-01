'use client';
import Image from "next/image";
import { Container } from "@/components/ui";

const testimonials = [
  {
    name: "Jonathon Doe",
    handle: "@daviswin",
    quote:
      "The 3-tap setup was incredible. We had AR running on our sneaker store in under 10 minutes. Sales increased 94% for AR-enabled products.",
    image: "/head1.jpg",
  },
  {
    name: "Sarah Lee",
    handle: "@sarahlee",
    quote:
      "TryonAR made our sunglasses launch a hit. Customers loved the virtual try-on, and our returns dropped by 40%.",
    image: "/head2.jpg",
  },
  {
    name: "Carlos Mendez",
    handle: "@carlitos",
    quote:
      "Integration was seamless. Our conversion rate improved instantly. Highly recommend for any e-commerce store!",
    image: "/head3.jpg",
  },
  {
    name: "Priya Singh",
    handle: "@priyasingh",
    quote:
      "Our customers are spending more time on product pages and sharing their try-on photos. Engagement is up 3x!",
    image: "/head4.jpg",
  },
  {
    name: "Emily Chen",
    handle: "@emchen",
    quote:
      "We saw a 60% increase in AR-enabled product sales. The setup was so easy, even for our small team.",
    image: "/head1.jpg",
  },
  {
    name: "David Kim",
    handle: "@davidkim",
    quote:
      "TryonAR gave us a competitive edge. Our sneaker drops now sell out faster than ever.",
    image: "/head2.jpg",
  },
];

const items = testimonials.slice(0, 8);
const PLACEHOLDER_COUNT = 3;

function PlaceholderCard({ className }: { className?: string }) {
  return (
    <div
      className={`bg-white h-[269px] rounded-[28px] border border-[#d7d7d7] opacity-40 ${className ?? ''}`}
      style={{
        background: "linear-gradient(180deg, #F8F8F9 71.75%, #FFF 100%)",
        boxShadow: "0 10px 16px rgba(209,203,215,0.12)",
      }}
    />
  );
}

export default function TestimonialSection() {
  return (
    <section className="relative py-24 bg-[#F8F8F9] overflow-hidden z-10">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[520px] h-[520px] bg-purple-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[520px] h-[520px] bg-orange-100/30 rounded-full blur-[120px]" />
      </div>

      <Container size="xl" className="relative z-10">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1c20] mb-4">
            Join thousands of{" "}
            <span className="text-gray-400 font-medium">successful stores</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            See how leading e-commerce brands are transforming their customer experience with TryonAR
          </p>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-h-[880px] overflow-hidden"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        >
          {/* Top placeholders */}
          {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
            <PlaceholderCard key={`top-${i}`} className="hidden lg:block md:-mt-[180px]" />
          ))}

          {/* Testimonials */}
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-[28px] p-8 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg
                    key={s}
                    className="w-4 h-4 text-orange-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 text-[15px] leading-relaxed mb-6">&ldquo;{item.quote}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover grayscale"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-400 font-medium">{item.handle}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Bottom placeholders */}
          {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
            <PlaceholderCard key={`bottom-${i}`} className="hidden lg:block -mb-[180px]" />
          ))}
        </div>
      </Container>
    </section>
  );
}
