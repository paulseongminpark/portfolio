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
        Your browser does not support the video tag.
      </video>
    </div>
    {caption ? (
      <p className="mt-3 text-[12.5px] leading-6 text-black/55">{caption}</p>
    ) : null}
  </div>
);

// Quote-style component used inside Takeaways
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
              A skincare decision system that turns photos, weather, and logs into
              actionable judgment.
            </h1>

            <p className="max-w-[92ch] text-[15px] leading-8 text-black/60">
              Skincare often ends as a vague impression—“better” or “worse”—while
              external variables like weather rarely make it into a routine in a
              systematic way. This project treats skin condition as a continuous
              state over time, combining image analysis with environmental data to
              help users understand not just what to do, but why a decision makes
              sense.
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
                View Product Demo
              </a>
            </div>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* 1) Problem Definition */}
        <section className="py-10">
          <SectionTitle
            eyebrow="PROBLEM"
            title="Problem Definition"
            desc="Once skin is treated as a one-off snapshot, care turns into reactive, event-by-event behavior. This project reframes skin as a continuous state over time—and builds a system that defines the criteria for judging that state."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <p className="text-[12px] text-black/45">Observed limits</p>
              <ul className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                <li>• Skin condition gets reduced to a single photo / a single moment.</li>
                <li>• Weather and other environmental variables stay disconnected from routine decisions.</li>
                <li>• Recommendations exist, but the user can’t see the reasoning behind them.</li>
              </ul>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">Direction</p>
              <ul className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                <li>• Redefine skin as a continuous state over time.</li>
                <li>• Combine image analysis + environmental data to create a condition-based decision layer.</li>
                <li>• Accumulate results as logs so users can read change and repetition patterns.</li>
              </ul>
            </Card>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* 2) Structural Insight */}
        <section className="py-10">
          <SectionTitle
            eyebrow="STRUCTURE"
            title="Structural Insight"
            desc="The core of this project is not prediction—it’s a decision system. Instead of consuming results, the user sees the conditions and criteria that produce those results."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <ImgCard
              src="/images/projects/skin-diary-ai/workflow.png"
              alt="Skin Diary AI user flow / end-to-end flow"
              caption="A single flow from end to end: upload photo → analyze → log → decide routine/ingredients."
              aspect="21/9"
            />
            <Card>
              <p className="text-[12px] text-black/45">
                Decision Layer design principles
              </p>
              <div className="mt-4 space-y-4 text-[13.5px] leading-7 text-black/60">
                <div className="border-l border-black/10 pl-3">
                  <p className="text-[13px] font-medium text-black/75">1) Decompose</p>
                  <p className="mt-1">
                    Break sensory judgment (dryness / irritation / breakout) into
                    conditions, scores, and labels—not a single sentence.
                  </p>
                </div>
                <div className="border-l border-black/10 pl-3">
                  <p className="text-[13px] font-medium text-black/75">2) Combine</p>
                  <p className="mt-1">
                    Don’t read skin output alone—bind it with external variables
                    like weather (temperature / humidity) so decisions stay contextual.
                  </p>
                </div>
                <div className="border-l border-black/10 pl-3">
                  <p className="text-[13px] font-medium text-black/75">3) Accumulate</p>
                  <p className="mt-1">
                    It’s not about today’s “answer.” Build a log that reveals patterns
                    over time—so routines can actually stick.
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
            title="Technical Implementation"
            desc="The technical layer is shown only as much as needed to establish trust—then the structure and the user-facing outputs do the convincing."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <ImgCard
              src="/images/projects/skin-diary-ai/bounding.png"
              alt="Bounding boxes and ROI example"
              caption="ROI generation via face/area bounding—preprocessing for region-based analysis."
            />
            <ImgCard
              src="/images/projects/skin-diary-ai/heatmap.png"
              alt="Result heatmap"
              caption="Region score heatmap—designed to show where and how things changed, not just a single verdict."
            />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <Card>
              <p className="text-[12px] text-black/45">Classification (labels)</p>
              <div className="mt-3">
                <SpecRow k="Method" v="Ensemble classification (Soft Voting)" />
                <SpecRow k="Models" v="XGBoost + LightGBM + RandomForest" />
                <SpecRow k="Selection" v="Weight search → Macro F1 as the 기준" />
              </div>
            </Card>
            <Card>
              <p className="text-[12px] text-black/45">Regression (scores)</p>
              <div className="mt-3">
                <SpecRow k="Method" v="VotingRegressor" />
                <SpecRow k="Models" v="LGBM + XGB + RandomForest" />
                <SpecRow k="Eval" v="RMSE (numeric), Accuracy/F1 (categorical)" />
              </div>
            </Card>
            <Card>
              <p className="text-[12px] text-black/45">Outputs</p>
              <ul className="mt-3 space-y-2 text-[13.5px] leading-7 text-black/60">
                <li>• Scores / labels (decision-ready values)</li>
                <li>• Region-based visualization (heatmap)</li>
                <li>• Condition-based guidance (rules)</li>
              </ul>
            </Card>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* 4) Decision System */}
        <section className="py-10">
          <SectionTitle
            eyebrow="DECISION SYSTEM"
            title="Turning “recommendations” into condition-based decisions"
            desc="Model output (observation) and rules/policy (operational judgment) are separated—so the reasoning and execution history of recommendations can be tracked end to end."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <ImgCard
              src="/images/projects/skin-diary-ai/erd.png"
              alt="Skin Diary AI ERD"
              caption="ERD: photo → metrics → rules/tags → recommendation runs, enabling traceable reasoning and history."
              aspect="21/9"
            />

            <Card>
              <p className="text-[12px] text-black/45">Key tables (summary)</p>
              <div className="mt-3 text-[13.5px] leading-7 text-black/60">
                <ul className="space-y-2">
                  <li>• APP_USER.SKIN_PHOTO: uploaded photos + metadata</li>
                  <li>• ML.ANALYSIS_METRIC_RESULT: model metrics (labels/scores)</li>
                  <li>• APP_USER.ANALYSIS_RESULTS: final report (JSON) + recommendation binding</li>
                  <li>• ML.RECOMMEND_RUN / ML.RECOMMENDED_INGREDIENT: execution logs + suggested ingredients</li>
                </ul>
                <p className="mt-4 text-[12.5px] leading-6 text-black/55">
                  This turns a one-off recommendation into a cumulative record system—
                  where reasoning, criteria, and actions keep stacking over time.
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
            title="Making “judgment” visible on the screen"
            desc="Instead of handing out an answer, the UI connects scores, labels, guidance, and ingredients inside one consistent criteria system."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <ImgCard
              src="/images/projects/skin-diary-ai/ui_analyzer.png"
              alt="Analysis + recommendation UI"
              caption="Analysis (scores/labels/heatmap) and recommendations (ingredients/routine) are connected on one screen."
              aspect="21/9"
            />
            <ImgCard
              src="/images/projects/skin-diary-ai/weather_advice.png"
              alt="Weather-linked advice screen"
              caption="Weather (KMA API) + care advice—external variables are treated as decision criteria."
              aspect="21/9"
            />
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* 6) Demo Video */}
        <section id="demo" className="py-10">
          <SectionTitle
            eyebrow="DEMO"
            title="Product Demo"
            desc="A real interaction flow: analysis → recommendation → guidance → logging, experienced as one continuous sequence."
          />

          <VideoCard
            src="/images/projects/skin-diary-ai/product_demo.mp4"
            caption="Product Demo: upload → analyze → recommend/advise → review logs"
            className="mx-auto max-w-[360px]"
          />
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* TAKEAWAYS */}
        <section className="py-10">
          <SectionTitle
            eyebrow="TAKEAWAYS"
            title="Reusable problem-solving criteria established here"
            desc="Lessons are written as design principles you can reuse on the next problem. Start with the compressed version, then expand below for the full problem–solution narrative."
          />

          {/* 1) Compressed: 6 cards */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <p className="text-[12px] text-black/45">1) Precision in decisions</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                When YOLO falsely flagged a facial mole as a “trouble,” it became clear:
                trust isn’t built by 99% accuracy—it’s built by stopping the absurd 1%.
                A voting ensemble plus a “unreadable” branch (poor lighting) became the
                service-level fail-safe.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">2) Designing context</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                Early LLM outputs repeated generic advice. Injecting situational variables
                like “delta vs yesterday” fixed it. The lesson: the key isn’t collecting more
                data—it’s designing context so AI understands why a message matters now.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">3) The case for schema</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                In the “store everything as JSON vs normalize” debate, normalization won—
                backed by future needs (commerce mapping, 28-day charts, sub-0.5s reads).
                Splitting METRIC_RESULT secured both performance and extensibility.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">4) Color psychology</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                Beta tests showed red warnings don’t move users—they scare them.
                Switching to Tea Rose (#F4ACB7) translated “danger” into “care needed.”
                UI became a translator that lowers cognitive and emotional cost.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">5) A product that grows</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                A one-time diagnosis is forgotten; time-series direction keeps users.
                Completing the analyze → store → feedback loop turned data from “logs”
                into a retention asset.
              </p>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">6) A reusable archetype</p>
              <p className="mt-3 text-[13.5px] leading-7 text-black/70">
                This isn’t only skincare. It’s a decision template: uncertain diagnosis (Vision)
                + external variables (API) + best-action suggestions (LLM). It generalizes to
                domains where states change and external factors intervene.
              </p>
            </Card>
          </div>

          {/* 2) Full original: details */}
          <div className="mt-8">
            <details className="rounded-[22px] border border-black/10 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_30px_rgba(0,0,0,0.06)] group/details">
              <summary className="cursor-pointer select-none text-[14px] font-medium text-black/80 hover:text-black transition flex items-center gap-2">
                <span className="group-open/details:rotate-90 transition-transform duration-200">
                  ▶
                </span>
                View full Takeaways (Problems &amp; Solutions)
              </summary>

              <div className="mt-8 space-y-10">
                <TakeawayItem
                  idx="1"
                  title="Decision-level details that remove probabilistic blind spots"
                  quote="“If the model reads a mole as acne, can this ship as a product?”"
                  desc="Early on, YOLO produced serious false positives—flagging even a distinctive facial mole as a ‘trouble.’ Simply adding more training data wasn’t enough. The fix was architectural: a voting ensemble to strengthen judgment, and a post-processing rule that marks low-light photos as ‘unreadable’ rather than forcing a prediction. The takeaway: AI trust is less about maximizing accuracy and more about designing fail-safes that prevent the 1% of absurd mistakes."
                />

                <TakeawayItem
                  idx="2"
                  title="Turning a parrot into an assistant: designing context"
                  quote="“When I gave it weather, it only repeated ‘drink more water.’”"
                  desc="When LangChain was first introduced, the LLM produced mechanical, generic advice. The breakthrough was adding a contextual variable—not just the environment, but the user’s delta vs yesterday. With that, the model began responding to situation: ‘Your hydration score dropped sharply since yesterday—prioritize moisture today.’ The lesson: data engineering isn’t only collection; it’s injecting context so AI understands why a recommendation is necessary now."
                />

                <TakeawayItem
                  idx="3"
                  title="Winning both speed and scale: the schema persuasion process"
                  quote="“Store everything in one JSON field vs normalize for the future.”"
                  desc="There was a tempting shortcut: dump all analysis results into a single JSON field. Instead, the decision was pushed toward normalization, grounded in future requirements—mapping to commerce product IDs, drawing 28-day charts, and reading within 0.5 seconds. The design split out METRIC_RESULT, securing query speed under larger volumes while keeping the system extensible. The experience made one thing clear: database design is not storage—it’s strategic removal of future bottlenecks."
                />

                <TakeawayItem
                  idx="4"
                  title="Color psychology: turning technology into care"
                  quote="“A red warning doesn’t move users—it scares them.”"
                  desc="The first UI used red to communicate ‘bad’ skin status. Beta tests showed users interpreted it as danger or even illness, creating resistance. The solution was tonal: replace red with Tea Rose (#F4ACB7), translating ‘danger’ into ‘care needed.’ The interface became a warm translator—designed to reduce anxiety and friction while still signaling action."
                />

                <TakeawayItem
                  idx="5"
                  title="From a one-off tool to a product that grows"
                  quote="“Direction of change beats today’s answer.”"
                  desc="Users don’t stick with an app for a one-time diagnosis. The focus shifted from single-image results to time-series trends that build conviction—‘my skin is improving.’ Completing the analyze → store → feedback loop made data more than logs: it became an asset that keeps users returning. A solid system architecture proved to be a retention strategy."
                />

                <TakeawayItem
                  idx="6"
                  title="A cross-domain archetype for solving problems"
                  quote="“I solved skincare, but what I built was a system for uncertainty.”"
                  desc="Although presented as a skincare app, the underlying process is an archetype: uncertain state diagnosis (Vision) + external variables (API) + best-action suggestions (LLM). The same structure maps to manufacturing defect detection or fintech anomaly detection. The real outcome wasn’t a single domain app—it was a reusable engineering template for turning messy reality into decision-ready information."
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
