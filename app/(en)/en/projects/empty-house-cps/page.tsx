
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
 * Large image + separate caption card
 * - Image ratio: 16/9 default
 * - Caption: Separate card below
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
 * Slidable image gallery (Geo-specific)
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
      {/* Image card */}
      <div className="rounded-[22px] border border-black/10 bg-white p-0 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_30px_rgba(0,0,0,0.06)] relative group">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[22px] bg-black/[0.02]">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-contain transition-opacity duration-300"
          />
        </div>

        {/* Left/Right arrow buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          aria-label="Previous image"
        >
          <svg className="w-5 h-5 text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          aria-label="Next image"
        >
          <svg className="w-5 h-5 text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Bottom indicators */}
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
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Description card */}
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
      alt: "CPS score distribution map (entire metropolitan area)",
      title: "Step 1: Overall regional CPS distribution",
      description:
        "Visualizes the CPS score distribution of 118 administrative districts in Seoul, Incheon, and Gyeonggi-do using color gradients. Darker green indicates higher conversion potential (recovery potential), while yellow/red indicates areas requiring urgent intervention.",
    },
    {
      src: "/images/projects/empty-house-cps/geo2.png",
      alt: "Weight selection simulation",
      title: "Step 2: Scenario change based on weights",
      description:
        "When weights are selected according to policy objectives (expert-based, resident participation, economic priority, etc.), regional priorities are dynamically recalculated. Demonstrates how the intervention order changes depending on the policy perspective even with the same data.",
    },
    {
      src: "/images/projects/empty-house-cps/geo3.png",
      alt: "Detailed information for specific administrative district",
      title: "Step 3: Check detailed indicators by administrative district",
      description:
        "Presents the CPS total score, population stability, infrastructure score, vacant house ratio, and old building ratio of the clicked administrative district (e.g., Yeonmu-dong, Jangan-gu, Suwon) in bar charts. Strengths and weaknesses of each indicator can be identified at a glance.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="mx-auto max-w-[1040px] px-6 pb-20">
        {/* Hero */}
        <section className="pt-14 pb-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              <Pill>Project 02</Pill>
              <Pill>AI · Data</Pill>
              <Pill>Decision Score (CPS)</Pill>
              <Pill>Public Data · Spatial Analysis</Pill>
            </div>

            <h1 className="text-[40px] leading-[1.08] tracking-[-1.2px] font-semibold">
              Empty House CPS
              <br />
              Transforming vacant houses from "management targets" to "intervention priorities" through a decision system
            </h1>

            <p className="max-w-[92ch] text-[15px] leading-8 text-black/60">
              Vacant house problems are often addressed only through scale indicators like 'how many have increased', but the actual bottleneck in administration and business is the priority judgment of "where to intervene first". This project redefines vacant houses not as static assets but as states where various conditions (transportation, infrastructure, population, deterioration) overlap, converts them into Condition-based Priority Scores (CPS), and presents actionable intervention sequences. It is a data-driven judgment system designed through the entire process from problem definition, variable design, interaction/threshold analysis, pipeline construction, to decision recommendations.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="/projects"
                className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-[13px] font-medium text-black/70 hover:text-black transition"
              >
                Back to projects
              </a>
            </div>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* 1) Problem Definition */}
        <section className="py-10">
          <SectionTitle
            eyebrow="Problem"
            title="Problem Definition"
            desc="The core problem with vacant houses is not in judging 'dangerous/not dangerous'. The bigger bottleneck is the lack of structure to decide 'where to intervene first' with limited resources. Qualitative assessments and scattered indicators make it difficult to structurally judge complex conditions (cascading risks), and analysis results do not lead to execution."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <p className="text-[12px] text-black/45">Observed limitations</p>
              <ul className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                <li>
                  • Vacant house judgments rely excessively on field experience and qualitative assessment, with inconsistent criteria among personnel
                </li>
                <li>
                  • Indicators like transportation, infrastructure, and population are scattered, making it impossible to structurally interpret complex conditions (cascading risks)
                </li>
                <li>
                  • Analysis results end as 'risk area lists' and do not connect to actual budget allocation or business execution
                </li>
              </ul>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">Solution direction</p>
              <ul className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                <li>
                  • Redefine vacant houses as 'continuums of state' where multiple conditions (transportation, infrastructure, population, deterioration) overlap: structured as recoverable ↔ intervention needed ↔ collapse stages
                </li>
                <li>
                  • Structured entire process from condition-based variable design → interaction/threshold analysis → CPS score calculation
                </li>
                <li>
                  • Explain "why this is urgent" with traceable evidence (correlation, importance, thresholds)
                </li>
              </ul>
            </Card>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* 2) Structural Insight */}
        <section className="py-10">
          <SectionTitle
            eyebrow="Structure"
            title="Structural Insight"
            desc="What this project focused on was not the score calculation itself, but the 'judgment system'. Variables were designed not as independent but as structures with interactions and cascading effects, and focused on capturing threshold collapses missed by linear summation to create preemptive intervention timing. At the start stage, AS-IS/TO-BE comparison was organized first to clarify 'why this approach is necessary'."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Figure
              src="/images/projects/empty-house-cps/as_is_to_be.jpg"
              alt="AS-IS vs TO-BE structural comparison"
              captionTitle="Figure description"
              caption="Transition from existing approach (linear summation/qualitative judgment) to condition-based priority (CPS): structure that creates 'intervention order' rather than 'management'"
              aspect="16/9"
            />

            <Card>
              <p className="text-[12px] text-black/45">Design principles</p>
              <div className="mt-4 space-y-4 text-[13.5px] leading-7 text-black/60">
                <div className="border-l border-black/10 pl-3">
                  <p className="text-[13px] font-medium text-black/75">1) Decompose</p>
                  <p className="mt-1">
                    Do not lump vacant houses into one risk, but break them down into judgable conditions (transportation accessibility/medical/educational infrastructure/population structure/building deterioration) in measurable form.
                  </p>
                </div>
                <div className="border-l border-black/10 pl-3">
                  <p className="text-[13px] font-medium text-black/75">2) Combine</p>
                  <p className="mt-1">
                    Do not simply sum variables, but structure them around correlations, interactions, and cascading effects (transportation blockage × aging → simultaneous collapse). In this process, an analytical framework for capturing non-linear patterns and thresholds was established.
                  </p>
                </div>
                <div className="border-l border-black/10 pl-3">
                  <p className="text-[13px] font-medium text-black/75">3) Prioritize</p>
                  <p className="mt-1">
                    Translate scores not as a "dangerous" diagnosis but as actionable sequences (action priorities) to decide "where to intervene first".
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
            eyebrow="Implementation"
            title="Implementation Structure"
            desc="The goal of the technical part is not to boast model performance, but to make the entire 'evidence production process' from data collection to decision recommendations traceable. In this process, the ability to design a reproducible judgment system rather than a one-time analysis was developed."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Figure
              src="/images/projects/empty-house-cps/data_pipeline.png"
              alt="CPS data pipeline"
              captionTitle="Figure description"
              caption="Flow from collection → refinement → structuring → scoring (CPS) → recommendation: summarizes the path where judgments are made in one sheet"
              aspect="16/9"
            />

            <Card>
              <p className="text-[12px] text-black/45">Implementation points</p>
              <ul className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                <li>
                  • Reconstructed public data not as individual indicators but as 'condition sets': performed entire variable design process directly
                </li>
                <li>
                  • Automatically generated correlation, variable importance, and threshold graphs: built framework for capturing non-linear patterns
                </li>
                <li>
                  • Translated results not as numbers but as 'intervention recommendation sentences': experienced converting data into decision language
                </li>
              </ul>
            </Card>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* 4) Correlation Analysis - NEW */}
        <section className="py-10">
          <SectionTitle
            eyebrow="Analysis"
            title="Non-linear Pattern Recognition: Data Analysis that Breaks Assumptions"
            desc="Verification of common assumptions ('more infrastructure increases population', 'old buildings become vacant houses') with data showed little to very weak correlation. This proves the necessity of complex factor analysis rather than simple indicator tracking, and became the design basis for the CPS integrated scoring system."
          />

          <div className="space-y-6">
            <Figure
              src="/images/projects/empty-house-cps/correlation.png"
              alt="Population stability vs infrastructure score scatter plot"
              captionTitle="Figure description"
              caption="The correlation coefficient between population stability and infrastructure score is -0.12, statistically almost no correlation. Suggests that the 'quantity' of infrastructure does not guarantee population influx, and other complex factors like jobs, housing costs, school districts are more important. This proves that policymakers cannot expect regional regeneration through infrastructure investment alone."
              aspect="16/9"
            />

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <p className="text-[12px] text-black/45">Analysis 1: Infrastructure vs Population</p>
                <div className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                  <p className="font-medium text-black/75">
                    Correlation coefficient: -0.12 (almost no correlation)
                  </p>
                  <p>
                    <strong>Finding:</strong> More infrastructure does not automatically increase population
                  </p>
                  <p>
                    <strong>Implication:</strong> Context-based decision-making needed, not simple KPI tracking. Regional customized strategies are essential rather than uniform strategies.
                  </p>
                </div>
              </Card>

              <Card>
                <p className="text-[12px] text-black/45">Analysis 2: Deterioration vs Vacancy</p>
                <div className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                  <p className="font-medium text-black/75">
                    Correlation coefficient: 0.18 (weak positive correlation)
                  </p>
                  <p>
                    <strong>Finding:</strong> Old buildings may not be vacant (awaiting redevelopment), and new buildings can become vacant (commercial failure)
                  </p>
                  <p>
                    <strong>Implication:</strong> Deterioration explains only 3.2% of vacancy variability. Over 97% comes from other factors (economic activity, speculation, policy).
                  </p>
                </div>
              </Card>
            </div>

            <Card>
              <p className="text-[12px] text-black/45">Analysis results</p>
              <div className="mt-3 space-y-3 text-[13.5px] leading-7 text-black/60">
                <p>
                  <strong>1) Statistical rigor:</strong> Calculated correlation coefficients quantitatively and verified significance with P-values, presenting objective evidence rather than qualitative judgments of 'weak'
                </p>
                <p>
                  <strong>2) Domain understanding:</strong> Grasped the 'story' behind numbers. Interpreted data at the intersection of urban regeneration, real estate policy, and demography
                </p>
                <p>
                  <strong>3) Decision perspective:</strong> Refuted with data the simple assumption "high old building ratio = high regeneration priority" and proved the necessity of multi-dimensional indicator-based prioritization
                </p>
                <p>
                  <strong>4) CRM/marketing conversion potential:</strong> High customer purchase history ≠ high loyalty. Infer that behavioral data alone is insufficient and attitude, emotion, and context data are necessary
                </p>
              </div>
            </Card>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* 5) Clustering Analysis - NEW */}
        <section className="py-10">
          <SectionTitle
            eyebrow="Clustering"
            title="t-SNE Dimensionality Reduction & Demographic Clustering"
            desc="Clustered 118 administrative districts by demographic indicators (population growth rate, aging rate, youth population ratio) into 4 types: 'Aging Growth Area', 'Mixed Growth Area', 'Youth Decline Area', 'Aging Decline Area'. This enables presenting customized policy intervention directions by region."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Figure
              src="/images/projects/empty-house-cps/tsne.png"
              alt="t-SNE clustering visualization"
              captionTitle="Figure description"
              caption="Demographic-based t-SNE 2D visualization result. 4 clusters are clearly distinguished, each with unique population structure characteristics. Left shows population-only clusters, right shows integrated clusters with added transportation data, capturing the 'crossover' (reclassification) phenomenon of some areas."
              aspect="16/9"
            />

            <Card>
              <p className="text-[12px] text-black/45">Cluster types and characteristics</p>
              <div className="mt-3 space-y-3 text-[13.5px] leading-7 text-black/60">
                <div className="border-l-2 border-red-500 pl-3">
                  <p className="font-medium text-black/75">
                    Cluster 0 (● Aging Growth Area)
                  </p>
                  <p>Population increase + high aging ratio. E.g., Sinchon-dong, Mansu 1-dong</p>
                </div>
                <div className="border-l-2 border-blue-500 pl-3">
                  <p className="font-medium text-black/75">
                    Cluster 1 (■ Mixed Growth Area)
                  </p>
                  <p>Population increase + generational balance. Complex demand area</p>
                </div>
                <div className="border-l-2 border-green-500 pl-3">
                  <p className="font-medium text-black/75">
                    Cluster 2 (◆ Youth Decline Area)
                  </p>
                  <p>Population decrease + high youth ratio. E.g., Jeongja 1-dong</p>
                </div>
                <div className="border-l-2 border-purple-500 pl-3">
                  <p className="font-medium text-black/75">
                    Cluster 3 (▲ Aging Decline Area)
                  </p>
                  <p>Population decrease + aging intensification. Preemptive intervention needed</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <p className="text-[12px] text-black/45">Analysis value</p>
              <div className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                <p>
                  <strong>1) Data discovery capability:</strong> Pattern recognition, not average comparison. Compressed high-dimensional data to 2D while maintaining meaningful cluster structure
                </p>
                <p>
                  <strong>2) Policy customization:</strong> Possible to establish intervention strategies tailored to cluster characteristics instead of 'overall average' (e.g., aging decline area → transportation welfare priority)
                </p>
                <p>
                  <strong>3) CRM application:</strong> Same framework as reclassifying customer segments with demographics + behavioral data to increase targeting accuracy
                </p>
              </div>
            </Card>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* 6) Geo Visualization - NEW with Slider */}
        <section className="py-10">
          <SectionTitle
            eyebrow="Visualization"
            title="Geospatial Visualization: Interactive CPS Map"
            desc="Implemented a dashboard that visualizes CPS scores of 118 administrative districts on a map and can simulate how priorities change by weight scenario. A decision tool that allows policy makers to immediately answer questions like 'what if we prioritize transportation?', 'what if we value population stability?' in real time."
          />

          <ImageSlider images={geoImages} />

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <Card>
              <p className="text-[12px] text-black/45">Feature 1: Weight simulation</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/60">
                Selecting from 5 weight sets like expert-based, resident participation, economic priority dynamically recalculates regional CPS scores and changes colors.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">Feature 2: Regional filtering</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/60">
                Can select Seoul, Incheon, Gyeonggi-do individually or in combination to focus analysis on areas of interest. Zoom in/out to check detailed administrative district boundaries.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">Feature 3: District details</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/60">
                Clicking a specific administrative district presents CPS total score and 4 major indicators (population stability, infrastructure accessibility, vacancy ratio, old building ratio) in bar charts to immediately identify strengths and weaknesses.
              </p>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <p className="text-[12px] text-black/45">Technology stack and implementation points</p>
              <div className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                <p>
                  <strong>· Geographic data processing:</strong> Processed administrative district boundary files with GeoPandas, GeoJSON. Performed address→lat/lon conversion (geocoding) with VWorld API
                </p>
                <p>
                  <strong>· Visualization library:</strong> Implemented interactive map with Streamlit + Plotly. Expressed score interval color gradients with Choropleth map
                </p>
                <p>
                  <strong>· Dynamic recalculation:</strong> When weights change, Python backend recalculates CPS scores in real time and sends JSON to frontend to update map
                </p>
                <p>
                  <strong>· Scalability:</strong> Designed with separated API endpoints, enabling reuse of the same CPS calculation logic in future web apps or mobile apps
                </p>
              </div>
            </Card>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* 7) Decision System */}
        <section className="py-10">
          <SectionTitle
            eyebrow="Decision System"
            title="Structure that turns scores into 'threshold judgments'"
            desc="CPS targets transition intervals not captured by average comparison. Designed as a judgment device that helps preemptive intervention before problems become visible by capturing thresholds transitioning from 'recoverable' to 'collapse'."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Figure
              src="/images/projects/empty-house-cps/data_evidence.png"
              alt="Correlation/importance/threshold evidence"
              captionTitle="Figure description"
              caption="Organized correlation, variable importance, and threshold graphs as an 'evidence bundle': organized as traceable evidence explaining why linear summation fails and why this point is urgent"
              aspect="16/9"
            />

            <Figure
              src="/images/projects/empty-house-cps/research_discovery.jpg"
              alt="Threshold collapse and key variable analysis"
              captionTitle="Figure description"
              caption="Presents together the interval plunging at thresholds and key variables (Drivers): visualizes judgment structure for creating preemptive intervention timing rather than post-response"
              aspect="16/9"
            />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <Card>
              <p className="text-[12px] text-black/45">Core perspective</p>
              <ul className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                <li>• Score presents 'actionable intervention sequence' not 'risk measurement'</li>
                <li>• Structure captures 'state transition points (Threshold)' not average comparison</li>
                <li>• Verifiable evidence (graphs, variables, logic) creates sustainable policy execution</li>
              </ul>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">Output format</p>
              <ul className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                <li>• CPS (priority score) and intervals</li>
                <li>• Key variables (Drivers) and evidence graphs</li>
                <li>• Intervention recommendations (policy/business execution units)</li>
              </ul>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">Scalability</p>
              <ul className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                <li>• Old infrastructure replacement priority judgment</li>
                <li>• Vulnerable area preemptive intervention timing decision</li>
                <li>• Regional regeneration/investment priority analysis</li>
              </ul>
            </Card>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* TAKEAWAYS */}
        <section className="py-10">
          <SectionTitle
            eyebrow="What this project proves"
            title="Problem-solving principles established in Empty House CPS"
            desc="Organized not simply as 'lessons learned' but as 'design criteria' reusable for other policy and spatial problems. Check the core first in the compressed version, and see the full context in the expanded version."
          />

          {/* 1) Compressed version: 6 cards */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <p className="text-[12px] text-black/45">1) Scores are sequences of action</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                CPS is not a diagnostic score that judges "dangerous/not dangerous" but an execution sequence system that decides "where to intervene first" within limited budget and personnel. Established the design criterion that the value of data comes not from prediction accuracy but from lowering the judgment cost of answering 'what to do next' for personnel.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">2) Variables speak through structure</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                Summing individual indicators independently leaves only 'average risk' and context disappears. When variables are structured based on correlations, interactions, and cascading effects, actionable sentences like "transportation blockage and infrastructure deterioration make recovery impossible" are derived. Structured design determines analysis depth.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">3) Look at transition points, not averages</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                Policy intervention does not start with average comparison. It is decided at thresholds transitioning from 'recoverable' to 'collapse'. By designing CPS around Thresholds rather than linear summation, a judgment structure was created that can capture preemptive intervention timing rather than post-response.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">4) Evidence creates execution</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                Persuasion starts with claims, but sustainable execution comes from verifiable evidence. First defined 'why change is necessary' with AS-IS/TO-BE structure, and organized correlation, variable importance, and threshold graphs as one evidence bundle to make "why this is urgent" explainable. This project is a system of logic, not analysis results.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">5) Pipeline is the path of evidence</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                The reason for connecting collection–refinement–structuring–scoring–recommendation was not to expand functions but to secure a traceable evidence flow of 'how this judgment was made through what process'. Pipeline is not an automation tool but a design principle that guarantees judgment accountability and reproducibility.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">6) Reusable judgment template</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                This structure applies not only to vacant houses but also to 'complex condition decision problems' like old infrastructure, vulnerable area preemptive intervention, public facility relocation, and investment priorities. This project is not a domain-specific analysis but an experience of securing a personal methodology for converting unstructured real data into actionable judgment structures.
              </p>
            </Card>
          </div>

          {/* 2) Full text: details */}
          <div className="mt-8">
            <details className="rounded-[22px] border border-black/10 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_30px_rgba(0,0,0,0.06)] group/details">
              <summary className="cursor-pointer select-none text-[14px] font-medium text-black/80 hover:text-black transition flex items-center gap-2">
                <span className="group-open/details:rotate-90 transition-transform duration-200">
                  ▶
                </span>
                View full text (Problem → Solution criteria)
              </summary>

              <div className="mt-8 space-y-10">
                <TakeawayItem
                  idx="1"
                  title="Scores are not numbers but 'sequences of action'"
                  quote="Predicting risk and deciding where to intervene first are completely different problems."
                  desc="Vacant house analysis often ends with the diagnosis 'high risk', but the actual bottleneck in administration and business is determining 'priorities' within limited resources. By designing CPS not as a 'diagnostic score' but as a 'score that creates intervention sequences', I established the criterion that the value of data comes not from prediction accuracy but from lowering the judgment cost of answering 'what to do next' for personnel. Scores are not indicators that explain states but navigation that guides execution."
                />

                <TakeawayItem
                  idx="2"
                  title="Variables are not independent but 'structure'"
                  quote="When relationships were connected, 'why it's urgent' began to be explained in sentences."
                  desc="Looking at individual indicators separately leaves only 'average risk'. But when connecting based on correlations and interactions of variables, context is generated. Actionable judgment sentences like 'transportation accessibility is cut off, medical infrastructure is insufficient, and population is flowing out, making recovery impossible' are derived. By organizing correlation, importance, and threshold evidence as one flow, I proved that structured design determines analysis depth."
                />

                <TakeawayItem
                  idx="3"
                  title="Policy problems are decided at 'transition points', not averages"
                  quote="We must capture the moment of transition from recoverable state to collapse."
                  desc="Policy does not move by average comparison. It is decided at thresholds where states transition from 'manageable' to 'intervention essential'. By designing CPS around Thresholds rather than simple summation, I created a judgment structure that can capture timing for preemptive intervention before collapse starts, rather than responding after problems become visible. Averages explain the past, and transition points prepare for the future."
                />

                <TakeawayItem
                  idx="4"
                  title="Persuasion without evidence does not last"
                  quote="Instead of plausible claims, create verifiable evidence bundles."
                  desc="Execution starts with persuasion, but sustainability comes from evidence. First organized 'why change is necessary' with AS-IS/TO-BE structure, and justified judgments by bundling correlation, variable importance, and threshold graphs as one flow. Organized each piece of evidence to connect as 'limitations of current method → necessity of alternative design → operating principle → priority derivation → execution recommendation'. As a result, this project remains as a logic system, not an analysis output."
                />

                <TakeawayItem
                  idx="5"
                  title="Pipeline is not implementation but 'path of evidence'"
                  quote="It must be traceable where the judgment was made."
                  desc="The reason for connecting collection–refinement–structuring–scoring–recommendation was not to increase functions but to create a traceable evidence flow of 'from what data, through what variables, with what logic this judgment was made'. Pipeline is not simple automation but a design principle that secures judgment accountability and reproducibility. Systems are not functions but structures of trust."
                />

                <TakeawayItem
                  idx="6"
                  title="'Judgment template' that crosses domains"
                  quote="Solved vacant houses, but actually created a method to convert complex conditions into decidable structures."
                  desc="This structure is not limited to vacant houses. It is directly applicable to 'unstructured complex condition decision problems' like old infrastructure replacement priorities, vulnerable area preemptive intervention, public facility relocation, and regional investment priorities. This project is not a domain-specific success case but an experience of securing a personal methodology for converting scattered public data into actionable judgment structures. The problem-solving method itself became a reusable asset."
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
              Next project: PMCC →
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
