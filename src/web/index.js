import { addListeners } from "../pec4/pec4.js";

export async function startApp() {
  addListeners();
}

window.addEventListener("DOMContentLoaded", async () => {
  await startApp();
});
