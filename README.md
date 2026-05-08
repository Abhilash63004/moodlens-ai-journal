# 🌿 MoodLens — AI Mood Journal

> An AI-powered journaling web app that analyzes your emotional state from your writing using the Claude AI API.

![MoodLens Preview](https://via.placeholder.com/800x400/0d0f14/b8f0a0?text=MoodLens+AI+Journal)

---

## 🔥 What It Does

- 📝 You write a journal entry about your day or feelings
- 🤖 Claude AI analyzes the text and detects your mood
- 📊 Displays a **mood label**, **positivity score**, and **emotional insight**
- 💡 Suggests personalized self-care tips based on your mood
- 📅 Keeps a **local history** of past entries using browser storage

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| AI | [Anthropic Claude API](https://www.anthropic.com) |
| Storage | Browser LocalStorage |
| Fonts | Google Fonts (Playfair Display + DM Sans) |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/moodlens-ai-journal.git
cd moodlens-ai-journal
```

### 2. Get your Claude API Key
- Sign up at [console.anthropic.com](https://console.anthropic.com)
- Create an API key from the dashboard

### 3. Add your API key
Open `app.js` and replace:
```javascript
const API_KEY = "YOUR_API_KEY_HERE";
```
with your actual key.

> ⚠️ **Important:** Never commit API keys to GitHub. Use environment variables or a backend proxy in production.

### 4. Run it
Simply open `index.html` in your browser. No build step needed!

---

## 📁 Project Structure

```
moodlens-ai-journal/
│
├── index.html      # Main HTML structure
├── style.css       # All styling & animations
├── app.js          # JavaScript + Claude API logic
└── README.md       # You're reading this!
```

---

## 💡 How It Works

1. User writes a journal entry in the text area
2. `app.js` sends the text to Claude API with a structured prompt
3. Claude returns a JSON object with mood, score, insight & suggestions
4. The UI renders the result with smooth animations
5. Entry is saved to `localStorage` for history tracking

---

## 🎯 Future Improvements

- [ ] Add mood trend charts over time
- [ ] Backend API proxy for secure key management
- [ ] Export journal entries as PDF
- [ ] Dark/light theme toggle
- [ ] Voice-to-text journaling

---

## 👤 Author

**RAVURI ABHILASH**  
[LinkedIn](https://linkedin.com/in/ravuriabhilash) · [GitHub](https://github.com/Abhilash63004)

---

## 📄 License

MIT License — free to use and modify.
