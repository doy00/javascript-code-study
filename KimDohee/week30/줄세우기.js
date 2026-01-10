/*
week30 - 그래프2 - 줄 세우기 (https://www.acmicpc.net/problem/2252)
*/

function solution(input) {
  lines = input.trim().split('\n');
  const [n, m] = lines[0].split(' ').map(Number);  // n: 학생수, m: 비교 횟수
  const graph = Array.from({length: n + 1}, () => []);  // 그래프: 각 학생이 누구앞에 서야하는지
  const indegree = Array.from({length: n + 1}, () => 0);  // 진입차수
  const queue = []; 
  const result = [];

  for (let i = 1; i <= m; i++) {
    const [a, b] = lines[i].split(' ').map(Number);
    graph[a].push(b);  // graph[a]: a번 학생이 누구앞에 서야하는지(간선 추가)
    indegree[b]++;  // b번 학생의 진입차수 증가
  }
  // 1단계: 진입차수 0인 노드를 큐에
  for (let i = 1; i <= n; i++) {  // 학생수만큼 반복
    if (indegree[i] === 0) {
        queue.push(i);
    }
  }

  // 2단계: 큐가 빌 때까지 반복
  while (queue.length > 0) {
    const current = queue.shift();  // 큐에서 꺼내기
    result.push(current);           // 결과에 추가
    
    // 3단계: 연결된 노드들의 진입차수 감소
    for (const next of graph[current]) {
        indegree[next]--;
        if (indegree[next] === 0) {
            queue.push(next);  // 진입차수 0이면 큐에 추가
        }
    }
  }
  return result.join(' ');
}


// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input1.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));