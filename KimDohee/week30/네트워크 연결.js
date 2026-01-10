/*
week30 - 그래프2 - 네트워크 연결 (https://www.acmicpc.net/problem/1922)
컴퓨터와 컴퓨터를 직접 연결해 자료를 공유하려한다. 컴퓨터를 연결하는데 필요한 최소비용을 출력
*/

function solution(input) {
  const lines = input.trim().split('\n');
  const n = parseInt(lines[0]);  // 컴퓨터 수
  const m = parseInt(lines[1]);  // 연결 수

  // 간선 정보 저장
  const edges = [];
  for (let i = 2; i < m + 2; i++) {
    const [a, b, cost] = lines[i].split(' ').map(Number);
    edges.push([cost, a, b]);  // [비용, 컴퓨터1, 컴퓨터2]
  }

  // 비용 순으로 정렬
  edges.sort((a, b) => a[0] - b[0]);

  const parent = Array.from({length: n + 1}, (_, i) => i);

  // Union-Find 구현
  // 부모 노드 찾는 함수
  function find(x) {
    if (parent[x] !== x) {
        parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  // 두 부모 노드를 합치는 함수
  function union(a, b) {
    const rootA = find(a);
    const rootB = find(b);
    
    if (rootA === rootB) {
        return false;  // 이미 같은 그룹이므로 연결 안함
    }
    
    parent[rootB] = rootA;  // B의 그룹을 A에 합침
    return true;  // 연결 성공
  }

  let totalCost = 0;
  let selectedEdges = 0;

  for (const [cost, a, b] of edges) {
    if (union(a, b)) {
      totalCost += cost;
      selectedEdges++;

      if (selectedEdges === n - 1) {  // n-1개 선택
        break;  // 모든 컴퓨터를 연결하는 최소 비용을 찾음
      }
    }
  }

  return totalCost;

}


// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));