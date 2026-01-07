// 문제 링크: [네트워크 연결](https://www.acmicpc.net/problem/1922)

// 실행: node jincheol/week30/study-graph2.js

/**
 *
 * @param {number} N 컴퓨터의 수
 * @param {number} M 연결할 수 있는 선의 수
 * @param {number[][]} connects 컴퓨터 a와 b를 연결하는데 필요한 비용 [a 컴퓨터, b 컴퓨터, 비용]
 */
const solution = (N, M, connects) => {
  connects.sort((a, b) => a[2] - b[2]); // 최소 비용으로 연결하기 위해 비용 오름차순 정렬

  // union-find를 위한 배열
  const graph = Array.from({ length: N + 1 }, (_, idx) => idx); // i번째 컴퓨터의 부모 그룹 인덱스를 저장할 배열

  /**
   * 루트 노드를 찾는 함수
   * @param {number[]} parents graph (부모 그룹이 저장된 배열)
   * @param {number} x 컴퓨터
   * @returns {number} 부모 그룹 인덱스
   */
  const find = (parents, x) => {
    if (parents[x] === x) return x; // 부모가 자신이면 본인 그룹 반환
    return (parents[x] = find(parents, parents[x])); // 본인이 부모가 아니면 계속 찾으러 올라감 (경로 압축)
  };

  /**
   * 두 그룹을 합치는 함수
   * @param {number[]} parents graph (부모 그룹이 저장된 배열)
   * @param {number} a 컴퓨터 a
   * @param {number} b 컴퓨터 b
   * @returns {boolean} 그룹 합치기 성공 여부
   */
  const union = (parents, a, b) => {
    const rootA = find(parents, a); // a 컴퓨터의 부모 그룹
    const rootB = find(parents, b); // b 컴퓨터의 부모 그룹
    // 두 그룹이 다르면
    if (rootA !== rootB) {
      parents[rootA] = rootB; // 합치기
      return true;
    }
    return false;
  };

  let total = 0; // 총 비용
  let connectCount = 0; // 연결된 선의 수 (컴퓨터 수가 아님)
  // 적은 비용 순으로 연결하기
  for (const [a, b, cost] of connects) {
    if (union(graph, a, b)) {
      // 연결 성공하면
      total += cost; // 비용 더하기
      connectCount++; // 연결한 선의 수 증가
      // 종료 조건: 선의 수는 컴퓨터의 개수 -1개임
      if (connectCount === N - 1) break;
    }
  }

  return total;
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const [N, M] = input.slice(0, 2).map((v) => parseInt(v.trim()));
const connects = input.slice(2).map((v) => v.trim().split(' ').map(Number));
console.log(solution(N, M, connects));
