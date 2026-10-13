// 상태 변수
let selectedTotal = 10;
let currentQuestionIndex = 0;
let correctCount = 0;
let num1 = 0;
let num2 = 0;
let currentInput = "";
let isWaiting = false;

// DOM 요소 참조
const setupScreen = document.getElementById("setup-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionEl = document.getElementById("quiz-question");
const displayEl = document.getElementById("user-display");
const feedbackEl = document.getElementById("feedback-msg");
const progressBar = document.getElementById("progress-bar");
const currentIndexTxt = document.getElementById("current-index-txt");
const totalLimitTxt = document.getElementById("total-limit-txt");
const correctCountTxt = document.getElementById("correct-count-txt");

const resultTotal = document.getElementById("result-total");
const resultCorrect = document.getElementById("result-correct");
const resultComment = document.getElementById("result-comment");

// 1. 문제 수 선택
function selectTotal(count) {
  selectedTotal = count;
  const buttons = document.querySelectorAll(".count-btn");
  buttons.forEach((btn) => {
    if (parseInt(btn.textContent, 10) === count) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// 2. 게임 시작
function startGame() {
  currentQuestionIndex = 0;
  correctCount = 0;
  totalLimitTxt.textContent = selectedTotal;
  correctCountTxt.textContent = "0";

  setupScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  makeNewQuiz();
}

// 3. 문제 출제
function makeNewQuiz() {
  currentQuestionIndex++;
  currentIndexTxt.textContent = currentQuestionIndex;

  // 진행도 반영
  const progressPercent = ((currentQuestionIndex - 1) / selectedTotal) * 100;
  progressBar.style.width = `${progressPercent}%`;

  // 2단 ~ 9단 랜덤
  num1 = Math.floor(Math.random() * 8) + 2;
  num2 = Math.floor(Math.random() * 9) + 1;

  questionEl.textContent = `${num1} × ${num2} =`;
  currentInput = "";
  displayEl.textContent = "";
  feedbackEl.textContent = "";
  feedbackEl.className = "message-area";
  isWaiting = false;
}

// 4. 숫자 입력 처리
function pressNum(digit) {
  if (isWaiting) return;
  if (currentInput.length < 3) {
    currentInput += digit;
    displayEl.textContent = currentInput;
  }
}

// 5. 입력 지우기
function clearInput() {
  if (isWaiting) return;
  currentInput = "";
  displayEl.textContent = "";
}

// 6. 정답 확인
function checkAnswer() {
  if (isWaiting || currentInput === "") return;

  const rightAnswer = num1 * num2;
  const userAnswer = parseInt(currentInput, 10);
  isWaiting = true;

  if (userAnswer === rightAnswer) {
    correctCount++;
    correctCountTxt.textContent = correctCount;
    feedbackEl.textContent = "🎉 딩동댕! 멋져요, 정답이에요!";
    feedbackEl.className = "message-area msg-correct";
    
    setTimeout(proceedNext, 1100);
  } else {
    feedbackEl.textContent = `🌰 아쉬워요! 정답은 [ ${rightAnswer} ] 이에요!`;
    feedbackEl.className = "message-area msg-wrong";
    
    setTimeout(proceedNext, 2100);
  }
}

// 7. 다음 단계로 진행 (다음 문제 or 결과 화면)
function proceedNext() {
  if (currentQuestionIndex < selectedTotal) {
    makeNewQuiz();
  } else {
    progressBar.style.width = "100%";
    showResult();
  }
}

// 8. 최종 결과 화면 표시
function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  resultTotal.textContent = selectedTotal;
  resultCorrect.textContent = correctCount;

  if (correctCount === selectedTotal) {
    resultComment.textContent = "🏆 단풍잎처럼 완벽해요! 구구단 박사님이시네요!";
  } else if (correctCount >= selectedTotal * 0.7) {
    resultComment.textContent = "🍂 참 잘했어요! 조금만 더 하면 완벽해질 거예요!";
  } else {
    resultComment.textContent = "🌰 차근차근 다시 풀어보면 더 잘할 수 있어요! 파이팅!";
  }
}

// 9. 처음 화면으로 리셋
function resetApp() {
  resultScreen.classList.add("hidden");
  setupScreen.classList.remove("hidden");
}
