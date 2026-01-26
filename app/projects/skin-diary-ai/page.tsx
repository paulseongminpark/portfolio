import Image from "next/image";

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-[12px] text-black/60">
    {children}
  </span>
);

const SectionTitle = ({
  eyebrow,
  title,
  desc,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
}) => (
  <div className="mb-6">
    {eyebrow ? <p className="text-[12px] text-black/45">{eyebrow}</p> : null}
    <h2 className="mt-2 text-[18px] font-semibold tracking-[-0.2px]">{title}</h2>
    {desc ? <p className="mt-3 text-[13.5px] leading-7 text-black/60">{desc}</p> : null}
  </div>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-[22px] border border-black/10 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_30px_rgba(0,0,0,0.06)]">
    {children}
  </div>
);

const ImgCard = ({
  src,
  alt,
  caption,
  aspect = "16/9",
}: {
  src: string;
  alt: string;
  caption?: string;
  aspect?: "16/9" | "4/3" | "1/1" | "21/9";
}) => {
  const aspectClass =
    aspect === "21/9"
      ? "aspect-[21/9]"
      : aspect === "4/3"
      ? "aspect-[4/3]"
      : aspect === "1/1"
      ? "aspect-square"
      : "aspect-[16/9]";

  return (
    <div className="rounded-[22px] border border-black/10 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_30px_rgba(0,0,0,0.06)]">
      <div
        className={`relative ${aspectClass} w-full overflow-hidden rounded-[16px] border border-black/10 bg-black/[0.02]`}
      >
        <Image src={src} alt={alt} fill className="object-contain" />
      </div>
      {caption ? (
        <p className="mt-3 text-[12.5px] leading-6 text-black/55">{caption}</p>
      ) : null}
    </div>
  );
};

const SpecRow = ({ k, v }: { k: string; v: React.ReactNode }) => (
  <div className="flex items-start justify-between gap-4 border-b border-black/10 py-3 last:border-b-0">
    <p className="text-[12px] text-black/45">{k}</p>
    <div className="text-right text-[13px] leading-6 text-black/70">{v}</div>
  </div>
);

const VideoCard = ({
  src,
  caption,
  className = "",
}: {
  src: string;
  caption?: string;
  className?: string;
}) => (
  <div
    className={
      "rounded-[22px] border border-black/10 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_30px_rgba(0,0,0,0.06)] " +
      className
    }
  >
    <div className="overflow-hidden rounded-[16px] border border-black/10 bg-black/[0.02]">
      <video className="h-auto w-full" controls playsInline preload="metadata">
        <source src={src} type="video/mp4" />
        브라우저가 video 태그를 지원하지 않습니다.
      </video>
    </div>
    {caption ? (
      <p className="mt-3 text-[12.5px] leading-6 text-black/55">{caption}</p>
    ) : null}
  </div>
);

