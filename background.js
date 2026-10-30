const RULESET_ID = "web_only";

async function syncRuleset() {
  const { mode } = await chrome.storage.local.get({ mode: "web" });
  await chrome.declarativeNetRequest.updateEnabledRulesets(
    mode === "web"
      ? { enableRulesetIds: [RULESET_ID] }
      : { disableRulesetIds: [RULESET_ID] }
  );
}

chrome.runtime.onInstalled.addListener(syncRuleset);
chrome.runtime.onStartup.addListener(syncRuleset);
chrome.storage.onChanged.addListener((changes) => {
  if (changes.mode) {
    syncRuleset();
  }
});
