/*
week31 - 그래프2, 트리 - 특정한 최단 경로 (https://www.acmicpc.net/problem/1504)
*/

function solution(input) {
  const lines = input.trim().split('\n');
  const [n, e] = lines[0].split(' ').map(Number);  // n: 정점의 개수, e: 간선의 개수

  // 그래프 초기화
  const graph = Array.from({length: n + 1}, () => []);

  // 간선 정보 입력
  for (let i = 1; i <= e; i++) {
    const [a, b, c] = lines[i].split(' ').map(Number);  // a번 정점에서 b번 정점까지 c 거리만큼 연결
    graph[a].push([b, c]);  // [도착 정점, 거리]
    graph[b].push([a, c]);  // 양방향 처리
  }
  const [v1, v2] = lines[e + 1].split(' ').map(Number);
  
  // 다익스트라 함수
  function dijkstra(start) {
    const dist = Array(n + 1).fill(Infinity);
    const pq = [[0, start]];  // [거리, 정점]
    dist[start] = 0;

    while (pq.length > 0) {
      pq.sort((a, b) => a[0] - b[0]);
      const [currentDist, current] = pq.shift();

      if (currentDist > dist[current]) continue;

      for (const [next, cost] of graph[current]) {
        const newDist = currentDist + cost;
        if (newDist < dist[next]) {
          dist[next] = newDist;
          pq.push([newDist, next]);
        }
      }
    }

    return dist;
  }

  // 필요한 최단 거리들
  const distFrom1 = dijkstra(1);
  const distFromV1 = dijkstra(v1);
  const distFromV2 = dijkstra(v2);

  // 두 경로 중 최솟값 계산
  const path1 = distFrom1[v1] + distFromV1[v2] + distFromV2[n];  // 1 - v1 - v2 - n
  const path2 = distFrom1[v2] + distFromV2[v1] + distFromV1[n];

  const result = Math.min(path1, path2);
  return result >= Infinity ? -1 : result;
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input1.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));