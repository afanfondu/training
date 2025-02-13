interface Question {
  question: string;
  choices: string[];
  correctAnswer: string;
}

class Quiz {
  private questions: Question[] = [];
  currentQuestion: number = 0;
  container = document.querySelector("#app")!;
  score: number = 0;

  // for preventing memory leaks after removing event listeners
  private boundChoiceHandler: (e: Event) => void;
  private boundNextHandler: (e: Event) => void;
  private boundTryAgainHandler: (e: Event) => void;

  constructor(questions: Question[]) {
    this.questions = questions;
    this.container.innerHTML = this.generateMarkup();

    this.boundChoiceHandler = this.choiceClickHandler.bind(this);
    this.boundNextHandler = this.nextClickHandler.bind(this);
    this.boundTryAgainHandler = this.tryAgainClickHandler.bind(this);

    this.attachEventListeners();
  }

  private generateMarkup() {
    const question = this.questions[this.currentQuestion];

    return `
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-md-8">
            ${this.generateQuestionMarkup(question)}
          </div>
        </div>
      </div>
    `;
  }

  private generateQuestionMarkup({ question, choices }: Question): string {
    return `
      <div class="card" id="quizSection">
        <div class="card-body p-4">
          <h3 class="card-title mb-4">${question}</h3>

          <div class="d-grid gap-3">
            ${choices.map((choice) => `<button class="btn btn-outline-light choice">${choice}</button>`).join("")}
          </div>

          <div class="mt-4">
            <button class="btn btn-primary w-100 d-none next-btn">
              Next Question
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private generateResultMarkup() {
    return `
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card score-section" id="scoreSection">
              <div class="card-body text-center p-5">
                <h2 class="mb-4">Quiz Complete! 🎉</h2>
                <div class="display-4 mb-4">
                  Score: <span id="finalScore">${this.score}</span>/${this.questions.length}
                </div>
                <button class="btn btn-outline-light btn-lg px-5 try-again">
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const quizSection = this.container.querySelector("#quizSection")!;

    quizSection.removeEventListener("click", this.boundChoiceHandler);
    quizSection.removeEventListener("click", this.boundNextHandler);

    quizSection.addEventListener("click", this.boundChoiceHandler);
    quizSection.addEventListener("click", this.boundNextHandler);
  }

  disableChoices() {
    const quizSection = this.container.querySelector("#quizSection")!;

    quizSection.querySelectorAll(".choice").forEach((choice) => {
      choice.setAttribute("disabled", "true");
    });
    quizSection.querySelector(".next-btn")?.classList.remove("d-none");
  }

  choiceClickHandler(e: Event) {
    const choiceButton = e.target as HTMLButtonElement;
    if (!choiceButton.classList.contains("choice")) return;

    const question = this.questions[this.currentQuestion];

    if (question.correctAnswer === choiceButton.textContent) {
      choiceButton.classList.remove("btn-outline-light");
      choiceButton.classList.add("btn-success");
      this.score += 1;
    } else {
      choiceButton.classList.remove("btn-outline-light");
      choiceButton.classList.add("btn-danger");
    }

    this.disableChoices();
  }

  nextClickHandler(e: Event) {
    const nextButton = e.target as HTMLButtonElement;
    if (!nextButton.classList.contains("next-btn")) return;

    if (this.currentQuestion === this.questions.length - 1) {
      this.container.innerHTML = this.generateResultMarkup();
      this.attachTryAgainEvent();
      return;
    }

    this.currentQuestion += 1;
    this.container.innerHTML = this.generateMarkup();
    this.attachEventListeners();
  }

  attachTryAgainEvent() {
    const tryAgainButton = this.container.querySelector("button.try-again")!;

    tryAgainButton.removeEventListener("click", this.boundTryAgainHandler);
    tryAgainButton.addEventListener("click", this.boundTryAgainHandler);
  }

  tryAgainClickHandler() {
    this.currentQuestion = 0;
    this.score = 0;
    this.container.innerHTML = this.generateMarkup();
    this.attachEventListeners();
  }
}

const init = () => {
  const questions: Question[] = [
    {
      question: "What is the basic type for numbers in TypeScript?",
      choices: ["int", "float", "number", "Number"],
      correctAnswer: "number",
    },
    {
      question: "Which symbol is used to specify the type in TypeScript?",
      choices: ["=>", ":", ";", "="],
      correctAnswer: ":",
    },
    {
      question: "What is the type of `let name = 'John'` in TypeScript?",
      choices: ["any", "string", "object", "undefined"],
      correctAnswer: "string",
    },
    {
      question:
        "Which one is the correct way to declare a boolean in TypeScript?",
      choices: [
        "let isDone: bool = true",
        "let isDone: boolean = true",
        "let isDone: Boolean = true",
        "let isDone = Boolean(true)",
      ],
      correctAnswer: "let isDone: boolean = true",
    },
    {
      question: "What is the type for array of strings in TypeScript?",
      choices: ["String[]", "Array", "string[]", "strings[]"],
      correctAnswer: "string[]",
    },
  ];

  new Quiz(questions);
};

init();
