// 문제 링크: [큰 수 만들기](https://school.programmers.co.kr/learn/courses/30/lessons/42883?language=javascript)

// 어떤 숫자에서 k개의 수를 제거했을 때 얻을 수 있는 가장 큰 숫자를 구하려 합니다.
// 예를 들어, 숫자 1924에서 수 두 개를 제거하면 [19, 12, 14, 92, 94, 24] 를 만들 수 있습니다.
// 이 중 가장 큰 숫자는 94 입니다.
// 문자열 형식으로 숫자 number와 제거할 수의 개수 k가 solution 함수의 매개변수로 주어집니다.
// number에서 k 개의 수를 제거했을 때 만들 수 있는 수 중 가장 큰 숫자를 문자열 형태로 return 하도록 solution 함수를 완성하세요.
// 제한 조건
// number는 2자리 이상, 1,000,000자리 이하인 숫자입니다.
// k는 1 이상 number의 자릿수 미만인 자연수입니다.

// 실행: node jincheol/week4/study-greedy1.js

function solution(number, k) {
  let answer = '';
  const numbers = [];
  let deleteCount = k;

  for (let num of number) {
    while (numbers.length && deleteCount && numbers.at(-1) < num) {
      numbers.pop();
      deleteCount--;
    }

    numbers.push(num);
  }

  while (deleteCount) {
    numbers.pop();
    deleteCount--;
  }

  answer = numbers.join('');

  return answer;
}

const ex_number_one = '1924';
const ex_number_two = '1231234';
const ex_number_three = '4177252841';

const ex_k_one = 2;
const ex_k_two = 3;
const ex_k_three = 4;

const ex_sol_one = solution(ex_number_one, ex_k_one);
const ex_sol_two = solution(ex_number_two, ex_k_two);
const ex_sol_three = solution(ex_number_three, ex_k_three);
// 입출력 예시 결과값: '94', '3234', '775841'
console.log(ex_sol_one, ex_sol_two, ex_sol_three);
