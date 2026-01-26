'use client';

import Image from "next/image";
import { useState } from "react";

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
    {desc ? (
      <p className="mt-3 text-[13.5px] leading-7 text-black/60">{desc}</p>
    ) : null}
  </div>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-[22px] border border-black/10 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_30px_rgba(0,0,0,0.06)]">
    {children}
  </div>
);

/**
 * 이미지 크게 + 설명 분리 카드
 * - 그림 비율: 16/9 기본
 * - 캡션: 아래 별도 카드
 */
const Figure = ({
  src,
  alt,
  captionTitle,
  caption,
  aspect = "16/9",
}: {
  src: string;
  alt: string;
  captionTitle?: string;
  caption?: string;
  aspect?: "16/9" | "4/3" | "1/1";
}) => {
  const aspectClass =
    aspect === "4/3"
      ? "aspect-[4/3]"
      : aspect === "1/1"
      ? "aspect-square"
      : "aspect-[16/9]";

  return (
    <div className="space-y-3">
      <div className="rounded-[22px] border border-black/10 bg-white p-0 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_30px_rgba(0,0,0,0.06)]">
        <div
          className={`relative ${aspectClass} w-full overflow-hidden rounded-[22px] bg-black/[0.02]`}
        >
          <Image src={src} alt={alt} fill className="object-contain" />
        </div>
      </div>

      {caption ? (
        <div className="rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_30px_rgba(0,0,0,0.06)]">
          {captionTitle ? (
            <p className="text-[12px] text-black/45">{captionTitle}</p>
          ) : null}
          <p className="mt-2 text-[13.5px] leading-7 text-black/60">{caption}</p>
        </div>
      ) : null}
    </div>
  );
};

/**
 * 슬라이드 가능한 이미지 갤러리 (Geo 전용)
 */
interface SlideImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const ImageSlider = ({ images }: { images: SlideImage[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentImage = images[currentIndex];

  return (
    <div className="space-y-3">
      {/* 이미지 카드 */}
      <div className="rounded-[22px] border border-black/10 bg-white p-0 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_30px_rgba(0,0,0,0.06)] relative group">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[22px] bg-black/[0.02]">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-contain transition-opacity duration-300"
          />
        </div>

        {/* 좌우 화살표 버튼 */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          aria-label="이전 이미지"
        >
          <svg className="w-5 h-5 text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          aria-label="다음 이미지"
        >
          <svg className="w-5 h-5 text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* 하단 인디케이터 */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentIndex
                  ? "w-8 bg-white"
                  : "w-1.5 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`슬라이드 ${idx + 1}로 이동`}
            />
          ))}
        </div>
      </div>

      {/* 설명 카드 */}
      <div className="rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_30px_rgba(0,0,0,0.06)]">
        <p className="text-[12px] text-black/45">
          {currentIndex + 1} / {images.length} · {currentImage.title}
        </p>
        <p className="mt-2 text-[13.5px] leading-7 text-black/60">
          {currentImage.description}
        </p>
      </div>
    </div>
  );
};

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
    <p className="text-[12px] font-medium text-black/45">
      {idx}. {title}
    </p>
    <div className="mt-2 border-l-2 border-black/5 pl-3">
      <p className="text-[13.5px] font-medium leading-6 text-black/80 italic">
        {quote}
      </p>
    </div>
    <p className="mt-2 text-[13.5px] leading-7 text-black/60">{desc}</p>
  </div>
);

