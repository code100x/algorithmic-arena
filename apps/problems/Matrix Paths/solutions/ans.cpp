#include <iostream>
using namespace std;

const int DIR_LEN = 4;
int dr[DIR_LEN] = {-1, 0, 1, 0};
int dc[DIR_LEN] = {0, 1, 0, -1};
const int PATH_LEN = 48; 
int p[PATH_LEN];
const int GRID_SIZE = 9;
bool onPath[GRID_SIZE][GRID_SIZE];

int tryPath(int pathIdx, int curR, int curC) {

	if ((onPath[curR][curC - 1] && onPath[curR][curC + 1]) &&
	    (!onPath[curR - 1][curC] && !onPath[curR + 1][curC]))
		return 0;
        
	if ((onPath[curR - 1][curC] && onPath[curR + 1][curC]) &&
	    (!onPath[curR][curC - 1] && !onPath[curR][curC + 1]))
		return 0;

	if (curR == 7 && curC == 1) { 
		if (pathIdx == PATH_LEN) return 1;
		return 0;
	}

	if (pathIdx == PATH_LEN) return 0;

	int ret = 0;
	onPath[curR][curC] = true;

	if (p[pathIdx] < 4) {
		int nxtR = curR + dr[p[pathIdx]];
		int nxtC = curC + dc[p[pathIdx]];
		if (!onPath[nxtR][nxtC]) ret += tryPath(pathIdx + 1, nxtR, nxtC);
	}else{
		for (int i = 0; i < DIR_LEN; i++) {
			int nxtR = curR + dr[i];
			int nxtC = curC + dc[i];
			if (onPath[nxtR][nxtC]) continue;
			ret += tryPath(pathIdx + 1, nxtR, nxtC);
		}
	}

	onPath[curR][curC] = false;
	return ret;

}

int main() {
	string line;
	getline(cin, line);

	for (int i = 0; i < PATH_LEN; i++) {

		char cur = line[i];

		if (cur == 'U') p[i] = 0;
		else if (cur == 'R') p[i] = 1;
		else if (cur == 'D') p[i] = 2;
		else if (cur == 'L') p[i] = 3;
		else p[i] = 4;

	}

	for (int i = 0; i < GRID_SIZE; i++) {

		onPath[0][i] = true;
		onPath[8][i] = true;
		onPath[i][0] = true;
		onPath[i][8] = true;

	}

	for (int i = 1; i <= 7; i++) {
		for (int j = 1; j <= 7; j++) { 
            onPath[i][j] = false; 
        }
	}

	int startIdx = 0;
	int startR = 1;
	int startC = 1;
	int ans = tryPath(startIdx, startR, startC);
	cout << ans << endl;
}
