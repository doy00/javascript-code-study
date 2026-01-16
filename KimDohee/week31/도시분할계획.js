/*
week31 - 그래프2, 트리 - 도시 분할 계획(https://www.acmicpc.net/problem/1647)

마을은 N개의 집과 그 집들을 연결하는 M개의 길로 이루어져 있다. 길은 어느 방향으로든지 다닐 수 있는 편리한 길이다. 그리고 각 길마다 길을 유지하는데 드는 유지비가 있다. 임의의 두 집 사이에 경로가 항상 존재한다.
일단 분리된 두 마을 사이에 있는 길들은 필요가 없으므로 없앨 수 있다. 그리고 각 분리된 마을 안에서도 임의의 두 집 사이에 경로가 항상 존재하게 하면서 길을 더 없앨 수 있다. 마을의 이장은 위 조건을 만족하도록 길들을 모두 없애고 나머지 길의 유지비의 합을 최소로 하고 싶다. 이것을 구하는 프로그램을 작성하시오.

*/
function solution(input) {
  const lines = input.trim().split('\n');
  const [n, m] = lines[0].split(' ').map(Number);

  // 간선 저장 [비용, 집A, 집B]
  const edges = [];
  for (let i = 1; i <= m; i++) {
    const [a, b, c] = lines[i].split(' ').map(Number);
    edges.push([c, a, b]);
  }

  // 비용 기준 오름차순 정렬
  edges.sort((a, b) => a[0] - b[0]);

  // Union-Find
  const parent = Array.from({ length: n + 1}, (_, i) => i);

  // 부모 노드 찾는 함수
  function find(x) {
    if (parent[x] !== x) {
        parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  // 두 부모 노드를 합치는 함수
  function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);
    
    if (rootX !== rootY) {
      parent[rootY] = rootX;
        return true;
    }
    return false;
  }

  // 크루스칼 알고리즘으로 MST 구성
  const selected = [];
  for (const [cost, a, b] of edges) {
    if (union(a, b)) {
      selected.push(cost);
      if (selected.length === n - 1) break;
    }
  }

  // 가장 큰 간선 제거하고 나머지 유지비 합 반환
  selected.pop();
  return selected.reduce((sum, cost) => sum + cost, 0);
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));