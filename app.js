// ── MoodLens AI Journal — app.js ──
// Uses Claude AI API to analyze journal entries and detect mood

const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";

// NOTE: In a real project, NEVER expose API keys in frontend code.
// Use a backend server/proxy to make API calls securely.
// For this demo, you can use a local proxy or serverless function.
const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your Anthropic API key

let journalHistory = JSON.parse(localStorage.getItem("moodHistory") || "[]");

// ── Render history on load ──
window.onload = () => { renderHistory(); };

// ── Main Analyze Function ──
async function analyzeMood() {
  const input = document.getElementById("journal-input").value.trim();

  if (!input || input.length < 10) {
    alert("Please write at least a sentence or two about your day 🌿");
    return;
  }

  setLoading(true);

  try {
    const result = await callClaudeAPI(input);
    displayResult(result, input);
    saveToHistory(input, result);
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Check your API key or network connection.");
  } finally {
    setLoading(false);
  }
}

// ── Call Claude API ──
async function callClaudeAPI(text) {
  const prompt = `
You are an empathetic AI mood analyzer. Analyze the following journal entry and respond ONLY with a valid JSON object (no markdown, no extra text).

Journal entry: "${text}"

Respond with this exact JSON format:
{
  "mood": "one word mood label like Happy / Anxious / Calm / Sad / Excited / Stressed / Grateful / Overwhelmed",
  "emoji": "one relevant emoji",
  "score": a number from 0 to 100 representing positivity (0=very negative, 100=very positive),
  "insight": "2-3 sentences of warm, empathetic insight about the person's emotional state",
  "suggestions": ["short tip 1", "short tip 2", "short tip 3"]
}
`;

  const response = await fetch(CLAUDE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error("API Error: " + err);
  }

  const data = await response.json();
  const raw = data.content[0].text.trim();

  // Safely parse JSON response
  const cleaned = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}

// ── Display Result ──
function displayResult(result, originalText) {
  const card = document.getElementById("result-card");
  card.classList.remove("hidden");

  // Mood badge
  document.getElementById("mood-badge").textContent = `${result.emoji}  ${result.mood}`;

  // Score bar
  const bar = document.getElementById("score-bar");
  const scoreVal = document.getElementById("score-value");
  setTimeout(() => { bar.style.width = result.score + "%"; }, 100);
  scoreVal.textContent = result.score + "/100";

  // Insight
  document.getElementById("ai-insight").textContent = result.insight;

  // Suggestions
  const sugDiv = document.getElementById("suggestions");
  sugDiv.innerHTML = "";
  (result.suggestions || []).forEach(s => {
    const chip = document.createElement("span");
    chip.className = "suggestion-chip";
    chip.textContent = "💡 " + s;
    sugDiv.appendChild(chip);
  });

  card.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// ── Save to History ──
function saveToHistory(text, result) {
  const entry = {
    text: text.substring(0, 80) + (text.length > 80 ? "..." : ""),
    mood: result.mood,
    emoji: result.emoji,
    score: result.score,
    date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
  };
  journalHistory.unshift(entry);
  if (journalHistory.length > 10) journalHistory = journalHistory.slice(0, 10);
  localStorage.setItem("moodHistory", JSON.stringify(journalHistory));
  renderHistory();
}

// ── Render History ──
function renderHistory() {
  const list = document.getElementById("history-list");
  const section = document.getElementById("history-section");

  if (!journalHistory.length) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";
  list.innerHTML = "";

  journalHistory.forEach(entry => {
    const item = document.createElement("div");
    item.className = "history-item";
    item.innerHTML = `
      <div>
        <div class="history-text">${entry.text}</div>
        <div class="history-date">📅 ${entry.date} · Score: ${entry.score}/100</div>
      </div>
      <div class="history-mood">${entry.emoji} ${entry.mood}</div>
    `;
    list.appendChild(item);
  });
}

// ── Loading State ──
function setLoading(state) {
  const btn = document.getElementById("analyze-btn");
  document.getElementById("btn-text").classList.toggle("hidden", state);
  document.getElementById("btn-loader").classList.toggle("hidden", !state);
  btn.disabled = state;
}
