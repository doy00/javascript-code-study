// 문제 링크: [점프 게임](https://www.acmicpc.net/problem/15558)

// 실행: node jincheol/week32/personal-BFS2.js

/**
 *
 * @param {number} N 칸의 개수
 * @param {number} K 점프 거리
 * @param {string} line1 첫 번째 줄
 * @param {string} line2 두 번째 줄
 */
const solution = (N, K, line1, line2) => {
  const lines = [line1, line2];
  const visited = Array.from({ length: 2 }, () => Array(N).fill(false)); // 방문 기록 배열

  const queue = [[0, 0, 0]]; // bfs 큐 [현재 인덱스, 현재 줄, 시간]
  visited[0][0] = true; // 시작 위치 방문 처리

  let head = 0;
  while (queue.length > head) {
    const [curIdx, curLine, time] = queue[head++]; // 큐에서 원소 추출
    // 다음 이동들
    const nextMove = [
      { nextIdx: curIdx + 1, nextLine: curLine }, // 앞으로 한 칸
      { nextIdx: curIdx - 1, nextLine: curLine }, // 뒤로 한 칸
      { nextIdx: curIdx + K, nextLine: curLine ^ 1 }, // 반대편으로 점프
    ];
    // 다음 이동 순회
    for (const { nextIdx, nextLine } of nextMove) {
      // 성공 조건 확인
      if (nextIdx >= N) return 1;

      // 사라진 칸 확인
      if (nextIdx <= time) continue;
      // 안전한 칸인지 확인
      if (lines[nextLine][nextIdx] === '0') continue;
      // 방문한 적 있는지 확인
      if (visited[nextLine][nextIdx]) continue;

      visited[nextLine][nextIdx] = true; // 방문 처리
      queue.push([nextIdx, nextLine, time + 1]); // 큐에 다음 원소 추가
    }
  }

  return 0;
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const line1 = input[1].trim();
const line2 = input[2].trim();
console.log(solution(N, K, line1, line2));
