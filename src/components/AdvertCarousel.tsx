import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { Advert } from '../common/types/Advert';

interface AdvertCarouselProps {
  adverts: Advert[];
}

export default function AdvertCarousel({ adverts }: AdvertCarouselProps) {
  if (!adverts || adverts.length === 0) {
    return <p className="text-center text-gray-500">No adverts yet.</p>;
  }
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={24}
      slidesPerView={2}
      breakpoints={{
        0: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
      }}
      className="my-8"
    >
      {adverts.map((advert) => (
        <SwiperSlide key={advert.id}>
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center max-w-md mx-auto">
            <img src={advert.photo} alt={advert.title} className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="text-lg font-semibold">{advert.title}</h3>
            <p className="text-gray-600 mt-1 text-center">{advert.description}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
} 