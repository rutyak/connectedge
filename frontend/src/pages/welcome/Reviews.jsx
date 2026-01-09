import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import Card from "./Card";

function Reviews() {
  const reviews = [
    {
      id: 1,
      name: "Raghav Shrivastav",
      position: "Web Designer",
      rating: 5,
      text: "ConnectEdge revolutionized my job search! The AI matching is incredibly accurate. I landed my dream job within 2 weeks. The interview prep resources were especially helpful.",
    },
    {
      id: 2,
      name: "Priya Patel",
      position: "Frontend Developer",
      rating: 4,
      text: "As a female developer, I was hesitant about job platforms, but ConnectEdge's inclusive approach impressed me. The skill-based matching connected me with companies that truly valued my expertise.",
    },
    {
      id: 3,
      name: "Arjun Menon",
      position: "Frontend Developer",
      rating: 5,
      text: "The coding challenge feature is brilliant! It helped me showcase my skills beyond just my resume. I received multiple interview requests within days.",
    },
    {
      id: 4,
      name: "Neha Gupta",
      position: "Frontend Developer",
      rating: 5,
      text: "Salary transparency saved me so much time. No more long interviews only to find the compensation wasn’t competitive. I got a 30% salary bump!",
    },
    {
      id: 5,
      name: "Karan Singh",
      position: "DevOps Engineer",
      rating: 4,
      text: "The platform is great and the matching algorithm connected me with a Series B startup that aligned perfectly with my DevOps and cloud skills.",
    },
    {
      id: 6,
      name: "Ananya Sharma",
      position: "Software Engineer",
      rating: 5,
      text: "As a recent grad, I struggled to get noticed. ConnectEdge helped optimize my profile and I received three offers within a month!",
    },
  ];

  return (
    <section
      data-testid="review"
      className="
        relative
        w-full
        overflow-hidden
        px-4 py-8 sm:px-6 sm:py-15
        backgrop-blur-md
        text-slate-300
        bg-[#EEF4FF]
      "
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full" />
      </div>

      <div className="mb-8 sm:mb-16 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-700">
          Loved by professionals worldwide
        </h2>
        <p className="text-xs px-6 sm:px-0 sm:text-sm mt-4 max-w-xl mx-auto text-slate-400">
          Real stories from developers who landed better opportunities using
          ConnectEdge
        </p>
      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        className="pb-12"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <Card {...review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Reviews;
