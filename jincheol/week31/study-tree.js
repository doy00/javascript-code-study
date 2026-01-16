// 문제 링크: [LCA](https://www.acmicpc.net/problem/11437)

// 실행: node jincheol/week31/study-tree.js

/**
 * 트리를 생성하여 BFS로 각 노드의 부모 노드와 깊이를 저장한 뒤,
 * 두 노드의 깊이를 맞추고 거슬러 올라가며 공통 조상을 찾음
 * @param {number} N 노드의 개수
 * @param {number[][]} lines 간선들
 * @param {number} M 공통 조상을 알고 싶은 쌍의 개수
 * @param {number[][]} targets 공통 조상을 알고 싶은 쌍
 */
const solution = (N, lines, M, targets) => {
  // 트리 생성
  const tree = Array.from({ length: N + 1 }, () => []);
  for (let i = 0; i < N - 1; i++) {
    const [a, b] = lines[i];
    // 양방향 저장
    tree[a].push(b);
    tree[b].push(a);
  }

  const parent = new Array(N + 1).fill(0); // 부모 노드
  const depth = new Array(N + 1).fill(-1); // 깊이, -1로 초기화

  const queue = [1]; // BFS를 위한 큐
  depth[1] = 0; // 루트의 깊이는 0
  parent[1] = 0; // 루트의 부모는 없음(0)

  // BFS로 부모 노드와 깊이 저장
  let head = 0;
  while (head < queue.length) {
    const curNode = queue[head++]; // 큐에서 추출

    // 현재 노드와 연결된 노드들 방문
    for (const nextNode of tree[curNode]) {
      // 아직 방문하지 않은 노드라면
      if (depth[nextNode] === -1) {
        depth[nextNode] = depth[curNode] + 1; // 깊이 갱신
        parent[nextNode] = curNode; // 부모 노드 갱신
        queue.push(nextNode); // 큐에 추가
      }
    }
  }

  const results = []; // 결과 저장 배열
  // LCA 찾기
  for (let i = 0; i < M; i++) {
    let [a, b] = targets[i]; // 두 노드 추출

    // 깊이가 더 깊은 노드를 b로 설정
    if (depth[a] > depth[b]) [a, b] = [b, a];

    // 깊이를 맞춰줌
    while (depth[a] !== depth[b]) b = parent[b];

    // 공통 조상 찾기 (각 노드를 부모로 재할당하여 찾기)
    while (a !== b) {
      a = parent[a]; // a의 부모로 이동
      b = parent[b]; // b의 부모로 이동
    }

    results.push(a); // 공통 조상 추가
  }

  return results.join('\n');
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const N = parseInt(input[0]);
const lines = input.slice(1, N).map((v) => v.trim().split(' ').map(Number));
const M = parseInt(input[N]);
const targets = input.slice(N + 1).map((v) => v.trim().split(' ').map(Number));
console.log(solution(N, lines, M, targets));
