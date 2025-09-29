# AI-Assisted Knowledge Quiz

A web-based quiz application enhanced with AI-generated feedback and interactive UI components. Users can attempt quizzes, get instant scoring, and receive AI-generated explanations for their answers.

---

## 1. Project Setup & Demo

### **Web**

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Open your browser at [http://localhost:5173](http://localhost:5173) to see the app.

### **Demo**

- Provide a screen recording or hosted link for the web version.

---

## 2. Problem Understanding

This project aims to create an **interactive quiz platform** where:

- Users can take multiple-choice quizzes.
- Scores are calculated instantly.
- AI generates detailed feedback for each answer.
- Navigation between questions can be via next/previous buttons or a question drawer.

**Assumptions:**

- Quizzes are predefined or generated via AI.
- Each question has only one correct option.
- Timer functionality is supported.

---

## 3. AI Prompts & Iterations

### **Services**

1. `aiFeedbackService.ts` – Generates AI-based feedback for submitted answers.
2. `aiService.ts` – Generates quiz questions dynamically.

**Example Usage:**

```ts
const feedbackText = await generateFeedback({
  questions: quiz.questions.map((q, i) => ({
    question: q.question,
    options: q.options,
    correctAnswer: q.answer,
    userAnswer: selectedOptions[i],
  })),
  score: totalCorrect,
});
```

**Iterations:**

- **Initial prompt:** Simple explanation of answers.
- **Issue:** Feedback was verbose and generic.
- **Refinement:** Prompts now generate **concise, clear, actionable feedback**.

---

## 4. Architecture & Code Structure

**Project folders:**

```
src/
 ├─ components/
 │   ├─ common/        # Generic components
 │   │   ├─ Confetti.tsx
 │   │   ├─ Loader.tsx
 │   │   ├─ ProgressBar.tsx
 │   │   └─ Timer.tsx
 │   ├─ quiz/          # Quiz-specific components
 │   │   ├─ QuestionCard.tsx
 │   │   ├─ QuestionDrawer.tsx
 │   │   ├─ NavigationButtons.tsx
 │   │   ├─ QuizHeader.tsx
 │   │   ├─ QuizModal.tsx
 │   │   └─ FeedbackBox.tsx
 ├─ services/
 │   ├─ aiFeedbackService.ts
 │   └─ aiService.ts
 ├─ pages/
 │   ├─ Home.tsx
 │   └─ Quizz.tsx
 └─ App.tsx
```

**Key Components & Pages:**

- **Home.tsx** – Quiz selection.
- **Quizz.tsx** – Quiz interface.
- **QuizHeader.tsx** – Shows quiz info, timer, score, confetti.
- **QuestionCard.tsx** – Single question with options.
- **NavigationButtons.tsx** – Previous / Next / Submit buttons.
- **QuestionDrawer.tsx** – Quick navigation to any question.
- **FeedbackBox.tsx** – Displays AI-generated feedback.
- **Loader.tsx, ProgressBar.tsx, Timer.tsx, Confetti.tsx** – Reusable UI components.

---

## 5. Screenshots / Screen Recording

Include:

# Project Screenshots

## Home Page

![Home Page](/public/screenshots/home.png)

## Home Loading

![Home Loading](/public/screenshots/homeLoading.png)

## Home Loaded

![Home Loading](/public/screenshots/homeLoaded.png)

## Quiz Page

![Quiz Page](/public/screenshots/quiz.png)

## Drawer Navigation

![Drawer Navigation](/public/screenshots/quizDrawer.png)

## AI Feedback Loading

![AI Feedback Loading](/public/screenshots/aifeedbackLoading.png)

## AI Feedback Loaded

![AI Feedback Loaded](/public/screenshots/aiFeedBackLoaded.png)

## DarkMode and Confetti effect

![DarkMode and Confetti](/public/screenshots/confetti.png)

1. Home page / quiz selection
2. Quiz interface
3. Drawer navigation
4. AI feedback after submission
5. Dark mode toggle

---

## 6. Known Issues / Improvements

- Feedback generation may be delayed for long quizzes.
- No persistent storage of quizzes or user progress.
- Timer auto-submit is not fully robust.
- No routes protection

**Future improvements:**

- User authentication & progress tracking.
- Add database integration to store user previous records.

---

## 7. Bonus Features

- Confetti animation for perfect scores.
- Dark mode toggle.
- Drawer navigation for question selection.
- Responsive design with TailwindCSS.

---

## 8. Development / Code Formatting

This project uses **Prettier** to keep the code clean and consistent.

### **Setup Prettier**

Install Prettier (and optional Tailwind plugin):

```bash
npm install --save-dev prettier prettier-plugin-tailwindcss
```

Add a `.prettierrc` file in the project root:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### **Format Code**

Format all files:

```bash
npx prettier --write .
```

Or format a single file:

```bash
npx prettier --write src/App.tsx
```

### **VSCode Integration**

1. Install the **Prettier – Code Formatter** extension.
2. Enable **Format on Save** in VSCode settings.
3. Prettier will automatically format files whenever you save.

> **Tip:** The Tailwind plugin sorts your Tailwind classes automatically for cleaner and consistent markup.
