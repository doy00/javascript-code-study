// 문제 링크: [작업](https://www.acmicpc.net/problem/2056)

// 실행: node jincheol/week30/personal-graph.js

/**
 *
 * @param {number} N 작업의 수
 * @param {number[][]} works 작업의 시간과 선행 작업들의 배열
 */
const solution = (N, works) => {
  const graph = Array.from({ length: N + 1 }, () => new Array()); // 작업의 선행 작업들 관계
  const prevWorkCount = new Array(N + 1).fill(0); // 선행 작업의 개수
  const times = new Array(N + 1).fill(0); // 작업의 소요 시간

  for (let i = 0; i < N; i++) {
    const [time, prevCount, ...work] = works[i];

    times[i + 1] = time; // 작업의 시간 저장
    // 선행 작업이 있으면
    if (prevCount > 0) {
      // 선행 작업들 순회
      for (let prev of work) {
        graph[prev].push(i + 1); // 선행 작업부터 현재 작업 연결
        prevWorkCount[i + 1]++; // 현재 작업의 선행 작업 개수 증가
      }
    }
  }

  const dp = new Array(N + 1).fill(0); // i작업을 완료할 수 있는 시간을 저장할 테이블
  const queue = [];
  for (let i = 1; i <= N; i++) {
    // 선행 작업이 없으면
    if (prevWorkCount[i] === 0) {
      queue.push(i); // 큐에 추가
      dp[i] = times[i]; // dp에 i 작업의 완료 시간은 본인 시간
    }
  }

  let head = 0; // 포인터
  while (head < queue.length) {
    const curWork = queue[head++];
    // 현재 작업이 선행 작업인 작업들을 순회
    for (let next of graph[curWork]) {
      const afterTime = dp[curWork] + times[next]; // 현재 작업과 다음 작업을 한 시간
      dp[next] = Math.max(dp[next], afterTime); // 다음 작업의 시간 갱신

      prevWorkCount[next]--; // 선행 작업을 했으니 후 작업의 선행 작업 수 감소
      // 다음 작업의 선행 작업이 없으면 큐에 추가
      if (prevWorkCount[next] === 0) queue.push(next);
    }
  }

  // 45째 줄에서도 그렇고 Math.max를 사용하는 이유는 작업들은 병렬로 동시에 수행이 가능하기 때문임
  // 병렬이기 때문에 가장 오래 걸리는 시간이 결국 모든 작업을 완료하는 시간이다
  return Math.max(...dp);
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const N = parseInt(input[0]);
const works = input.slice(1).map((v) => v.trim().split(' ').map(Number));
console.log(solution(N, works));
