/*
week30 - 그래프2 - 경로 찾기 (https://www.acmicpc.net/problem/11403)
문제
가중치 없는 방향 그래프 G가 주어졌을 때, 모든 정점 (i, j)에 대해서, i에서 j로 가는 길이가 양수인 경로가 있는지 없는지 구하는 프로그램을 작성하시오.

입력
첫째 줄에 정점의 개수 N (1 ≤ N ≤ 100)이 주어진다. 둘째 줄부터 N개 줄에는 그래프의 인접 행렬이 주어진다. i번째 줄의 j번째 숫자가 1인 경우에는 i에서 j로 가는 간선이 존재한다는 뜻이고, 0인 경우는 없다는 뜻이다. i번째 줄의 i번째 숫자는 항상 0이다.

출력
총 N개의 줄에 걸쳐서 문제의 정답을 인접행렬 형식으로 출력한다. 정점 i에서 j로 가는 길이가 양수인 경로가 있으면 i번째 줄의 j번째 숫자를 1로, 없으면 0으로 출력해야 한다.
*/

function solution(input) {
  const lines= input.trim().split('\n');
  const n = parseInt(lines[0]);  // 정점의 개수 n

  // 인접 행렬 생성 
  const graph = [];
  for (let i = 1; i <= n; i++) {
    graph.push(lines[i].split(' ').map(Number));
  }

  // 플로이드-워셜 구현
  // k: 거쳐가는 정점
  for (let k = 0; k < n; k++) {
    // i: 시작 정점
    for (let i = 0; i < n; i++) {
      // j: 도착 정점
      for (let j = 0; j < n; j++) {
        // i -> k 가능하고 k -> j 가능하면
        if (graph[i][k] === 1 && graph[k][j] === 1) {
          // i -> j 도 가능
          graph[i][j] = 1;
        }
      }
    }
  }

  let result = '';
  for (let i = 0; i < n; i++) {
    result += graph[i].join(' ') + '\n';
  }
  return result.trim();
}


// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));