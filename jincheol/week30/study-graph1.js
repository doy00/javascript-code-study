// 문제 링크: [줄 세우기](https://www.acmicpc.net/problem/2252)

// 실행: node jincheol/week30/study-graph1.js

/**
 *
 * @param {number} N 학생 수
 * @param {number} M 키를 비교한 횟수
 * @param {number[][]} students 키를 비교한 학생의 번호
 */
const solution = (N, M, students) => {
  const graph = Array.from({ length: N + 1 }, () => new Array()); // 그래프
  const frontPeopleCount = new Array(N + 1).fill(0); // i의 학생보다 앞에 있는 학생 수

  for (const [a, b] of students) {
    graph[a].push(b); // 그래프에 관계 추가
    frontPeopleCount[b]++; // b보다 앞에 있는 사람 수 증가
  }

  // 앞에 있는 학생 수가 0명인 학생과 연결된 학생들을 탐색하며 정렬을 위한 큐
  const queue = [];
  // 앞에 있는 학생 수가 0명인 학생부터 큐에 추가
  for (let i = 1; i <= N; i++) {
    if (frontPeopleCount[i] === 0) queue.push(i);
  }

  const result = []; // 정렬된 학생들

  let head = 0; // 포인터
  while (head < queue.length) {
    const student = queue[head++]; // 큐에서 학생 추출 + 포인터 증가
    result.push(student); // 앞에 있는 학생이 0명이면 결과에 추가

    // 0명인 학생 뒤에 있는 학생들
    for (let nextStudent of graph[student]) {
      frontPeopleCount[nextStudent]--; // 현재 학생을 줄 세웠으니 앞에 있는 학생 수 감소
      // 감소된 학생 수가 0명이면 큐에 추가
      if (frontPeopleCount[nextStudent] === 0) {
        queue.push(nextStudent);
      }
    }
  }

  return result.join(' '); // 결과 출력
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input1.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const students = input.slice(1).map((v) => v.trim().split(' ').map(Number));
console.log(solution(N, M, students));
