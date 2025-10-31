const quizQuestions = [
  {
    question: "Quem é o fundador da Terapia Cognitiva Comportamental (TCC)?",
    options: [
      "Sigmund Freud",
      "Aaron Beck",
      "Carl Jung",
      "B.F. Skinner"
    ],
    correct: 1,
    explanation: "Aaron Beck desenvolveu a TCC nos anos 1960, revolucionando a psicoterapia moderna."
  },
  {
    question: "Qual é o princípio central da TCC?",
    options: [
      "Os eventos em si causam nossas emoções",
      "A interpretação dos eventos determina nossas emoções",
      "As emoções são incontroláveis",
      "O passado determina completamente o presente"
    ],
    correct: 1,
    explanation: "A TCC baseia-se na ideia de que não são os eventos em si que nos perturbam, mas a interpretação que fazemos deles."
  },
  {
    question: "Qual das seguintes é uma crença central?",
    options: [
      "Se eu falhar, serei rejeitado",
      "Eu sou inadequado",
      "Eu sempre estrago tudo",
      "Devo ser perfeito"
    ],
    correct: 1,
    explanation: "Crenças centrais são as mais profundas e absolutas sobre nós mesmos, como 'Eu sou inadequado'."
  },
  {
    question: "Quantas sessões geralmente dura um tratamento com TCC?",
    options: [
      "5 a 8 sessões",
      "12 a 20 sessões",
      "30 a 40 sessões",
      "Mais de 50 sessões"
    ],
    correct: 1,
    explanation: "A TCC é uma terapia breve, geralmente durando entre 12 a 20 sessões."
  },
  {
    question: "Qual técnica NÃO faz parte da modificação de crenças na TCC?",
    options: [
      "Registro de pensamentos",
      "Questionamento socrático",
      "Hipnose regressiva",
      "Reestruturação cognitiva"
    ],
    correct: 2,
    explanation: "Hipnose regressiva não é uma técnica da TCC. As técnicas principais incluem registro de pensamentos, questionamento socrático e reestruturação cognitiva."
  },
  {
    question: "O que são pensamentos automáticos?",
    options: [
      "Pensamentos planejados conscientemente",
      "Pensamentos que surgem espontaneamente",
      "Memórias de infância",
      "Sonhos recorrentes"
    ],
    correct: 1,
    explanation: "Pensamentos automáticos são aqueles que surgem espontaneamente em resposta a situações, como 'Eu sempre estrago tudo'."
  },
  {
    question: "Qual é a ordem correta da formação das crenças?",
    options: [
      "Pensamentos → Emoções → Crenças",
      "Experiências → Crenças Centrais → Pensamentos Automáticos",
      "Emoções → Comportamentos → Crenças",
      "Crenças → Experiências → Pensamentos"
    ],
    correct: 1,
    explanation: "As experiências iniciais formam crenças centrais, que levam a crenças intermediárias e depois a pensamentos automáticos."
  },
  {
    question: "A TCC é eficaz para tratar qual(is) condição(ões)?",
    options: [
      "Apenas depressão",
      "Apenas ansiedade",
      "Depressão, ansiedade, TOC, TEPT e muito mais",
      "Apenas transtornos de personalidade"
    ],
    correct: 2,
    explanation: "A TCC tem aplicação ampla e é eficaz para depressão, ansiedade, TOC, TEPT, fobias, transtornos alimentares e muito mais."
  },
  {
    question: "Qual pergunta faz parte do questionamento socrático na TCC?",
    options: [
      "Quem é o culpado?",
      "Quais evidências apoiam este pensamento?",
      "Como posso culpar os outros?",
      "Por que isso sempre acontece comigo?"
    ],
    correct: 1,
    explanation: "O questionamento socrático inclui perguntas como 'Quais evidências apoiam este pensamento?' para examinar a validade das crenças."
  },
  {
    question: "O que diferencia crenças intermediárias de crenças centrais?",
    options: [
      "Crenças intermediárias são mais profundas",
      "Crenças intermediárias são regras e suposições",
      "Crenças intermediárias são mais fáceis de identificar",
      "Não há diferença entre elas"
    ],
    correct: 1,
    explanation: "Crenças intermediárias são regras, atitudes e suposições (como 'Se eu falhar, serei rejeitado'), enquanto crenças centrais são mais absolutas."
  }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const questionEl = document.getElementById('quiz-question');
const optionsEl = document.getElementById('quiz-options');
const feedbackEl = document.getElementById('quiz-feedback');
const nextBtn = document.getElementById('quiz-next');
const progressBar = document.getElementById('quiz-progress-bar');
const scoreEl = document.getElementById('quiz-score');
const quizContainer = document.getElementById('quiz-container');
const quizResults = document.getElementById('quiz-results');
const finalScoreEl = document.getElementById('final-score');
const performanceMessageEl = document.getElementById('performance-message');
const restartBtn = document.getElementById('quiz-restart');

function loadQuestion() {
  const question = quizQuestions[currentQuestion];
  questionEl.textContent = `${currentQuestion + 1}. ${question.question}`;

  optionsEl.innerHTML = '';
  question.options.forEach((option, index) => {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'quiz-option';
    optionDiv.textContent = option;
    optionDiv.addEventListener('click', () => selectAnswer(index));
    optionsEl.appendChild(optionDiv);
  });

  feedbackEl.className = 'quiz-feedback';
  feedbackEl.textContent = '';
  nextBtn.style.display = 'none';
  selectedAnswer = null;

  updateProgress();
  updateScore();
}

function selectAnswer(index) {
  if (selectedAnswer !== null) return;

  selectedAnswer = index;
  const question = quizQuestions[currentQuestion];
  const options = optionsEl.querySelectorAll('.quiz-option');

  options.forEach((option, i) => {
    option.classList.add('disabled');
    if (i === question.correct) {
      option.classList.add('correct');
    } else if (i === selectedAnswer) {
      option.classList.add('incorrect');
    }
  });

  if (selectedAnswer === question.correct) {
    score++;
    feedbackEl.textContent = `Correto! ${question.explanation}`;
    feedbackEl.className = 'quiz-feedback correct show';
  } else {
    feedbackEl.textContent = `Incorreto. ${question.explanation}`;
    feedbackEl.className = 'quiz-feedback incorrect show';
  }

  updateScore();
  nextBtn.style.display = 'block';
}

function updateProgress() {
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function updateScore() {
  scoreEl.textContent = `Pontuação: ${score} / ${quizQuestions.length}`;
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < quizQuestions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizContainer.style.display = 'none';
  quizResults.style.display = 'block';

  const percentage = (score / quizQuestions.length) * 100;
  finalScoreEl.textContent = `${score} / ${quizQuestions.length}`;

  let message = '';
  if (percentage === 100) {
    message = 'Perfeito! Você domina completamente os conceitos de TCC e identificação de crenças!';
  } else if (percentage >= 80) {
    message = 'Excelente! Você tem um ótimo conhecimento sobre TCC e modificação de crenças!';
  } else if (percentage >= 60) {
    message = 'Muito bem! Você compreende os conceitos básicos, mas ainda há espaço para aprofundamento.';
  } else if (percentage >= 40) {
    message = 'Bom começo! Revise o conteúdo para fortalecer seu conhecimento sobre TCC.';
  } else {
    message = 'Continue estudando! Releia as seções sobre TCC e identificação de crenças para melhorar sua compreensão.';
  }

  performanceMessageEl.textContent = message;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedAnswer = null;
  quizContainer.style.display = 'block';
  quizResults.style.display = 'none';
  loadQuestion();
}

nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

document.addEventListener('DOMContentLoaded', () => {
  loadQuestion();

  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
});
