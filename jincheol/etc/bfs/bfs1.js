// 문제 링크: [연구소](https://www.acmicpc.net/problem/14502)
// 실행: node jincheol/etc/bfs/bfs1.js

/**
 *
 * @param {number} N 연구소 세로 크기
 * @param {number} M 연구소 가로 크기
 * @param {string[][]} lab 연구소 구조
 */
const solution = (N, M, lab) => {
  const virus = []; // 바이러스 위치
  const empty = []; // 빈 공간 위치
  // 초기화
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      if (lab[r][c] === '2') virus.push([r, c]);
      else if (lab[r][c] === '0') empty.push([r, c]);
    }
  }

  // 이동 좌표
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  /**
   * 연구소의 안전 구역 개수를 구하는 함수
   * @param {string[][]} tmpLab 연구소 구조
   * @returns {number} 연구소의 안전 구역 개수
   */
  const getSafeArea = (tmpLab) => {
    const queue = [...virus]; // 바이러스 시작 위치부터 퍼트리기

    // bfs 탐색
    let head = 0;
    while (head < queue.length) {
      const [r, c] = queue[head++];
      // 4방향 이동
      for (let i = 0; i < 4; i++) {
        const nr = r + dr[i];
        const nc = c + dc[i];

        // 연구소 내부이고 빈 공간이면 바이러스 퍼트리기
        const isInside = nr >= 0 && nr < N && nc >= 0 && nc < M;
        if (isInside && tmpLab[nr][nc] === '0') {
          tmpLab[nr][nc] = '2';
          queue.push([nr, nc]); // 큐에 퍼트린 바이러스 위치 추가
        }
      }
    }

    // 안전 구역 개수 확인
    let count = 0;
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < M; c++) {
        if (tmpLab[r][c] === '0') count++;
      }
    }

    return count;
  };

  let maxSafeArea = 0; // 최대 안전 구역 개수

  /**
   * 연구소에 벽 3개를 세우는 dfs 함수
   * @param {number} start 시작 인덱스
   * @param {number} count 세운 벽 개수
   */
  const makeWall = (start, count) => {
    // 벽이 3개면
    if (count === 3) {
      const tmpLab = lab.map((r) => [...r]); // 연구소 복사
      maxSafeArea = Math.max(maxSafeArea, getSafeArea(tmpLab)); // 최대 안전 구역 개수 갱신
      return; // 종료
    }

    for (let i = start; i < empty.length; i++) {
      const [r, c] = empty[i];
      lab[r][c] = '1'; // 벽 세우기
      makeWall(i + 1, count + 1); // 추가 탐색
      lab[r][c] = '0'; // 백트래킹
    }
  };

  makeWall(0, 0); // dfs 탐색

  return maxSafeArea;
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, '..', 'input.txt');
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const lab = input.slice(1).map((v) => v.trim().split(' '));
console.log(solution(N, M, lab));
