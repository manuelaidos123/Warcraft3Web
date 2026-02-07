import { useState, useCallback } from "react";
import { useParallaxLayers } from "../hooks/useParallax";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  image?: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the name of the cursed blade that corrupted Arthas?",
    options: ["Ashbringer", "Frostmourne", "Thunderfury", "Shadowmourne"],
    correct: 1,
    explanation: "Frostmourne was the cursed runeblade placed in Northrend by the Lich King. When Arthas took up the blade to save his people, it consumed his soul.",
  },
  {
    id: 2,
    question: "Who was the Warchief that led the Horde to Kalimdor?",
    options: ["Grom Hellscream", "Durotan", "Thrall", "Orgrim Doomhammer"],
    correct: 2,
    explanation: "Thrall (Go'el) united the orc clans and led the Horde across the Great Sea to Kalimdor, following the Prophet Medivh's warning.",
  },
  {
    id: 3,
    question: "Which demon lord did Grom Hellscream slay to free the orcs from the blood curse?",
    options: ["Archimonde", "Kil'jaeden", "Mannoroth", "Tichondrius"],
    correct: 2,
    explanation: "Grom Hellscream sacrificed his life to slay Mannoroth the Destructor, freeing the orcs from the demonic blood curse that had enslaved them.",
  },
  {
    id: 4,
    question: "What was Jaina Proudmoore's title?",
    options: ["High Priestess", "Ranger-General", "Archmage of the Kirin Tor", "Warden"],
    correct: 2,
    explanation: "Jaina Proudmoore was an Archmage and leader of the Kirin Tor, one of the most powerful human sorceresses in Azeroth's history.",
  },
  {
    id: 5,
    question: "What did Illidan consume to gain his demon hybrid form?",
    options: ["The Well of Eternity", "The Skull of Gul'dan", "Frostmourne", "The Eye of Sargeras"],
    correct: 1,
    explanation: "Illidan consumed the power of the Skull of Gul'dan, destroying the corrupted artifact but transforming himself into a demon-night elf hybrid.",
  },
  {
    id: 6,
    question: "Who is known as the 'First Paladin'?",
    options: ["Arthas Menethil", "Tirion Fordring", "Uther the Lightbringer", "Turalyon"],
    correct: 2,
    explanation: "Uther the Lightbringer was the first Knight of the Silver Hand, the first paladin, and the mentor of Prince Arthas.",
  },
  {
    id: 7,
    question: "What event destroyed the World Tree Nordrassil?",
    options: ["The Sundering", "The Battle of Mount Hyjal", "The Culling of Stratholme", "The Fall of Lordaeron"],
    correct: 1,
    explanation: "During the Battle of Mount Hyjal, Malfurion Stormrage detonated the World Tree's power to destroy Archimonde, sacrificing the Night Elves' immortality.",
  },
  {
    id: 8,
    question: "What race did Sylvanas Windrunner belong to before becoming undead?",
    options: ["Human", "Night Elf", "High Elf", "Blood Elf"],
    correct: 2,
    explanation: "Sylvanas was a High Elf and served as Ranger-General of Silvermoon before Arthas killed her and raised her as a banshee.",
  },
  {
    id: 9,
    question: "Who founded the Cult of the Damned?",
    options: ["Arthas", "Kel'Thuzad", "Ner'zhul", "Mal'Ganis"],
    correct: 1,
    explanation: "Kel'Thuzad, a former mage of the Kirin Tor, founded the Cult of the Damned to spread the plague of undeath and serve the Lich King.",
  },
  {
    id: 10,
    question: "What is the name of the High Chieftain of the Tauren in Warcraft III?",
    options: ["Baine Bloodhoof", "Cairne Bloodhoof", "Hamuul Runetotem", "Magatha Grimtotem"],
    correct: 1,
    explanation: "Cairne Bloodhoof was the wise High Chieftain who allied the Tauren with Thrall's Horde and founded Thunder Bluff.",
  },
  {
    id: 11,
    question: "What happened when Arthas reached the Frozen Throne?",
    options: [
      "He destroyed it",
      "He was defeated by Illidan",
      "He shattered the ice and donned the Helm of Domination",
      "He freed Ner'zhul",
    ],
    correct: 2,
    explanation: "Arthas climbed Icecrown, shattered the Frozen Throne with Frostmourne, and donned the Helm of Domination, merging with Ner'zhul to become the new Lich King.",
  },
  {
    id: 12,
    question: "Who was the Prophet who warned the leaders of Azeroth about the Burning Legion?",
    options: ["Medivh", "Antonidas", "Khadgar", "Aegwynn"],
    correct: 0,
    explanation: "Medivh, the Last Guardian of Tirisfal, was resurrected and appeared as a mysterious Prophet to warn the mortal races of the coming invasion.",
  },
  {
    id: 13,
    question: "Which campaign is NOT part of Warcraft III: Reign of Chaos?",
    options: [
      "The Scourge of Lordaeron",
      "The Departure",
      "Terror of the Tides",
      "Eternity's End",
    ],
    correct: 2,
    explanation: "Terror of the Tides is the Sentinel (Night Elf) campaign from The Frozen Throne expansion, not the original Reign of Chaos.",
  },
  {
    id: 14,
    question: "What is the name of the Night Elf demigod who trained Malfurion in druidism?",
    options: ["Elune", "Cenarius", "Malorne", "Aviana"],
    correct: 1,
    explanation: "Cenarius, the Lord of the Forest and son of Malorne and Elune, taught Malfurion Stormrage the druidic arts, making him the first mortal druid.",
  },
  {
    id: 15,
    question: "Which city did Arthas purge before traveling to Northrend?",
    options: ["Dalaran", "Lordaeron", "Stratholme", "Silvermoon"],
    correct: 2,
    explanation: "Arthas purged Stratholme after discovering its grain supply was contaminated with the plague of undeath, killing citizens before they could turn.",
  },
];

