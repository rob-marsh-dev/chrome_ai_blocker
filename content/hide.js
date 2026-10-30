const OFF_ATTR = "data-ai-blocker-off";
const HIDDEN_ATTR = "data-ai-blocker-hidden";
const HEADINGS = 'h1, h2, h3, [role="heading"]';
const LABELS = new Set(["AI Overview"]);
const RESULTS = "#rso";
const BOUNDARY = "#rso, #center_col, #rcnt, #main, body";

function findBlock(heading) {
  let block = heading;
  while (
    block.parentElement &&
    !block.parentElement.matches(BOUNDARY) &&
    !block.parentElement.querySelector(RESULTS)
  ) {
    block = block.parentElement;
  }
  return block;
}

function scan() {
  for (const heading of document.querySelectorAll(HEADINGS)) {
    if (LABELS.has(heading.textContent.trim()) && !heading.closest("a")) {
      findBlock(heading).setAttribute(HIDDEN_ATTR, "");
    }
  }
  for (const block of document.querySelectorAll(`[${HIDDEN_ATTR}]`)) {
    if (block.querySelector(RESULTS)) {
      block.removeAttribute(HIDDEN_ATTR);
    }
  }
}

chrome.storage.local.get({ mode: "web" }).then(({ mode }) => {
  if (mode === "off") {
    document.documentElement.setAttribute(OFF_ATTR, "");
    return;
  }
  scan();
  new MutationObserver(scan).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
});
