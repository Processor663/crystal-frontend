import { memo } from "react";
import { BsActivity } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCube, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

//Icons
import { PiChartPieSliceLight } from "react-icons/pi";
import { LiaVoteYeaSolid } from "react-icons/lia";
import { Wrapper } from "./LeadingCandidates.styles";

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

const votesCast = 1847491;
const registeredVoters = 2491200;

export default memo(function LeadingCandidates({
  candidates = defaultCandidates,
  updatedEverySeconds = 30,
}: LeadingCandidatesProps) {
  const turnoutPercent =
    registeredVoters > 0 ? (votesCast / registeredVoters) * 100 : 0;
  const displayPercent = Math.min(turnoutPercent, 100);
  return (
    <Wrapper>
      <div className="w-full rounded-2xl border border-border bg-surface pt-0 sticky top-0">
        <div className="pt-5 px-2 rounded-2xl flex items-center gap-2 sticky top-0 bg-surface">
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
            speed={1000}
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
              <div className=" text-text">
                <div className="flex flex-col items-center justify-center gap-5 pt-5 ">
                  <div className="bg-accent grid place-content-center w-25 h-25 rounded-full border border-border">
                    <div>AC</div>
                  </div>
                  <p className="bg-surface2 py-2 px-8 border border-border rounded-2xl text-accent">
                    President
                  </p>
                </div>
                <div className="flex border border-border border-r-0 border-l-0 mt-5">
                  <div className="flex items-center justify-center gap-1 border-r border-border w-[50%] p-2">
                    <div>
                      <LiaVoteYeaSolid size={20} className=" text-green" />
                    </div>
                    <div className="leading-3">
                      <p className="text-[.6rem] text-muted">TOTAL VOTES:</p>
                      <small className="text-xs"> 10,000</small>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1 w-[50%]">
                    <div>
                      <PiChartPieSliceLight size={20} className=" text-green" />
                    </div>
                    <div className="leading-3">
                      <p className="text-[.6rem] text-muted">TOTAL SHARE:</p>
                      <small className="text-xs text-green"> 10%</small>
                    </div>
                  </div>
                </div>
                <div className="px-2">
                  <div className="mt-10 mb-5 h-2 w-full overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-[#7C6AF4] to-[#A78BFA] transition-all duration-500"
                      style={{ width: `${displayPercent}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-center pb-15 bg-surface rounded-b-2xl">
                  <p className="">Leading by 209 votes</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className=" text-text">
                <div className="flex flex-col items-center justify-center gap-5 pt-5 ">
                  <div className="bg-accent grid place-content-center w-25 h-25 rounded-full border border-border">
                    <div>AC</div>
                  </div>
                  <p className="bg-surface2 py-2 px-8 border border-border rounded-2xl text-accent">
                    President
                  </p>
                </div>
                <div className="flex border border-border border-r-0 border-l-0 mt-5">
                  <div className="flex items-center justify-center gap-1 border-r border-border w-[50%] p-2">
                    <div>
                      <LiaVoteYeaSolid size={20} className=" text-green" />
                    </div>
                    <div className="leading-3">
                      <p className="text-[.6rem] text-muted">TOTAL VOTES:</p>
                      <small className="text-xs"> 10,000</small>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1 w-[50%]">
                    <div>
                      <PiChartPieSliceLight size={20} className=" text-green" />
                    </div>
                    <div className="leading-3">
                      <p className="text-[.6rem] text-muted">TOTAL SHARE:</p>
                      <small className="text-xs text-green"> 10%</small>
                    </div>
                  </div>
                </div>
                <div className="px-2">
                  <div className="mt-10 mb-5 h-2 w-full overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-[#7C6AF4] to-[#A78BFA] transition-all duration-500"
                      style={{ width: `${displayPercent}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-center pb-15 bg-surface rounded-b-2xl">
                  <p className="">Leading by 209 votes</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </Wrapper>
  );
});
