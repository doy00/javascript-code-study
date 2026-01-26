// 문제 링크: [직사각형 탈출](https://www.acmicpc.net/problem/16973)

// 실행: node jincheol/week32/study-BFS2-1.js

/**
 *
 * @param N 격자판 세로 크기
 * @param M 격자판 가로 크기
 * @param map 격자판 정보 (0: 이동 가능, 1: 이동 불가)
 * @param H 직사각형 높이
 * @param W 직사각형 너비
 * @param Sr 시작 위치 세로 좌표
 * @param Sc 시작 위치 가로 좌표
 * @param Fr 도착 위치 세로 좌표
 * @param Fc 도착 위치 가로 좌표
 */
const solution = (N, M, map, H, W, Sr, Sc, Fr, Fc) => {
  // 누적 합 배열 생성
  const sumMap = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));
  //  누적 합 배열 채우기
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= M; j++) {
      const curVal = map[i - 1][j - 1]; // 현재 위치 값
      // 누적 합 계산 (이전 행 + 이전 열 - 대각선 겹치는 부분 + 현재 값)
      sumMap[i][j] =
        sumMap[i - 1][j] + sumMap[i][j - 1] - sumMap[i - 1][j - 1] + curVal;
    }
  }

  /**
   * 직사각형이 (r, c) 위치로 이동 가능한지 확인하는 함수
   * @param r {number} 직사각형의 시작 행 좌표
   * @param c {number} 직사각형의 시작 열 좌표
   * @returns {boolean} 이동 가능 여부
   */
  const canMove = (r, c) => {
    const r1 = r; // 직사각형 영역의 행 시작 좌표
    const c1 = c; // 직사각형 영역의 열 시작 좌표
    const r2 = r + H - 1; // 직사각형 영역의 행 끝 좌표
    const c2 = c + W - 1; // 직사각형 영역의 열 끝 좌표
    // 누적 합 배열을 이용해 직사각형 영역 내의 합 계산
    const total =
      sumMap[r2 + 1][c2 + 1] -
      sumMap[r1][c2 + 1] -
      sumMap[r2 + 1][c1] +
      sumMap[r1][c1];
    return total === 0; // 직사각형 영역 내에 장애물이 없으면 이동 가능 (장애물은 1 값이라)
  };

  // 방향 (상, 하, 좌, 우)
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  const visited = Array.from({ length: N }, () => Array(M).fill(false)); // 방문 기록 배열
  const queue = [[Sr, Sc, 0]]; // bfs 큐
  visited[Sr][Sc] = true; // 시작 위치 방문 처리

  // bfs 탐색
  let head = 0;
  while (queue.length > head) {
    const [r, c, dist] = queue[head++]; // 큐에서 현재 위치와 거리 정보 추출
    if (r === Fr && c === Fc) return dist; // 도착 위치에 도달하면 거리 반환

    // 4방향 탐색
    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i]; // 새로운 행 위치
      const nc = c + dc[i]; // 새로운 열 위치

      // 새로운 위치가 격자판 내에 있고, 아직 방문하지 않았으며, 직사각형이 이동 가능한지 확인
      const isInMap = nr >= 0 && nr + H - 1 < N && nc >= 0 && nc + W - 1 < M;
      if (isInMap && !visited[nr][nc] && canMove(nr, nc)) {
        visited[nr][nc] = true; // 방문 처리
        queue.push([nr, nc, dist + 1]); // 큐에 추가
      }
    }
  }

  return -1; // 도착 위치에 도달할 수 없는 경우
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input1.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const map = input.slice(1, N + 1).map((v) => v.split(' ').map(Number));
const [H, W, Sr, Sc, Fr, Fc] = input[N + 1].split(' ').map(Number);
console.log(solution(N, M, map, H, W, Sr - 1, Sc - 1, Fr - 1, Fc - 1));
