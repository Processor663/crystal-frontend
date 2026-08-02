import { memo } from "react";
import { BsActivity } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

//Icons
import { Wrapper } from "./LeadingCandidates.styles";

export interface Candidate {
  name: string;
  votes: number;
}

interface LeadingCandidateProps {
  id: string;
  position: string;
  totalVotes: number;
  candidates: Candidate[];
}

const LeadingCandidate: LeadingCandidateProps[] = [
  {
    id: "president",
    position: "President",
    totalVotes: 5213,
    candidates: [{ name: "O Chukwuemeka NwaChuwuemeka", votes: 3213 }],
  },
  {
    id: "secretary",
    position: "Secretary",
    totalVotes: 2000,
    candidates: [{ name: "Mary Emenike", votes: 800 }],
  },
  {
    id: "sug-pro",
    position: "SUG PRO",
    totalVotes: 1000,
    candidates: [{ name: "Mary Chukwuemeka", votes: 800 }],
  },
  {
    id: "Treasurer",
    position: "Treasurer",
    totalVotes: 1004,
    candidates: [{ name: "Esther Divine", votes: 154 }],
  },
  {
    id: "Vice-President",
    position: "Vice-President",
    totalVotes: 1004,
    candidates: [{ name: "Favour Nwaokocha", votes: 104 }],
  },
  {
    id: "Assistant-Sec.Gen",
    position: "Assistant-Sec. Gen",
    totalVotes: 1004,
    candidates: [{ name: "joy lazarous", votes: 100 }],
  },
];

function formatNumber(n: number) {
  return n.toLocaleString("en-US");
}

export default memo(function LeadingCandidates() {
  return (
    <Wrapper>
      <div className="w-full p-5 rounded-2xl border border-border bg-surface pt-0  pb-5 sticky top-0">
        <div className="pt-5 rounded-2xl flex items-center gap-2 sticky top-0 bg-surface">
          <BsActivity className="h-5 w-5 text-[#7C6AF4]" />
          <div>
            <h2 className="text-base font-semibold text-white">
              Leading Candidates
            </h2>
            <p className="text-xs text-slate-400">Updated every 30 seconds</p>
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
            grabCursor={true}
            pagination={true}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            {LeadingCandidate.map((candidate) => (
              <SwiperSlide>
                <div className=" text-text">
                  <div className="flex flex-col items-center justify-center gap-5 pt-5 ">
                    <div className="bg-accent grid place-content-center w-25 h-25 rounded-full border border-border">
                      <div>AC</div>
                    </div>
                    <p className="w-full text-center bg-surface2 py-2 px-8 border border-border rounded-2xl text-slate-400">
                      {candidate.position?.toUpperCase()}
                    </p>
                    <h3 className="truncate max-w-[90%]">
                      {candidate.candidates[0].name?.toUpperCase()}
                    </h3>
                  </div>
                  <div>
                    <div className="mt-5 mb-5 h-2 w-full overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-[#7C6AF4] to-[#A78BFA] transition-all duration-500"
                        style={{
                          width: Math.min(
                            (candidate.candidates[0].votes /
                              candidate.totalVotes) *
                              100,
                            100,
                          ),
                        }}
                      />
                    </div>
                  </div>
                  <dl className="space-y-3 pb-13">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-slate-400">Total Votes</dt>
                      <dd className="text-sm  text-white">
                        {formatNumber(candidate.totalVotes)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-slate-400">Vote Share</dt>
                      <dd className="text-sm  text-white">
                        {candidate.totalVotes > 0
                          ? (
                              (candidate.candidates[0].votes /
                                candidate.totalVotes) *
                              100
                            ).toFixed(1)
                          : "0.0%"}
                        %
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-slate-400">Leading by</dt>
                      <dd className="text-sm  text-white">
                        {`${formatNumber(candidate.candidates[0].votes)} votes`}
                      </dd>
                    </div>
                  </dl>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </Wrapper>
  );
});
