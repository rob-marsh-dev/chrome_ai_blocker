const form = document.getElementById("modes");

chrome.storage.local.get({ mode: "web" }).then(({ mode }) => {
  form.elements.mode.value = mode;
});

form.addEventListener("change", () => {
  chrome.storage.local.set({ mode: form.elements.mode.value });
});
