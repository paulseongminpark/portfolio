/**
 * 목적:
 * - app/ 폴더 하위의 .ts/.tsx 파일을 전부 스캔해서
 * - "한글(가-힣ㄱ-ㅎㅏ-ㅣ)이 포함된 텍스트"만 추출하고
 * - 번역 큐 파일로 저장합니다.
 *
 * 출력:
 * 1) translation/translation_queue_all.txt (전체 모음)
 * 2) translation/by_file/<sanitized_path>.txt (파일별)
 *
 * 주의:
 * - TSX를 완전 파싱하는 파서는 아닙니다.
 * - 실용적으로 “번역할 한국어 카피”를 뽑는 목적에 최적화되어 있습니다.
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const APP_DIR = path.resolve(ROOT, "app");
const OUT_DIR = path.resolve(ROOT, "translation");
const OUT_BY_FILE_DIR = path.join(OUT_DIR, "by_file");
const OUT_ALL = path.join(OUT_DIR, "translation_queue_all.txt");

const KOREAN_RE = /[가-힣ㄱ-ㅎㅏ-ㅣ]/;

// 스캔 제외(원하시면 더 추가 가능)
const IGNORE_DIRS = new Set([
  ".next",
  "node_modules",
  ".git",
  "public",
  "translation",
]);

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function walk(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const ent of entries) {
    const full = path.join(dir, ent.name);

    if (ent.isDirectory()) {
      if (IGNORE_DIRS.has(ent.name)) continue;
      results.push(...walk(full));
      continue;
    }

    if (ent.isFile()) {
      if (ent.name.endsWith(".ts") || ent.name.endsWith(".tsx")) {
        results.push(full);
      }
    }
  }
  return results;
}

function sanitizePathForFilename(filePath) {
  // 루트 기준 상대경로를 안전한 파일명으로 바꿈
  const rel = path.relative(ROOT, filePath);
  return rel
    .replace(/\\/g, "__")
    .replace(/\//g, "__")
    .replace(/[:<>|"?*]/g, "_"); // Windows 금지 문자 방지
}

function extractKoreanBlocks(code) {
  const blocks = [];
  const lines = code.split(/\r?\n/);

  // (A) JSX 텍스트 후보: 한글이 들어간 "문장 라인" 우선 추출
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    if (!KOREAN_RE.test(t)) continue;

    // 코드 성격 라인 최대한 제외
    const looksLikeCode =
      t.startsWith("import ") ||
      t.startsWith("export ") ||
      t.includes("className=") ||
      t.includes("const ") ||
      t.includes("function ") ||
      t.includes("=>") ||
      t === "{" ||
      t === "}" ||
      t.startsWith("//") ||
      t.startsWith("/*") ||
      t.startsWith("*");

    if (!looksLikeCode) blocks.push(t);
  }

  // (B) 문자열 리터럴("...", '...', `...`) 내부 한글 추출
  const stringLiteralRe = /(["'`])((?:\\\1|\\.|(?!\1).)*?)\1/g;
  let m;
  while ((m = stringLiteralRe.exec(code)) !== null) {
    const content = (m[2] || "").trim();
    if (!content) continue;
    if (!KOREAN_RE.test(content)) continue;

    // 너무 짧은 조각 제외(원하시면 기준 조정 가능)
    if (content.length < 2) continue;

    blocks.push(content);
  }

  // 정리: 중복 제거 + 공백 normalize
  const uniq = [];
  const seen = new Set();
  for (const b of blocks) {
    const key = b.replace(/\s+/g, " ").trim();
    if (!key) continue;
    if (seen.has(key)) continue;
    seen.add(key);
    uniq.push(key);
  }
  return uniq;
}

function writeFileQueue(relPath, blocks) {
  if (blocks.length === 0) return null;

  const outName = sanitizePathForFilename(relPath) + ".txt";
  const outPath = path.join(OUT_BY_FILE_DIR, outName);

  const lines = [];
  lines.push("[PATH]");
  lines.push(relPath);
  lines.push("");

  blocks.forEach((b, i) => {
    const n = String(i + 1).padStart(3, "0");
    lines.push(`[BLOCK ${n}]`);
    lines.push(b);
    lines.push("");
  });

  lines.push("[INDEX]");
  blocks.forEach((b, i) => {
    const n = String(i + 1).padStart(3, "0");
    const preview = b.length > 50 ? b.slice(0, 50) + "…" : b;
    lines.push(`- BLOCK ${n}: ${preview}`);
  });
  lines.push("");

  fs.writeFileSync(outPath, lines.join("\n"), "utf8");
  return outPath;
}

function writeAllQueue(perFileData) {
  const lines = [];
  lines.push("[TRANSLATION QUEUE — ALL FILES]");
  lines.push(`Generated at: ${new Date().toISOString()}`);
  lines.push("");

  let totalBlocks = 0;

  for (const item of perFileData) {
    const { relPath, blocks } = item;
    if (!blocks || blocks.length === 0) continue;

    lines.push("=".repeat(72));
    lines.push("[PATH]");
    lines.push(relPath);
    lines.push("");

    blocks.forEach((b, i) => {
      totalBlocks += 1;
      const n = String(i + 1).padStart(3, "0");
      lines.push(`[BLOCK ${n}]`);
      lines.push(b);
      lines.push("");
    });
  }

  lines.push("=".repeat(72));
  lines.push(`[SUMMARY] files_with_korean=${perFileData.filter(x => x.blocks.length>0).length}, total_blocks=${totalBlocks}`);
  lines.push("");

  fs.writeFileSync(OUT_ALL, lines.join("\n"), "utf8");
  return { totalBlocks };
}

function main() {
  if (!fs.existsSync(APP_DIR)) {
    console.error("❌ app/ directory not found:", APP_DIR);
    process.exit(1);
  }

  ensureDir(OUT_DIR);
  ensureDir(OUT_BY_FILE_DIR);

  const files = walk(APP_DIR);
  const perFileData = [];

  for (const absPath of files) {
    const relPath = path.relative(ROOT, absPath);
    const code = fs.readFileSync(absPath, "utf8");
    const blocks = extractKoreanBlocks(code);
    perFileData.push({ relPath, blocks });
    writeFileQueue(relPath, blocks);
  }

  const { totalBlocks } = writeAllQueue(perFileData);

  const filesWithKorean = perFileData.filter(x => x.blocks.length > 0).length;
  console.log(`✅ Scanned ${files.length} files under app/`);
  console.log(`✅ Files with Korean: ${filesWithKorean}`);
  console.log(`✅ Total blocks extracted: ${totalBlocks}`);
  console.log(`✅ Wrote: ${path.relative(ROOT, OUT_ALL)}`);
  console.log(`✅ Wrote per-file queues in: ${path.relative(ROOT, OUT_BY_FILE_DIR)}`);
}

main();
