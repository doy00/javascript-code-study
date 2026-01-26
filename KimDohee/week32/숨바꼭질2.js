/*
week32 - BFS2 - 숨바꼭질 2 (https://www.acmicpc.net/problem/12851)
*/


function solution(input) {
  const [N, K] = input.trim().split(' ').map(Number);
  const MAX = 100000;

  // 이미 같은 위치에 있는 경우 이동x, 한가지 방법
  if (N === K) {
    return '0\n1';
  }

  const visited = new Array(MAX+1).fill(false);
  const distance = new Array(MAX+1).fill(0);  // 최단거리
  const count = new Array(MAX+1).fill(0);  // 해당 위치에 최단거리로 도달하는 경로의 수

  // BFS
  const queue = [[N, 0]];  // [현재위치, 현재까지 걸린 시간]
  let front = 0; // 인덱스 - 큐의 앞부분
  visited[N] = true;  // 시작 위치 방문처리
  count[N] = 1;   // 시작 위치 도달방법은 한가지

  while (front < queue.length) {
    const [current, time] = queue[front++];

    // 목표 지점에 도달한 경우
    if (current === K) {
      return `${time}\n${count[K]}`;
    }

    // 현재 위치에서 갈수있는 다음 위치들
    // X-1, X+1, 2*X(순간이동)
    const nextPositions = [current -1, current+1, current*2];

    // 다음 위치 탐색
    for (const next of nextPositions) {
      // 0 이상 MAX 이하
      // 2 * X 범위를 벗어나지 않게 주의, X-1은 음수가 되지않게 주의
      if (next < 0 || next > MAX) continue;

      if (!visited[next]) {
        visited[next] = true;

        distance[next] = time + 1;  // 이 위치까지 거리는 현재시간 + 1
        count[next] = count[current];  //

        queue.push([next, time + 1]);  // 다음 탐색을 위해 큐에 추가
        
      } else if (distance[next] === time+1) {
        // 이미 방문했지만 같은 거리로 다시 도달한 경우?
        // 5 → 4 → 8 (2초)
        // 5 → 10 → 9 → 8 (3초가 아니라)
        // 5 → 6 → 7 → 8 (3초)
        // 여기서 8에 2초 만에 도달하는 또 다른 경로가 있다면
        // 경로 개수를 누적해야 함

        count[next] += count[current];
        // 이미 이 위치에서 다음 탐색이 진행중이므로 큐에는 추가하지 않음
      }
    }
  }
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));