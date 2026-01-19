// 문제 링크: [숨바꼭질 2](https://www.acmicpc.net/problem/12851)

// 실행: node jincheol/week32/study-BFS2-2.js

/**
 *
 * @param {number} N 수빈이의 위치
 * @param {number} K 동생의 위치
 */
const solution = (N, K) => {
  if (N === K) return [0, 1].join('\n'); // 이미 같은 위치에 있는 경우

  const MAX = 100_000; // 최대 위치
  const dp = Array.from({ length: MAX + 1 }, () => 0); // 최단 시간 기록 배열 (i번째 점에 도달하는 최단 시간)

  let ways = 0; // 최단 시간으로 도달하는 방법의 수
  let time = Infinity; // 최단 시간

  const queue = [[N, 0]]; // BFS 큐
  dp[N] = 0; // 시작 위치 방문 처리

  let head = 0; // 큐의 헤드 인덱스
  while (queue.length > head) {
    const [cur, t] = queue[head++]; // 현재 위치와 시간 추출
    if (t > time) break; // 현재 시간이 최단 시간보다 크면 종료

    // 동생 위치에 도달한 경우
    if (cur === K) {
      // 처음 도달한 경우
      if (time === Infinity) {
        ways = 1; // 동생 위치에 도달한 경우 방법 수 증가
        time = t; // 최단 시간 설정
      } else if (time === t) ways++; // 최단 시간과 같은 경우 방법 수 증가
      continue;
    }

    const nextPositions = [cur - 1, cur + 1, cur * 2]; // 다음 이동 경로들
    for (const next of nextPositions) {
      if (next < 0 || next > MAX) continue; // 범위 벗어나는 경우 무시

      // 방문하지 않았거나 같은 시간에 도달한 경우
      const isNotVisited = dp[next] === 0;
      // 이미 방문했어도 같은 시간에 도달하는 경우
      // dp[next]가 0이 아니고, 현재 시간 + 1과 같다면 최단 시간에 도달한 것임
      const isSameTime = dp[next] === t + 1;
      if (isNotVisited || isSameTime) {
        dp[next] = t + 1; // 방문 시간 기록
        queue.push([next, t + 1]); // 큐에 다음 위치와 시간 추가
      }
    }
  }

  return [time, ways].join('\n');
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
console.log(solution(N, K));