// Takeaways 내부에서 쓸 인용구 스타일 컴포넌트
const TakeawayItem = ({
  idx,
  title,
  quote,
  desc,
}: {
  idx: string;
  title: string;
  quote: string;
  desc: string;
}) => (
  <div className="group">
    <p className="text-[12px] font-medium text-black/45">{idx}. {title}</p>
    <div className="mt-2 border-l-2 border-black/5 pl-3">
      <p className="text-[13.5px] font-medium leading-6 text-black/80 italic">
        {quote}
      </p>
    </div>
    <p className="mt-2 text-[13.5px] leading-7 text-black/60">{desc}</p>
  </div>
);

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-black">
      <main className="mx-auto max-w-[1040px] px-6 pb-20">
        {/* Hero */}
        <section className="pt-14 pb-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              <Pill>PROJECT 01</Pill>
              <Pill>AI · Data</Pill>
              <Pill>Decision Layer</Pill>
              <Pill>Streamlit · Oracle</Pill>
            </div>

            <h1 className="text-[40px] leading-[1.08] tracking-[-1.2px] font-semibold">
              Skin Diary AI
              <br />
              사진·날씨·기록을 “관리 판단”으로 바꾸는 스킨케어 의사결정 시스템
            </h1>

            <p className="max-w-[92ch] text-[15px] leading-8 text-black/60">
              피부 관리는 쉽게 “좋아졌다/나빠졌다” 같은 인상 평가로 끝나고, 날씨
              같은 외부 변수는 루틴에 체계적으로 반영되지 않는 경우가 많습니다.
              이 프로젝트는 피부 상태를 시간에 따른 상태(State)의 연속으로 보고,
              이미지 분석과 환경 데이터를 결합해 사용자가 “무엇을 해야
              하는지”가 아니라 “어떤 근거로 판단해야 하는지”를 이해하도록 돕는
              구조를 목표로 설계했습니다.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="/projects"
                className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-[13px] font-medium text-black/70 hover:text-black transition"
              >
                Back to Projects
              </a>
              <a
                href="#demo"
                className="inline-flex h-10 items-center justify-center rounded-full bg-black px-5 text-[13px] font-medium text-white hover:opacity-90 transition"
              >
                제품 데모 보기
              </a>
            </div>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* 1) Problem Definition */}
        <section className="py-10">
          <SectionTitle
            eyebrow="PROBLEM"
            title="문제 정의"
            desc="피부를 ‘한 번의 상태’로 보는 순간, 관리는 사건 단위의 반응으로 끝납니다. 이 프로젝트는 피부를 ‘시간에 따른 상태의 연속’으로 재정의하고, 그 상태를 판단할 기준을 시스템으로 구성하는 데 초점을 두었습니다."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <p className="text-[12px] text-black/45">관찰된 한계</p>
              <ul className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                <li>• 피부 상태가 단일 사진/단일 시점의 인상 평가로 고정됨</li>
                <li>
                  • 날씨·환경 변수가 루틴 의사결정에 분리되어 반영되지 않음
                </li>
                <li>
                  • 추천은 존재하나, 사용자가 “판단 근거”를 이해하기 어려움
                </li>
              </ul>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">해결 방향</p>
              <ul className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                <li>• 피부를 “시간에 따른 상태(State) 연속”으로 재정의</li>
                <li>• 이미지 분석 + 환경 데이터 결합으로 조건 기반 판단층 구성</li>
                <li>• 결과를 누적 기록하여 변화/반복 패턴을 읽을 수 있게 설계</li>
              </ul>
            </Card>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* 2) Structural Insight */}
        <section className="py-10">
          <SectionTitle
            eyebrow="STRUCTURE"
            title="구조적 인식"
            desc="이 프로젝트의 핵심은 ‘예측 결과’가 아니라 ‘판단 체계’입니다. 사용자가 결과를 소비하는 것이 아니라, 결과가 만들어지는 조건과 기준을 함께 보도록 설계했습니다."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <ImgCard
              src="/images/projects/skin-diary-ai/workflow.png"
              alt="Skin Diary AI 사용자 흐름 / 전체 플로우"
              caption="사용자 흐름과 기능 단계를 한 장으로 연결: 사진 업로드 → 분석 → 기록 → 루틴/성분 판단으로 이어지는 구조"
              aspect="21/9"
            />
            <Card>
              <p className="text-[12px] text-black/45">
                의사결정층(Decision Layer) 설계 원칙
              </p>
              <div className="mt-4 space-y-4 text-[13.5px] leading-7 text-black/60">
                <div className="border-l border-black/10 pl-3">
                  <p className="text-[13px] font-medium text-black/75">1) 분해</p>
                  <p className="mt-1">
                    감각적 판단(건조함/자극/트러블)을 단일 문장 추천이 아니라,
                    조건·점수·라벨로 분해합니다.
                  </p>
                </div>
                <div className="border-l border-black/10 pl-3">
                  <p className="text-[13px] font-medium text-black/75">2) 결합</p>
                  <p className="mt-1">
                    피부 결과만 보지 않고, 날씨(온도/습도 등) 같은 외부 변수와
                    함께 판단하도록 결합합니다.
                  </p>
                </div>
                <div className="border-l border-black/10 pl-3">
                  <p className="text-[13px] font-medium text-black/75">3) 누적</p>
                  <p className="mt-1">
                    하루의 “정답”이 아니라, 기록 누적으로 “패턴”을 보게 하여 루틴
                    정착을 지원합니다.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* 3) Technical Implementation */}
        <section className="py-10">
          <SectionTitle
            eyebrow="IMPLEMENTATION"
            title="기술 구현"
            desc="기술 파트는 ‘신뢰 확보’에 필요한 만큼만 보여주고, 나머지는 시스템 구조와 사용자 출력으로 설득하도록 구성했습니다."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <ImgCard
              src="/images/projects/skin-diary-ai/bounding.png"
              alt="바운딩 박스 및 ROI 예시"
              caption="얼굴/부위 바운딩(ROI) 생성 예시: 부위별 분석을 위한 전처리 단계"
            />
            <ImgCard
              src="/images/projects/skin-diary-ai/heatmap.png"
              alt="분석 결과 히트맵"
              caption="부위별 점수 히트맵 출력: 한 장의 결과가 아니라 ‘어디가 어떻게 변했는지’를 보이도록 설계"
            />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <Card>
              <p className="text-[12px] text-black/45">분류(라벨)</p>
              <div className="mt-3">
                <SpecRow k="방식" v="앙상블(Soft Voting) 기반 분류" />
                <SpecRow k="구성" v="XGBoost + LightGBM + RandomForest" />
                <SpecRow k="선정" v="가중치 후보 탐색 후 Macro F1 기준" />
              </div>
            </Card>
            <Card>
              <p className="text-[12px] text-black/45">회귀(점수)</p>
              <div className="mt-3">
                <SpecRow k="방식" v="VotingRegressor" />
                <SpecRow k="구성" v="LGBM + XGB + RandomForest" />
                <SpecRow k="평가" v="RMSE(수치), Accuracy/F1(범주)" />
              </div>
            </Card>
            <Card>
              <p className="text-[12px] text-black/45">출력 형태</p>
              <ul className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                <li>• 점수/라벨(판단 가능한 값)</li>
                <li>• 부위별 시각화(히트맵)</li>
                <li>• 추천/조언(조건 기반)</li>
              </ul>
            </Card>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* 4) Decision System */}
        <section className="py-10">
          <SectionTitle
            eyebrow="DECISION SYSTEM"
            title="추천을 ‘조건 기반 판단’으로 바꾸는 구조"
            desc="모델 출력(관측)과 룰/정책(운영 판단)을 분리하고, 추천의 근거와 실행 이력이 추적 가능하도록 저장 구조를 설계했습니다."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <ImgCard
              src="/images/projects/skin-diary-ai/erd.png"
              alt="Skin Diary AI ERD"
              caption="ERD: 사진 → 분석 결과 → 룰/태그 → 추천 실행 로그가 연결되어, 추천의 근거와 이력이 추적 가능하도록 설계"
              aspect="21/9"
            />

            <Card>
              <p className="text-[12px] text-black/45">핵심 테이블(요약)</p>
              <div className="mt-3 text-[13.5px] leading-7 text-black/60">
                <ul className="space-y-2">
                  <li>• APP_USER.SKIN_PHOTO: 업로드 사진/메타데이터</li>
                  <li>
                    • ML.ANALYSIS_METRIC_RESULT: 모델 분석 결과(라벨/점수)
                  </li>
                  <li>
                    • APP_USER.ANALYSIS_RESULTS: 최종 리포트(JSON) 및 추천 연동
                  </li>
                  <li>
                    • ML.RECOMMEND_RUN / ML.RECOMMENDED_INGREDIENT: 추천 실행
                    로그/제안 성분
                  </li>
                </ul>
                <p className="mt-4 text-[12.5px] leading-6 text-black/55">
                  이 구조를 통해 “오늘 한 번 추천”이 아니라, 추천의
                  근거·기준·실행 이력이 누적되는 기록 시스템으로 작동하도록
                  설계했습니다.
                </p>
              </div>
            </Card>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* 5) Product Output */}
        <section className="py-10">
          <SectionTitle
            eyebrow="OUTPUT"
            title="사용자 화면에서 ‘판단’이 보이도록"
            desc="결과를 ‘정답’으로 주지 않고, 점수·라벨·조언·성분이 같은 기준 체계에서 연결되도록 화면을 구성했습니다."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <ImgCard
              src="/images/projects/skin-diary-ai/ui_analyzer.png"
              alt="분석 및 추천 UI"
              caption="분석 결과(점수/라벨/히트맵)와 추천(성분/루틴)이 한 화면에서 연결되도록 구성"
              aspect="21/9"
            />
            <ImgCard
              src="/images/projects/skin-diary-ai/weather_advice.png"
              alt="날씨 연동 조언 화면"
              caption="날씨 정보(기상청 API) 연동 + 관리 조언 출력: 외부 변수를 판단 기준에 포함"
              aspect="21/9"
            />
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* 6) Demo Video */}
        <section id="demo" className="py-10">
          <SectionTitle
            eyebrow="DEMO"
            title="제품 데모"
            desc="실제 동작 화면을 통해, 분석→추천→조언→기록이 한 흐름으로 연결되는 경험을 확인할 수 있습니다."
          />

          <VideoCard
            src="/images/projects/skin-diary-ai/product_demo.mp4"
            caption="Product Demo: 사진 업로드 → 분석 → 추천/조언 → 기록 확인 흐름"
            className="mx-auto max-w-[360px]"
          />
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* TAKEAWAYS */}
        <section className="py-10">
          <SectionTitle
            eyebrow="TAKEAWAYS"
            title="이 프로젝트에서 확립한 문제 해결 기준"
            desc="배운 점을 다음 문제에도 그대로 재사용 가능한 ‘설계 기준’으로 정리했습니다. 먼저 압축본으로 핵심을 보고, 아래에서 문제-해결의 원문 전체를 확인할 수 있습니다."
          />

          {/* 1) 압축본: 카드 6개 */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <p className="text-[12px] text-black/45">1) 결정의 디테일</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                YOLO가 점(Mole)까지 트러블로 오탐하는 문제를 마주하며,
                정확도보다 “황당한 1%를 막는 Fail-safe”가 신뢰를 만든다는 기준을
                확립했습니다. Voting 앙상블과 ‘판독 불가’ 분기(조도 불량)를
                통해 서비스 레벨 안전장치를 설계했습니다.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">2) 맥락(Context) 설계</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                LLM이 뻔한 조언만 반복하던 문제를 “어제 대비 하락폭(Delta)” 같은
                상황 변수를 프롬프트에 주입해 해결했습니다. 핵심은 데이터
                수집이 아니라, AI가 “왜 지금 이 말이 필요한지” 이해하도록
                맥락을 설계하는 일임을 배웠습니다.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">3) 스키마 설득의 과정</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                JSON 전부 저장 vs 정규화 논쟁에서, 미래 기능(커머스 매핑/28일
                그래프/0.5초 조회)을 근거로 정규화를 선택했습니다. METRIC_RESULT
                분리 설계로 조회 성능과 확장성을 동시에 확보하며, DB는 미래
                병목을 제거하는 전략 설계임을 체득했습니다.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">4) 색채 심리학</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                빨간색 경고는 사용자를 움직이기보다 겁먹게 만들 수 있음을 베타
                테스트로 확인했습니다. Tea Rose(#F4ACB7)로 톤을 재설계해
                ‘위험’이 아니라 ‘케어 필요’로 의미를 번역했고, UI는 인지·심리
                비용을 낮추는 통역이라는 관점을 확립했습니다.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">5) 성장형 제품</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                한 번의 진단은 잊히지만, 시계열 추세(변화의 방향)는 사용자를
                남게 합니다. 분석–저장–피드백 루프를 완성해 데이터가 로그가
                아니라 리텐션 자산이 되도록 설계했습니다.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">6) 문제 해결의 원형</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                이 프로젝트의 본질은 스킨케어가 아니라 불확실한 진단(Vision) +
                외부 변수(API) + 최적해 제안(LLM)의 의사결정 템플릿입니다.
                상태가 변하고 외부 요인이 개입하는 문제(스마트팩토리/핀테크
                등)로 확장 가능한 개인 템플릿을 확보했습니다.
              </p>
            </Card>
          </div>

          {/* 2) 원문 전체: details */}
          <div className="mt-8">
            <details className="rounded-[22px] border border-black/10 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_30px_rgba(0,0,0,0.06)] group/details">
              <summary className="cursor-pointer select-none text-[14px] font-medium text-black/80 hover:text-black transition flex items-center gap-2">
                <span className="group-open/details:rotate-90 transition-transform duration-200">
                  ▶
                </span>
                Takeaways 원문 전체 보기 (Problems &amp; Solutions)
              </summary>

              <div className="mt-8 space-y-10">
                <TakeawayItem
                  idx="1"
                  title="확률의 오해를 없애는 ‘결정의 디테일’"
                  quote="“점(Mole)을 여드름으로 인식하는 모델, 그대로 서비스할 수 있을까?”"
                  desc="개발 초기, YOLO 모델이 사용자의 얼굴에 있는 매력점까지 ‘트러블’로 인식하는 오탐(False Positive) 문제가 심각했습니다. 단순히 학습 데이터를 늘리는 것만으로는 한계가 있었기에, Voting 앙상블로 모델의 판단력을 보완하고, 조도(Lighting) 품질이 낮은 사진은 아예 ‘판독 불가’로 처리하는 후처리 로직을 도입했습니다. AI 서비스의 신뢰도는 99%의 정확도보다, 1%의 황당한 실수를 막는 안전장치(Fail-safe) 설계에서 온다는 것을 배웠습니다."
                />

                <TakeawayItem
                  idx="2"
                  title="앵무새를 비서로 만드는 ‘맥락(Context) 설계’"
                  quote="“단순히 날씨 정보를 줬더니, ‘물 많이 드세요’라는 뻔한 말만 반복했다.”"
                  desc="처음 LangChain을 도입했을 때, LLM은 기계적인 조언만 내놓았습니다. 이를 해결하기 위해 단순 환경 변수가 아닌, ‘사용자의 어제 점수 대비 하락폭(Delta)’을 프롬프트 변수로 추가했습니다. 그러자 모델이 “어제보다 수분이 급격히 떨어졌으니, 오늘은 평소보다 보습에 신경 쓰세요”라며 사용자의 상황에 반응하기 시작했습니다. 데이터 엔지니어링의 핵심은 데이터 수집이 아니라, AI가 ‘지금 이 말이 왜 필요한지’ 이해하게 만드는 맥락의 주입임을 깨달았습니다."
                />

                <TakeawayItem
                  idx="3"
                  title="속도와 확장을 모두 잡는 ‘스키마 설득의 과정’"
                  quote="“편하게 JSON으로 전부 저장하자 vs 나중을 위해 정규화하자.”"
                  desc="개발 편의성을 위해 분석 결과를 JSON 필드 하나에 몰아넣자는 의견이 있었습니다. 하지만 “나중에 커머스 상품 ID와 매핑하고, 28일치 그래프를 0.5초 안에 그리려면 정규화가 필수다”라고 팀을 설득했습니다. 결국 METRIC_RESULT 테이블을 분리 설계했고, 덕분에 대용량 데이터 조회 시에도 쿼리 속도를 확보할 수 있었습니다. DB 설계는 단순한 저장소 구축이 아니라, 서비스의 미래 병목을 미리 제거하는 설계자의 시야가 필요함을 체감했습니다."
                />

                <TakeawayItem
                  idx="4"
                  title="기술을 배려로 바꾸는 ‘색채 심리학’"
                  quote="“빨간색 경고등은 사용자를 움직이는 게 아니라, 겁먹게 만든다.”"
                  desc="초기 UI는 피부 상태가 나쁘면 직관적으로 ‘빨간색(Red)’을 띄웠습니다. 하지만 베타 테스트 결과, 사용자는 이를 ‘위험/질병’으로 받아들이며 거부감을 느꼈습니다. 이를 Tea Rose(#F4ACB7) 컬러로 교체하여 ‘위험’이 아닌 ‘케어 필요’라는 뉘앙스로 톤을 조절했습니다. 사용자에게 닿는 인터페이스는 심리적 안정감을 주는 따뜻한 통역사여야 함을 배웠습니다."
                />

                <TakeawayItem
                  idx="5"
                  title="일회성 도구에서 ‘성장형 제품’으로"
                  quote="“오늘의 정답보다, 변화의 방향이 더 강력하다.”"
                  desc="사용자는 한 번의 피부 진단으로 앱을 계속 쓰지 않습니다. 단일 이미지 분석을 넘어, 데이터가 쌓일수록 ‘내 피부가 좋아지고 있다’는 확신을 주는 시계열 구조에 집중했습니다. 분석-저장-피드백의 루프를 완성하자, 데이터는 단순한 로그가 아니라 사용자를 붙잡아두는 자산이 되었습니다. 잘 짜인 시스템 아키텍처가 곧 리텐션(Retention) 전략이 된다는 것을 증명한 경험이었습니다."
                />

                <TakeawayItem
                  idx="6"
                  title="도메인을 넘나드는 ‘문제 해결의 원형’"
                  quote="“피부 문제를 풀었지만, 사실은 불확실성을 다루는 시스템을 만들었다.”"
                  desc="이 프로젝트는 스킨케어 앱이지만, 그 본질은 [불확실한 상태 진단(Vision) + 외부 변수 통합(API) + 최적해 제안(LLM)]이라는 프로세스입니다. 이 구조는 스마트 팩토리의 불량 탐지나, 핀테크의 이상 거래 탐지에도 그대로 적용 가능합니다. 특정 도메인의 앱 하나를 만든 것이 아니라, 복잡한 현실 데이터를 의사결정 가능한 정보로 가공하는 개인 ‘엔지니어링 템플릿’을 확보했다는 점이 가장 큰 수확입니다."
                />
              </div>
            </details>
          </div>

          {/* Next */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/projects/empty-house-cps"
              className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-[13px] font-medium text-black/70 hover:text-black transition"
            >
              Next Project: Empty House CPS →
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}