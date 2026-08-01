
import { memo } from "react";
import { BsActivity } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCube, Pagination } from "swiper/modules";



// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";



// import required modules

interface CandidateData {
  name: string;
  votes: number;
}

export interface Candidates {
  id: string;
  name: string;
  candidates: CandidateData[];
}

interface LeadingCandidatesProps {
  candidates?: Candidates[];
  updatedEverySeconds?: number;
}

const defaultCandidates = [
  {
    id: "president",
    name: "President",
    candidates: [
      { name: "O Chukwuemeka NwaChuwuemeka", votes: 5213 },
      { name: "Uche", votes: 4213 },

      { name: "Emma", votes: 5213 },
      { name: "Uche", votes: 4213 },
    ],
  },
  {
    id: "secretary",
    name: "Secretary",
    candidates: [
      { name: "Mary Emenike", votes: 800 },
      { name: "James jude", votes: 600 },
    ],
  },
  {
    id: "sug-pro",
    name: "SUG PRO",
    candidates: [
      { name: "Mary Chukwuemeka", votes: 800 },
      { name: "James Chukwuemeka", votes: 600 },
    ],
  },
  {
    id: "Treasurer",
    name: "Treasurer",
    candidates: [
      { name: "Mary Chukwuemeka", votes: 1004 },
      { name: "James Mike", votes: 1 },
    ],
  },
  {
    id: "Vice-President",
    name: "Vice-President",
    candidates: [
      { name: "Mary Chukwuemeka", votes: 1004 },
      { name: "James Chukwuemeka", votes: 200 },
    ],
  },
  {
    id: "Assistant-Sec.Gen",
    name: "Assistant-Sec.Gen",
    candidates: [
      { name: "Chukwuemeka Mary", votes: 1004 },
      { name: "Chukwuemeka James", votes: 200 },
    ],
  },
];

export default memo(function LeadingCandidates({
  candidates = defaultCandidates,
  updatedEverySeconds = 30,
}: LeadingCandidatesProps) {
  return (
    <div className="w-full rounded-2xl border border-border bg-surface p-6 pt-0 shadow-lg sticky top-0  max-h-100">
      <div className="mb-4 pt-5  flex items-center gap-2 sticky top-0 bg-surface">
        <BsActivity className="h-5 w-5 text-[#7C6AF4]" />
        <div>
          <h2 className="text-base font-semibold text-white">
            Leading Candidates
          </h2>
          <p className="text-xs text-slate-400">
            Updated every {updatedEverySeconds} seconds
          </p>
        </div>
      </div>
      <div className="">
        <Swiper
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          effect={"cube"}
          grabCursor={true}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          pagination={true}
          modules={[Autoplay, EffectCube, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="bg-bg text-text p-5">
              <div className="flex flex-col items-center justify-center gap-5">
                <div className="grid place-content-center w-30 h-30 rounded-full border border-border">
                  <div>AC</div>
                </div>
                <p className="bg-surface2 py-2 px-8 border border-border rounded-2xl text-accent">President</p>
              </div>
            </div>
          </SwiperSlide>
         
        </Swiper>
      </div>
    </div>
  );
});