export function TestPage() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleSelect = useCallback((idx: number) => {
    if (answered) return;
    setSelected(idx);
  }, [answered]);

  const handleConfirm = useCallback(() => {
    if (selected === null) return;
    setAnswered(true);
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    if (selected === questions[currentQ].correct) {
      setScore(s => s + 1);
    }
  }, [selected, currentQ, answers]);

  const handleNext = useCallback(() => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  }, [currentQ]);

  const handleRestart = useCallback(() => {
    setStarted(true);
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  }, []);

  const { bgRef, contentRef, bgOffset, contentOffset, opacity } = useParallaxLayers();

  const heroStyle = { background: "linear-gradient(135deg, #1a1a2e 0%, #6e1a1a 50%, #16213e 100%)" };

  const renderHero = (title: string, subtitle: string, isSmall?: boolean) => (
    <section className={`page-hero parallax-hero ${isSmall ? "page-hero-sm" : ""}`} style={heroStyle}>
      <div className="parallax-bg" ref={bgRef} style={{ transform: `translateY(${bgOffset}px)` }}>
        <div className="parallax-decoration parallax-questions">
          <span style={{ left: "15%", top: "30%", animationDelay: "0s" }}>❓</span>
          <span style={{ left: "85%", top: "40%", animationDelay: "1.5s" }}>❓</span>
        </div>
      </div>
      <div className="container parallax-content" ref={contentRef} style={{ transform: `translateY(${contentOffset}px)`, opacity }}>
        <h1 className={`page-hero-title ${isSmall ? "page-hero-title-sm" : ""}`}>{title}</h1>
        {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
      </div>
    </section>
  );

  const getScoreMessage = () => {
    const pct = (score / questions.length) * 100;
    if (pct === 100) return { title: "Perfect Score! 🏆", msg: "You are a true Warcraft III master! Lok'tar Ogar!", color: "#ffd700" };
    if (pct >= 80) return { title: "Excellent! ⭐", msg: "You know your Warcraft III lore very well!", color: "#10b981" };
    if (pct >= 60) return { title: "Good Job! 👍", msg: "Solid knowledge, but there's more to learn.", color: "#2f89fc" };
    if (pct >= 40) return { title: "Not Bad 📚", msg: "You know the basics. Time to replay the campaigns!", color: "#f59e0b" };
    return { title: "Keep Learning 💀", msg: "The Lich King is disappointed. Study the lore and try again!", color: "#ef4444" };
  };

  if (!started) {
    return (
      <div className="test-page">
        {renderHero("Warcraft III Knowledge Test", "How well do you know the lore of Warcraft III?")}
        <div className="container main-content-inner">
          <div className="test-intro">
            <div className="test-intro-icon">⚔️</div>
            <h2>Are You Ready?</h2>
            <p>This quiz contains <strong>{questions.length} questions</strong> about Warcraft III: Reign of Chaos and The Frozen Throne.</p>
            <ul className="test-intro-list">
              <li><i className="fas fa-clock" aria-hidden="true"></i> No time limit — take your time</li>
              <li><i className="fas fa-check-circle" aria-hidden="true"></i> Each question has one correct answer</li>
              <li><i className="fas fa-book" aria-hidden="true"></i> Covers story, characters, factions, and lore</li>
              <li><i className="fas fa-redo" aria-hidden="true"></i> You can retake the quiz anytime</li>
            </ul>
            <button className="btn-primary-wc btn-lg" onClick={() => setStarted(true)}>
              <i className="fas fa-play" aria-hidden="true"></i> Start the Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    const result = getScoreMessage();
    return (
      <div className="test-page">
        {renderHero("Quiz Results", "See how you did!")}
        <div className="container main-content-inner">
          <div className="test-results">
            <div className="test-score-circle" style={{ borderColor: result.color }}>
              <span className="test-score-number" style={{ color: result.color }}>{score}</span>
              <span className="test-score-total">/ {questions.length}</span>
            </div>
            <h2 style={{ color: result.color }}>{result.title}</h2>
            <p className="test-result-msg">{result.msg}</p>
            <p className="test-result-pct">{Math.round((score / questions.length) * 100)}% correct</p>

            <div className="test-review">
              <h3>Review Your Answers</h3>
              {questions.map((q, i) => {
                const isCorrect = answers[i] === q.correct;
                return (
                  <div key={q.id} className={`review-item ${isCorrect ? "review-correct" : "review-wrong"}`}>
                    <div className="review-header">
                      <span className={`review-icon ${isCorrect ? "" : "wrong"}`}>
                        <i className={`fas ${isCorrect ? "fa-check" : "fa-times"}`} aria-hidden="true"></i>
                      </span>
                      <span className="review-q-num">Q{i + 1}.</span>
                      <span>{q.question}</span>
                    </div>
                    <div className="review-details">
                      <p>
                        <span className="review-label">Your answer:</span>{" "}
                        <span className={isCorrect ? "text-correct" : "text-wrong"}>{q.options[answers[i]]}</span>
                      </p>
                      {!isCorrect && (
                        <p>
                          <span className="review-label">Correct answer:</span>{" "}
                          <span className="text-correct">{q.options[q.correct]}</span>
                        </p>
                      )}
                      <p className="review-explanation"><i className="fas fa-info-circle" aria-hidden="true"></i> {q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="btn-primary-wc btn-lg" onClick={handleRestart}>
              <i className="fas fa-redo" aria-hidden="true"></i> Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];
  const progress = ((currentQ) / questions.length) * 100;

  return (
    <div className="test-page">
      {renderHero("Knowledge Test", "", true)}
      <div className="container main-content-inner">
        <div className="test-quiz">
          {/* Progress */}
          <div className="quiz-progress">
            <div className="quiz-progress-info">
              <span>Question {currentQ + 1} of {questions.length}</span>
              <span>Score: {score}</span>
            </div>
            <div className="quiz-progress-bar">
              <div className="quiz-progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          {/* Question */}
          <div className="quiz-question-card">
            <h2 className="quiz-question">{q.question}</h2>
            <div className="quiz-options">
              {q.options.map((opt, i) => {
                let optClass = "quiz-option";
                if (answered) {
                  if (i === q.correct) optClass += " correct";
                  else if (i === selected && i !== q.correct) optClass += " wrong";
                } else if (i === selected) {
                  optClass += " selected";
                }
                return (
                  <button
                    key={i}
                    className={optClass}
                    onClick={() => handleSelect(i)}
                    disabled={answered}
                  >
                    <span className="quiz-option-letter">{String.fromCharCode(65 + i)}</span>
                    <span>{opt}</span>
                    {answered && i === q.correct && <i className="fas fa-check quiz-option-icon" aria-hidden="true"></i>}
                    {answered && i === selected && i !== q.correct && <i className="fas fa-times quiz-option-icon" aria-hidden="true"></i>}
                  </button>
                );
              })}
            </div>

            {answered && (
              <div className={`quiz-explanation ${selected === q.correct ? "correct" : "wrong"}`}>
                <i className={`fas ${selected === q.correct ? "fa-check-circle" : "fa-times-circle"}`} aria-hidden="true"></i>
                <p>{q.explanation}</p>
              </div>
            )}

            <div className="quiz-actions">
              {!answered ? (
                <button className="btn-primary-wc" onClick={handleConfirm} disabled={selected === null}>
                  Confirm Answer
                </button>
              ) : (
                <button className="btn-primary-wc" onClick={handleNext}>
                  {currentQ < questions.length - 1 ? "Next Question" : "See Results"}{" "}
                  <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
