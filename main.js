let computerNum = 0;
let playButton = document.getElementById('play-button');
let userInput = document.getElementById('user-input');
let resultArea = document.getElementById('result-area');
let resetButton = document.getElementById('reset-button');
let chances = 5; //5번의 기회 (1번 클릭할 때마다 줄어듦)
let gameOver = false; //종료를 위한 변수 : 초기값 false
let chanceArea = document.getElementById('chance-area');
//유저가 어떤 숫자를 입력해 왔는지 history를 알아야 함
let history = []; //값이 여러 개 들어갈 것이기 때문에 배열로 만듦

playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);
userInput.addEventListener('focus', function () {
  userInput.value = '';
}); //익명의 함수. 잠깐 쓰다 끝날 함수라서 안에다 정의

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 50) + 1;
  console.log('정답', computerNum);
}

function play() {
  let userValue = userInput.value;

  //chances--; 하기 전 값의 유효성 검사를 해야 함
  if (userValue < 1 || userValue > 50) {
    resultArea.textContent = '1과 50 사이 숫자를 입력해 주세요';
    //여기서 종료해야 됨!!! 안 그럼 chances가 깎이고 비교를 하기 시작
    return; //어떠한 값도 return 하지 않는다
  }

  //히스토리 배열을 위해 데이터 유효성 검사 한 번 더 함
  //배열에 userValue 값이 포함되어 있다면
  if (history.includes(userValue)) {
    resultArea.textContent = '이미 입력한 숫자입니다.';
    return;
  }

  chances--; //play 할 때마다 기회가 줄어듦
  chanceArea.textContent = `남은 기회: ${chances}번`;
  console.log('chance', chances);

  if (userValue < computerNum) {
    resultArea.textContent = '[조금만 더 높여 봐!!!]';
  } else if (userValue > computerNum) {
    resultArea.textContent = `[${userValue}보단 작아!!!]`;
  } else {
    resultArea.textContent = '짱구가 탈출에 성공했어요!!';
    gameOver = true;
  }

  //입력한 값 히스토리 배열에 저장
  history.push(userValue);
  console.log(history);

  //chances가 1보다 작을 때 게임 종료
  if (chances < 1) {
    chanceArea.textContent = '[흰둥이를 잘 부탁해...]';
    resultArea.textContent = '짱구가 탈출에 실패했어요!!';
    gameOver = true;
  }

  if (gameOver == true) {
    //chances가 1보다 작아져 gameOver 값이 true라면
    //playButton 비활성화
    playButton.disabled = true;
  }
}

//reset 함수에서 안 되는 것 (go 버튼 재활성화/찬스 초기화)
// >> chances 값 다시 초기화 / gameOver 값 false로 바꾸기
// >> chanceArea 텍스트 콘텐트 내용 바꾸기, plaButton 비활성화 false
// >> 사용자가 입력한 값 저장한 history 배열 비우기
function reset() {
  // user input창이 깨끗하게 정리되고
  userInput.value = ''; //empty
  // 새로운 번호가 생성됨
  pickRandomNum();
  gameOver = false;
  chances = 5;
  chanceArea.textContent = `남은 기회: ${chances}번`;
  playButton.disabled = false;
  history = [];
  resultArea.textContent = '짱구는 몇 번 감옥에 있을까요?';
}
pickRandomNum();
