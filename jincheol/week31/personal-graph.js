// 문제 링크: [도시 분할 계획](https://www.acmicpc.net/problem/1647)

// 실행: node jincheol/week31/personal-graph.js

/**
 * 크루스칼 알고리즘을 사용하여 최소 신장 트리를 구한 뒤,
 * union-find로 사이클을 방지하며 간선을 추가하고,
 * 가장 비용이 큰 간선을 제거하여 두 개의 마을로 분할
 * @param {number} N 집의 개수
 * @param {number} M 길의 개수
 * @param {number[][]} lines 길의 정보 [a, b, c][] (a집과 b집의 거리c)
 */
const solution = (N, M, lines) => {
  lines.sort((a, b) => a[2] - b[2]); // 비용 기준 오름차순 정렬

  // union-find 초기화
  const parent = Array.from({ length: N + 1 }, (_, i) => i); // 초기엔 자신이 부모

  /**
   * 경로 압축을 사용하여 x의 최상위 부모 노드를 찾는 함수
   * @param {number[]} parent 부모 노드 배열
   * @param {number} x 찾고자 하는 노드
   * @returns {number} x의 최상위 부모 노드
   */
  const find = (parent, x) => {
    if (parent[x] === x) return x; // 자신이 최상위 부모 노드인 경우 반환
    return (parent[x] = find(parent, parent[x])); // 경로 압축
  };

  /**
   * 두 노드를 합치는 함수
   * @param {number[]} parent 부모 노드 배열
   * @param {number} a 첫 번째 노드
   * @param {number} b 두 번째 노드
   * @returns {boolean} 합치기 성공 여부
   */
  const union = (parent, a, b) => {
    const rootA = find(parent, a); // a의 최상위 부모 노드
    const rootB = find(parent, b); // b의 최상위 부모 노드

    // 두 노드의 최상위 부모 노드가 다르면 합치기
    if (rootA !== rootB) {
      parent[rootA] = rootB; // rootA를 rootB의 자식으로 설정
      return true; // 합치기 성공
    }
    return false; // 합치기 실패 (이미 같은 집합)
  };

  let totalCost = 0; // 총 비용
  let maxlineCost = 0; // 최대 간선 비용
  let lineCount = 0; // 연결된 간선의 개수

  for (const [a, b, cost] of lines) {
    // 두 노드를 합치는데 성공했다면 (사이클이 발생하지 않았다면)
    if (union(parent, a, b)) {
      totalCost += cost; // 총 비용에 추가
      maxlineCost = cost; // 최대 간선 비용 갱신 (정렬되어 있으므로 마지막에 추가된 비용이 최대)
      lineCount++; // 연결된 간선의 개수 증가

      // N개의 집이 모두 연결되었으면 종료
      if (lineCount === N - 1) break;
    }
  }

  return totalCost - maxlineCost; // 가장 비용이 큰 간선을 제거한 값 반환
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const lines = input.slice(1).map((v) => v.trim().split(' ').map(Number));
console.log(solution(N, M, lines));
