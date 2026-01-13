/*
week31 - 그래프2, 트리 - LCA 
*/

function solution(input) {
  const lines = input.trim().split('\n');
  const n = parseInt(lines[0]);  // 노드의 개수

  // 인접 리스트에 트리 저장 (양방향간선)
  const graph = Array.from({length: n + 1}, () => []);
  for (let i = 1; i < n; i++) {
    const [a, b] = lines[i].split(' ').map(Number);
    graph[a].push(b);
    graph[b].push(a);
  }

  const depth = Array(n + 1).fill(0);  // 각 노드의 깊이
  const parent = Array(n + 1).fill(0);  // 각 노드의 부모 노드 번호

  // DFS로 트리 정보를 채움. 각 노드의 깊이와 부모 정보
  function dfs(node, par, dep) {
    depth[node] = dep;
    parent[node] = par;

    for (const next of graph[node]) {
      if (next === par) continue;   // 부모로 다시 가는 것 금지
      dfs(next, node, dep + 1);
    }
  }

  // dfs 시작
  dfs(1, 0, 0);

  // LCA 찾기 함수
  function findLCA(a, b) {
    // 1단계: 두 노드의 깊이를 같게 맞추기
    while (depth[a] > depth[b]) {
      a = parent[a];
    }

    while (depth[b] > depth[a]) {
      b = parent[b];
    }

    // 2단계: 같이 올라가면서 공통 조상 찾기
    while (a !== b) {
      a = parent[a];
      b = parent[b];
    }

    return a;
  }

  // 쿼리 처리
  const m = parseInt(lines[n]);
  const result = [];

  for (let i = 0; i < m; i++) {
    const [a, b] = lines[n + 1 + i].split(' ').map(Number);
    result.push(findLCA(a, b));
  }

  return result.join('\n');
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));