export default function Page() {
  const geoImages: SlideImage[] = [
    {
      src: "/images/projects/empty-house-cps/geo.png",
      alt: "CPS 점수 분포 맵 (수도권 전체)",
      title: "Step 1: 전체 지역 CPS 분포",
      description:
        "서울, 인천, 경기도 118개 행정동의 CPS 점수 분포를 색상 그라데이션으로 시각화. 진한 녹색일수록 전환 가능성(회복 잠재력)이 높으며, 노란색/빨간색은 개입이 시급한 지역을 나타냅니다.",
    },
    {
      src: "/images/projects/empty-house-cps/geo2.png",
      alt: "가중치 선택 시뮬레이션",
      title: "Step 2: 가중치 기반 시나리오 변경",
      description:
        "정책 목표에 따라 가중치(전문가 기반, 주민 참여형, 경제성 우선 등)를 선택하면 지역별 우선순위가 동적으로 재계산됩니다. 동일한 데이터로도 정책 관점에 따라 개입 순서가 달라지는 구조를 시연합니다.",
    },
    {
      src: "/images/projects/empty-house-cps/geo3.png",
      alt: "특정 행정동 상세 정보",
      title: "Step 3: 행정동별 세부 지표 확인",
      description:
        "클릭한 행정동(예: 수원시 장안구 연무동)의 CPS 총점, 인구 안정성, 인프라 점수, 빈집 비율, 노후건물 비율을 바차트로 제시. 각 지표의 상대적 강약점을 한눈에 파악할 수 있습니다.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="mx-auto max-w-[1040px] px-6 pb-20">
        {/* Hero */}
        <section className="pt-14 pb-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              <Pill>프로젝트 02</Pill>
              <Pill>AI · 데이터</Pill>
              <Pill>의사결정 점수(CPS)</Pill>
              <Pill>공공데이터 · 공간 분석</Pill>
            </div>

            <h1 className="text-[40px] leading-[1.08] tracking-[-1.2px] font-semibold">
              빈집불이 (Empty House CPS)
              <br />
              빈집을 "관리 대상"에서 "개입 우선순위"로 전환하는 의사결정 시스템
            </h1>

            <p className="max-w-[92ch] text-[15px] leading-8 text-black/60">
              빈집 문제는 흔히 '몇 채가 늘었다' 같은 규모 지표로만 다뤄지지만, 실제 행정과 
              사업의 병목은 &quot;어디부터 개입해야 하는가&quot;라는 우선순위 판단에 있습니다. 
              본 프로젝트는 빈집을 정적 자산이 아니라 여러 조건(교통·인프라·인구·노후도)이 
              겹쳐진 상태(State)로 재정의하고, 이를 조건 기반 점수(CPS)로 변환해 실행 가능한 
              개입 순서를 제시합니다. 문제 정의부터 변수 설계, 상호작용·임계점 분석, 파이프라인 
              구축, 의사결정 권고까지 전 과정을 설계한 데이터 기반 판단 시스템입니다.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="/projects"
                className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-[13px] font-medium text-black/70 hover:text-black transition"
              >
                프로젝트 목록으로
              </a>
            </div>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* 1) Problem Definition */}
        <section className="py-10">
          <SectionTitle
            eyebrow="문제"
            title="문제 정의"
            desc="빈집의 핵심 문제는 '위험하다/아니다'를 판정하는 데 있지 않습니다. 한정된 자원으로 '어디부터 개입할지'를 결정할 구조가 없다는 점이 더 큰 병목입니다. 정성 평가와 산재된 지표만으로는 복합 조건(연쇄 위험)을 구조적으로 판단하기 어렵고, 분석 결과도 실행으로 연결되지 않습니다."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <p className="text-[12px] text-black/45">관찰된 한계</p>
              <ul className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                <li>
                  • 빈집 판단이 현장 경험과 정성 평가에 과도하게 의존하며, 담당자 간 기준이
                  불일치
                </li>
                <li>
                  • 교통·인프라·인구 같은 지표가 분산되어 있어, 복합 조건(연쇄 위험)을
                  구조적으로 해석 불가
                </li>
                <li>
                  • 분석 결과가 '위험 지역 리스트'로 끝나며, 실제 예산 배분·사업 실행으로
                  연결되지 않음
                </li>
              </ul>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">해결 방향</p>
              <ul className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                <li>
                  • 빈집을 여러 조건(교통·인프라·인구·노후도)이 겹쳐진 '상태(State)의 연속'으로 
                  재정의: 회복 가능 ↔ 개입 필요 ↔ 붕괴 단계로 구조화
                </li>
                <li>
                  • 조건별 변수 설계 → 상호작용·임계점 분석 → CPS 점수 산출까지 전 과정 구조화
                </li>
                <li>
                  • &quot;왜 여기가 시급한가&quot;를 추적 가능한 근거(상관관계·중요도·임계점)로 설명
                </li>
              </ul>
            </Card>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* 2) Structural Insight */}
        <section className="py-10">
          <SectionTitle
            eyebrow="구조"
            title="구조적 인식"
            desc="본 프로젝트가 집중한 지점은 점수 산출 자체가 아니라 '판단 체계'입니다. 변수를 독립이 아닌 상호작용·연쇄효과를 지닌 구조로 설계했고, 선형 합산이 놓치는 임계 붕괴(Threshold)를 포착해 선제 개입 타이밍을 만드는 데 집중했습니다. 시작 단계에서 AS-IS/TO-BE 비교로 &quot;왜 이 방식이 필요한가&quot;를 먼저 정리했습니다."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Figure
              src="/images/projects/empty-house-cps/as_is_to_be.jpg"
              alt="AS-IS vs TO-BE 구조 비교"
              captionTitle="그림 설명"
              caption="기존 접근(선형 합산/정성 판단)에서 조건 기반 우선순위(CPS)로 전환: '관리'가 아닌 '개입 순서'를 만드는 구조"
              aspect="16/9"
            />

            <Card>
              <p className="text-[12px] text-black/45">설계 원칙</p>
              <div className="mt-4 space-y-4 text-[13.5px] leading-7 text-black/60">
                <div className="border-l border-black/10 pl-3">
                  <p className="text-[13px] font-medium text-black/75">1) 분해</p>
                  <p className="mt-1">
                    빈집을 하나의 위험으로 뭉뚱그리지 않고, 판단 가능한 조건(교통 접근성/의료·교육
                    인프라/인구 구조/건물 노후도)으로 쪼개 측정 가능한 형태로 만듭니다.
                  </p>
                </div>
                <div className="border-l border-black/10 pl-3">
                  <p className="text-[13px] font-medium text-black/75">2) 결합</p>
                  <p className="mt-1">
                    변수를 단순 합산하지 않고, 상관관계·상호작용·연쇄효과(교통 차단 × 고령화 → 
                    동시 붕괴)를 중심으로 구조화합니다. 이 과정에서 비선형 패턴과 임계점을 포착하는 
                    분석 프레임을 확립했습니다.
                  </p>
                </div>
                <div className="border-l border-black/10 pl-3">
                  <p className="text-[13px] font-medium text-black/75">3) 우선순위</p>
                  <p className="mt-1">
                    &quot;위험하다&quot;는 진단이 아니라 &quot;어디부터 개입할지&quot;를 결정하기 위해 
                    점수를 실행 가능한 순서(행동 우선순위)로 번역합니다.
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
            eyebrow="구현"
            title="구현 구조"
            desc="기술 파트의 목표는 모델 성능 자랑이 아니라, 데이터 수집부터 의사결정 권고까지 '근거 생산 과정 전체'를 추적 가능하게 만드는 데 있습니다. 이 과정에서 단발성 분석이 아닌 재현 가능한 판단 체계를 설계하는 능력을 키웠습니다."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Figure
              src="/images/projects/empty-house-cps/data_pipeline.png"
              alt="CPS 데이터 파이프라인"
              captionTitle="그림 설명"
              caption="수집 → 정제 → 구조화 → 점수화(CPS) → 권고로 이어지는 흐름: 판단이 만들어지는 경로를 한 장으로 요약"
              aspect="16/9"
            />

            <Card>
              <p className="text-[12px] text-black/45">구현 포인트</p>
              <ul className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                <li>
                  • 공공데이터를 개별 지표가 아닌 '조건 집합'으로 재구성: 변수 설계 전 과정 직접 수행
                </li>
                <li>
                  • 상관관계·변수 중요도·임계점(Threshold) 그래프를 자동 생성: 비선형 패턴 포착 
                  프레임 구축
                </li>
                <li>
                  • 결과를 숫자가 아닌 '개입 권고 문장'으로 번역: 데이터를 의사결정 언어로 
                  전환하는 경험
                </li>
              </ul>
            </Card>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* 4) Correlation Analysis - NEW */}
        <section className="py-10">
          <SectionTitle
            eyebrow="분석"
            title="비선형 패턴 인식: 가정을 깨는 데이터 분석"
            desc="일반적인 가정('인프라가 많으면 인구가 증가한다', '낡은 건물은 빈집이 된다')을 데이터로 검증한 결과, 상관관계가 거의 없거나 매우 약한 것으로 나타났습니다. 이는 단순 지표 추적이 아닌 복합 요인 분석의 필요성을 입증하며, CPS 통합 점수 체계의 설계 근거가 되었습니다."
          />

          <div className="space-y-6">
            <Figure
              src="/images/projects/empty-house-cps/correlation.png"
              alt="인구 안정성 vs 인프라 점수 산점도"
              captionTitle="그림 설명"
              caption="인구 안정성과 인프라 점수 간 상관계수는 -0.12로, 통계적으로 거의 무상관입니다. 인프라의 '양'이 인구 유입을 보장하지 않으며, 일자리, 주거비, 학군 등 다른 복합 요인이 더 중요함을 시사합니다. 이는 정책 결정자들이 인프라 투자만으로 지역 재생을 기대할 수 없음을 증명합니다."
              aspect="16/9"
            />

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <p className="text-[12px] text-black/45">분석 1: 인프라 vs 인구</p>
                <div className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                  <p className="font-medium text-black/75">
                    상관계수: -0.12 (거의 무상관)
                  </p>
                  <p>
                    <strong>발견:</strong> 인프라 수가 많다고 자동으로 인구가 증가하지 않음
                  </p>
                  <p>
                    <strong>함의:</strong> 단순 KPI 추적이 아닌 맥락 기반 의사결정 필요. 
                    획일적 전략이 아닌 지역별 맞춤 전략이 필수입니다.
                  </p>
                </div>
              </Card>

              <Card>
                <p className="text-[12px] text-black/45">분석 2: 노후도 vs 빈집</p>
                <div className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                  <p className="font-medium text-black/75">
                    상관계수: 0.18 (약한 양의 상관)
                  </p>
                  <p>
                    <strong>발견:</strong> 건물이 낡아도 빈집이 아닐 수 있고(재개발 대기), 
                    신축도 빈집이 될 수 있음(상업 실패)
                  </p>
                  <p>
                    <strong>함의:</strong> 노후도는 빈집 변동성의 3.2%만 설명. 97% 이상은 
                    다른 요인(경제활동, 투기, 정책)에서 비롯됩니다.
                  </p>
                </div>
              </Card>
            </div>

            <Card>
              <p className="text-[12px] text-black/45">분석 결과</p>
              <div className="mt-3 space-y-3 text-[13.5px] leading-7 text-black/60">
                <p>
                  <strong>1) 통계적 엄밀성:</strong> 상관계수를 정량적으로 계산하고 
                  P-value로 유의성을 검증하여, '약하다'는 정성적 판단이 아닌 객관적 증거 제시
                </p>
                <p>
                  <strong>2) 도메인 이해:</strong> 숫자 뒤의 '스토리'를 파악. 
                  도시재생, 부동산 정책, 인구학의 교차점에서 데이터를 해석
                </p>
                <p>
                  <strong>3) 의사결정 관점:</strong> "노후건물 비율 높음 = 재생 우선순위 높음"이라는 
                  단순 가정을 데이터로 반박하고, 다차원 지표 기반 우선순위화의 필요성을 입증
                </p>
                <p>
                  <strong>4) CRM/마케팅 전환 가능성:</strong> 고객 구매 이력 많음 ≠ 충성도 높음. 
                  행동 데이터만으로는 불충분하며, 태도·감정·맥락 데이터가 필요함을 유추 가능
                </p>
              </div>
            </Card>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* 5) Clustering Analysis - NEW */}
        <section className="py-10">
          <SectionTitle
            eyebrow="클러스터링"
            title="t-SNE 차원 축소 & 인구 통계 클러스터링"
            desc="118개 행정동을 인구 통계 지표(인구증가율, 고령화율, 청년인구 비율)로 클러스터링하여 '고령화 성장 지역', '혼합 성장 지역', '청년화 쇠퇴 지역', '고령화 쇠퇴 지역' 4개 유형으로 분류했습니다. 이를 통해 지역별 맞춤 정책 개입 방향을 제시할 수 있습니다."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Figure
              src="/images/projects/empty-house-cps/tsne.png"
              alt="t-SNE 클러스터링 시각화"
              captionTitle="그림 설명"
              caption="인구 통계 기반 t-SNE 2D 시각화 결과. 4개 클러스터가 명확히 구분되며, 각 클러스터는 고유한 인구 구조 특성을 지닙니다. 왼쪽은 인구 전용 클러스터, 오른쪽은 교통 데이터를 추가한 통합 클러스터로, 일부 지역이 '크로스오버'(재분류)되는 현상을 포착했습니다."
              aspect="16/9"
            />

            <Card>
              <p className="text-[12px] text-black/45">클러스터 유형 및 특성</p>
              <div className="mt-3 space-y-3 text-[13.5px] leading-7 text-black/60">
                <div className="border-l-2 border-red-500 pl-3">
                  <p className="font-medium text-black/75">
                    Cluster 0 (● 고령화 성장 지역)
                  </p>
                  <p>인구 증가 + 고령화 비율 높음. 예: 신촌동, 만수1동</p>
                </div>
                <div className="border-l-2 border-blue-500 pl-3">
                  <p className="font-medium text-black/75">
                    Cluster 1 (■ 혼합 성장 지역)
                  </p>
                  <p>인구 증가 + 세대 균형. 복합 수요 지역</p>
                </div>
                <div className="border-l-2 border-green-500 pl-3">
                  <p className="font-medium text-black/75">
                    Cluster 2 (◆ 청년화 쇠퇴 지역)
                  </p>
                  <p>인구 감소 + 청년 비율 높음. 예: 정자1동</p>
                </div>
                <div className="border-l-2 border-purple-500 pl-3">
                  <p className="font-medium text-black/75">
                    Cluster 3 (▲ 고령화 쇠퇴 지역)
                  </p>
                  <p>인구 감소 + 고령화 심화. 선제 개입 필요</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <p className="text-[12px] text-black/45">분석 가치</p>
              <div className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                <p>
                  <strong>1) 데이터 발견 역량:</strong> 평균값 비교가 아닌 패턴 인식. 
                  고차원 데이터를 2D로 압축하면서도 의미있는 군집 구조를 유지
                </p>
                <p>
                  <strong>2) 정책 맞춤화:</strong> '전체 평균' 대신 클러스터별 특성에 맞는 
                  개입 전략 수립 가능 (예: 고령화 쇠퇴 지역 → 교통 복지 우선)
                </p>
                <p>
                  <strong>3) CRM 응용:</strong> 고객 세그먼트를 인구통계 + 행동 데이터로 
                  재분류하여 타겟팅 정확도를 높이는 것과 동일한 프레임워크
                </p>
              </div>
            </Card>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* 6) Geo Visualization - NEW with Slider */}
        <section className="py-10">
          <SectionTitle
            eyebrow="시각화"
            title="지리 공간 시각화: 인터랙티브 CPS 맵"
            desc="118개 행정동의 CPS 점수를 지도 위에 시각화하고, 가중치 시나리오별로 우선순위가 어떻게 변화하는지 시뮬레이션할 수 있는 대시보드를 구현했습니다. 정책 담당자가 실시간으로 '만약 교통을 우선한다면?', '만약 인구 안정성을 중시한다면?'과 같은 질문에 즉시 답할 수 있는 의사결정 도구입니다."
          />

          <ImageSlider images={geoImages} />

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <Card>
              <p className="text-[12px] text-black/45">기능 1: 가중치 시뮬레이션</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/60">
                전문가 기반, 주민 참여형, 경제성 우선 등 5개 가중치 세트를 선택하면 
                지역별 CPS 점수가 동적으로 재계산되어 색상이 변경됩니다.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">기능 2: 지역 필터링</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/60">
                서울, 인천, 경기도를 개별 또는 복합 선택하여 관심 지역만 집중 분석할 수 
                있습니다. 확대/축소로 세부 행정동 경계도 확인 가능합니다.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">기능 3: 행정동 상세 정보</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/60">
                특정 행정동을 클릭하면 CPS 총점, 4대 지표(인구 안정성, 인프라 접근성, 
                빈집 비율, 노후건물 비율)를 바차트로 제시하여 강약점을 즉시 파악합니다.
              </p>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <p className="text-[12px] text-black/45">기술 스택 및 구현 포인트</p>
              <div className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                <p>
                  <strong>· 지리 데이터 처리:</strong> GeoPandas, GeoJSON으로 행정동 경계 파일 처리. 
                  VWorld API로 주소→위경도 변환(지오코딩) 수행
                </p>
                <p>
                  <strong>· 시각화 라이브러리:</strong> Streamlit + Plotly로 인터랙티브 맵 구현. 
                  Choropleth(코로플레스) 맵으로 점수 구간별 색상 그라데이션 표현
                </p>
                <p>
                  <strong>· 동적 재계산:</strong> 가중치 변경 시 Python 백엔드에서 CPS 점수를 
                  실시간 재계산하고, 프론트엔드로 JSON 전송하여 맵 업데이트
                </p>
                <p>
                  <strong>· 확장성:</strong> API 엔드포인트로 분리 설계하여, 향후 웹앱이나 
                  모바일 앱에서도 동일한 CPS 계산 로직을 재사용 가능
                </p>
              </div>
            </Card>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* 7) Decision System */}
        <section className="py-10">
          <SectionTitle
            eyebrow="의사결정 시스템"
            title="점수를 '임계점 판단'으로 바꾸는 구조"
            desc="CPS는 평균값 비교로는 잡히지 않는 전환 구간을 겨냥합니다. '회복 가능'에서 '붕괴'로 넘어가는 임계점을 포착해, 문제가 눈에 보이기 전에 선제 개입하도록 돕는 판단 장치로 설계했습니다."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Figure
              src="/images/projects/empty-house-cps/data_evidence.png"
              alt="상관관계/중요도/임계점 근거"
              captionTitle="그림 설명"
              caption="상관관계·변수 중요도·임계점 그래프를 '증거 묶음'으로 구성: 왜 선형 합산이 실패하는지, 왜 이 지점이 시급한지 설명 가능한 근거로 정리"
              aspect="16/9"
            />

            <Figure
              src="/images/projects/empty-house-cps/research_discovery.jpg"
              alt="임계 붕괴(Threshold) 및 핵심 변수 분석"
              captionTitle="그림 설명"
              caption="임계점에서 급락하는 구간과 핵심 변수(Driver)를 함께 제시: 사후 대응이 아닌 선제 개입 타이밍을 만들기 위한 판단 구조 시각화"
              aspect="16/9"
            />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <Card>
              <p className="text-[12px] text-black/45">핵심 관점</p>
              <ul className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                <li>• 점수는 '위험도 측정'이 아니라 '실행 가능한 개입 순서' 제시</li>
                <li>• 구조는 평균 비교가 아니라 '상태 전환점(Threshold)' 포착</li>
                <li>• 검증 가능한 근거(그래프·변수·로직)가 지속 가능한 정책 실행을 만듦</li>
              </ul>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">출력 형태</p>
              <ul className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                <li>• CPS(우선순위 점수) 및 구간</li>
                <li>• 핵심 변수(Driver)와 근거 그래프</li>
                <li>• 개입 권고(정책/사업 실행 단위)</li>
              </ul>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">확장성</p>
              <ul className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                <li>• 노후 인프라 교체 우선순위 판단</li>
                <li>• 취약지 선제 개입 타이밍 결정</li>
                <li>• 지역 재생·투자 우선순위 분석</li>
              </ul>
            </Card>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* TAKEAWAYS */}
        <section className="py-10">
          <SectionTitle
            eyebrow="이 프로젝트가 증명하는 것"
            title="빈집불이에서 확립한 문제 해결 원칙"
            desc="단순히 '배운 점'이 아니라, 다른 정책·공간 문제에도 재사용 가능한 '설계 기준'으로 정리했습니다. 압축본으로 핵심을 먼저 확인하고, 펼침에서 전체 맥락을 볼 수 있습니다."
          />

          {/* 1) 압축본: 카드 6개 */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <p className="text-[12px] text-black/45">1) 점수는 행동의 순서</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                CPS는 &quot;위험하다/아니다&quot;를 판정하는 진단 점수가 아니라, 제한된 예산과 인력 
                안에서 &quot;어디부터 개입할지&quot;를 결정하는 실행 순서 체계입니다. 데이터의 가치는 
                예측 정확도가 아니라, 담당자가 '다음에 무엇을 해야 하는가'에 답하는 판단 비용을 
                낮추는 데서 발생한다는 설계 기준을 확립했습니다.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">2) 변수는 구조로 말한다</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                개별 지표를 독립적으로 합산하면 '평균적 위험도'만 남고 맥락은 사라집니다. 
                상관관계·상호작용·연쇄효과를 전제로 변수를 구조화했을 때, &quot;교통이 끊기고 
                인프라가 노후하면 회복 불가능&quot;처럼 실행 가능한 문장이 도출됩니다. 
                구조화된 설계가 분석의 깊이를 결정합니다.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">3) 평균이 아니라 전환점을 본다</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                정책 개입은 평균값 비교로 시작되지 않습니다. '회복 가능'에서 '붕괴로 전환'되는 
                임계점에서 결정됩니다. CPS를 선형 합산이 아닌 Threshold 중심으로 설계함으로써, 
                사후 대응이 아니라 선제 개입 타이밍을 포착할 수 있는 판단 구조를 만들었습니다.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">4) 증거가 실행을 만든다</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                설득은 주장으로 시작하지만, 지속 가능한 실행은 검증 가능한 근거에서 나옵니다. 
                AS-IS/TO-BE 구조로 '왜 바꿔야 하는가'를 먼저 정의하고, 상관관계·변수 중요도·
                임계점 그래프를 하나의 증거 묶음으로 구성해 &quot;왜 여기가 시급한가&quot;를 설명 가능하게 
                만들었습니다. 이 프로젝트는 분석 결과가 아니라 논리의 체계입니다.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">5) 파이프라인은 근거의 경로</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                수집–정제–구조화–점수화–권고로 연결한 이유는 기능 확장이 아니라, '이 판단이 
                어떤 과정을 거쳐 만들어졌는지' 추적 가능한 근거 흐름을 확보하기 위해서입니다. 
                파이프라인은 자동화 도구가 아니라, 판단의 책임 소재와 재현성을 보장하는 
                설계 원칙입니다.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">6) 재사용 가능한 판단 템플릿</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                이 구조는 빈집뿐 아니라 노후 인프라, 취약지 선제 개입, 공공시설 재배치, 
                투자 우선순위 같은 '복합 조건 의사결정 문제'에 그대로 적용됩니다. 
                본 프로젝트는 특정 도메인 분석이 아니라, 정형화되지 않은 현실 데이터를 
                실행 가능한 판단 구조로 전환하는 개인 방법론을 확보한 경험입니다.
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
                원문 전체 보기 (문제 → 해결 기준)
              </summary>

              <div className="mt-8 space-y-10">
                <TakeawayItem
                  idx="1"
                  title="점수는 숫자가 아니라 '행동의 순서'"
                  quote="위험을 예측하는 것과, 어디부터 개입할지 결정하는 것은 완전히 다른 문제입니다."
                  desc="빈집 분석은 흔히 '위험도가 높다'는 진단으로 끝나지만, 행정과 사업의 실제 병목은 제한된 자원 안에서 '우선순위'를 정하는 일입니다. CPS를 '진단 점수'가 아니라 '개입 순서를 만드는 점수'로 설계하면서, 데이터의 가치는 예측 정확도보다 '담당자가 다음에 무엇을 해야 하는가'에 답하는 판단 비용을 낮추는 데서 발생한다는 기준을 확립했습니다. 점수는 상태를 설명하는 지표가 아니라, 실행을 안내하는 내비게이션입니다."
                />

                <TakeawayItem
                  idx="2"
                  title="변수는 독립이 아니라 '구조'"
                  quote="관계를 연결하자, '왜 시급한지'가 문장으로 설명되기 시작했습니다."
                  desc="개별 지표를 따로 보면 '평균적인 위험'만 남습니다. 하지만 변수의 상관관계와 상호작용을 전제로 연결하면 맥락이 생성됩니다. &quot;교통 접근성이 끊기고, 의료 인프라가 부족하고, 인구가 유출되면 회복 불가능&quot;처럼 실행 가능한 판단 문장이 도출됩니다. 상관관계·중요도·임계점 근거를 한 흐름으로 구성함으로써, 구조화된 설계가 분석의 깊이를 결정한다는 사실을 증명했습니다."
                />

                <TakeawayItem
                  idx="3"
                  title="정책 문제는 평균이 아니라 '전환점'에서 결정된다"
                  quote="회복 가능 상태에서 붕괴로 넘어가는 순간을 포착해야 합니다."
                  desc="정책은 평균값 비교로 움직이지 않습니다. 상태가 '관리 가능'에서 '개입 필수'로 전환되는 임계점에서 결정됩니다. CPS를 단순 합산이 아닌 Threshold 중심으로 설계함으로써, 문제가 가시화된 후 대응하는 사후 처리가 아니라, 붕괴가 시작되기 직전 타이밍을 포착해 선제 개입할 수 있는 판단 구조를 만들었습니다. 평균은 과거를 설명하고, 전환점은 미래를 준비합니다."
                />

                <TakeawayItem
                  idx="4"
                  title="증거 없는 설득은 지속되지 않는다"
                  quote="그럴듯한 주장 대신, 검증 가능한 근거 묶음을 만듭니다."
                  desc="실행은 설득에서 시작하지만, 지속은 근거에서 나옵니다. AS-IS/TO-BE 구조로 '왜 바꿔야 하는지'를 먼저 정리하고, 상관관계·변수 중요도·임계점 그래프를 한 흐름으로 묶어 판단을 정당화했습니다. 각 근거가 &quot;현재 방식의 한계 → 대안 설계 필요성 → 작동 원리 → 우선순위 도출 → 실행 권고&quot;로 연결되도록 구성했습니다. 결과적으로 이 프로젝트는 분석 산출물이 아니라 논리 체계로 남습니다."
                />

                <TakeawayItem
                  idx="5"
                  title="파이프라인은 구현이 아니라 '근거의 경로'"
                  quote="판단이 어디서 만들어졌는지 추적 가능해야 합니다."
                  desc="수집–정제–구조화–점수화–권고까지 연결한 이유는 기능을 늘리기 위해서가 아니라, '이 판단이 어떤 데이터에서, 어떤 변수를 거쳐, 어떤 로직으로 만들어졌는지' 추적 가능한 근거의 흐름을 만들기 위해서입니다. 파이프라인은 단순 자동화가 아니라, 판단의 책임 소재와 재현성을 확보하는 설계 원칙입니다. 시스템은 기능이 아니라 신뢰의 구조입니다."
                />

                <TakeawayItem
                  idx="6"
                  title="도메인을 넘나드는 '판단 템플릿'"
                  quote="빈집을 풀었지만, 사실은 복합 조건을 결정 가능한 구조로 바꾸는 방법을 만들었습니다."
                  desc="이 구조는 빈집에만 국한되지 않습니다. 노후 인프라 교체 우선순위, 취약지 선제 개입, 공공시설 재배치, 지역 투자 우선순위 같은 '정형화되지 않은 복합 조건 의사결정 문제'에 그대로 적용 가능합니다. 본 프로젝트는 특정 도메인의 성공 사례가 아니라, 산재된 공공데이터를 실행 가능한 판단 구조로 전환하는 개인 방법론을 확보한 경험입니다. 문제 해결 방식 자체가 재사용 가능한 자산이 되었습니다."
                />
              </div>
            </details>
          </div>

          {/* Next */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/projects/pmcc"
              className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-[13px] font-medium text-black/70 hover:text-black transition"
            >
              다음 프로젝트: PMCC →
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
