/*
week32 - BFS - 점프 게임 (https://www.acmicpc.net/problem/15558)

지도는 총 2개의 줄로 나누어져 있으며, 각 줄은 N개의 칸으로 나누어져 있다. 
1. 한 칸 앞으로 이동한다. 예를 들어, 현재 있는 칸이 i번 칸이면, i+1번 칸으로 이동한다.
2. 한 칸 뒤로 이동한다. 예를 들어, 현재 있는 칸이 i번 칸이면, i-1번 칸으로 이동한다.
3. 반대편 줄로 점프한다. 이때, 원래 있던 칸보다 k칸 앞의 칸으로 이동해야 한다. 예를 들어, 현재 있는 칸이 왼쪽 줄의 i번 칸이면, 오른쪽 줄의 i+k번 칸으로 이동해야 한다.
N번 칸보다 더 큰 칸으로 이동하는 경우에는 게임을 클리어한 것이다.
* 1초에 한 칸씩 각 줄의 첫 칸이 사라진다

각 칸의 정보가 주어졌을 때, 게임을 클리어 할 수 있는지, 없는지 구하는 프로그램을 작성하시오.

입력
첫째 줄에 N과 k가 주어진다. (1 ≤ N, k ≤ 100,000)

둘째 줄에는 왼쪽 줄의 정보가 주어진다. i번째 문자가 0인 경우에는 위험한 칸이고, 1인 경우에는 안전한 칸이다. 셋째 줄에는 오른쪽 줄의 정보가 주어지고, 각 문자의 의미는 왼쪽 줄의 의미와 동일하다.

왼쪽 줄의 1번 칸은 항상 안전한 칸이다.
*/

function solution(input) {
  const lines = input.trim().split('\n');
  const [N, k] = lines[0].split(' ').map(Number);  // N:칸의개수, k:점프시 앞으로 가는 칸수
  const board = [lines[1], lines[2]]; // board[0]: 왼쪽줄, board[1]: 오른쪽줄

  const queue = [];
  const visited = new Set(); // Set으로 방문체크

  queue.push([0, 1, 0]);  // 왼쪽줄, 1번칸, 0초
  visited.add('0,0');

  let index = 0;

  while (index < queue.length) {
    const [row, pos, time] = queue[index++];
    // row: 현재줄 (0 or 1)
    // post: 현재 위치 (칸 번호)
    // time: 현재까지 경과한 시간(초)

    const moves = [
      [row, pos + 1],  // 1. 한칸 앞으로
      [row, pos - 1],  // 2. 한칸 뒤로
      [1-row, pos+k]   // 3. 반대편 줄로 점프 
    ];

    // 이동
    for (const [nextRow, nextPos] of moves) {
      // N을 넘어감 - 게임 클리어
      if (nextPos > N) {  
        return 1;  // 즉시 성공 반환
      }
      if (nextPos < 1) continue;           

      // 유효성검사
      // 칸이 모두 소멸한 경우
      if (nextPos <= time + 1) continue;

      // 
      if (board[nextRow][nextPos - 1] === '0') continue;
      // board[nextRow][nextPos-1]로 접근하는 이유:
      // - 칸 번호는 1부터 시작 (1번 칸, 2번 칸, ...)
      // - 배열 인덱스는 0부터 시작 (0, 1, 2, ...)
      // - 따라서 n번 칸 = board[줄][n-1]

      // 이미 방문한 줄, 위치인지 체크
      const key = `${nextRow},${nextPos}`;
      if (visited.has(key)) continue;

      visited.add(key);
      queue.push([nextRow, nextPos, time+1]); // 다음 상태를 큐에 추가 (시간+1)
    }
  }

  return 0; // 클리어 실패
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));