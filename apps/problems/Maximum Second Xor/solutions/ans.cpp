#include <iostream>
#include <stack>

using namespace std;

const int N = 1e5 + 5;
int n, a[N], ans = 0;

void solve() {
    cin >> n;
    for (int i = 0; i < n; ++i) cin >> a[i];

    stack<int> st;
    for (int i = 0; i < n; ++i) {
        while (!st.empty() && a[i] > a[st.top()]) {
            int top = st.top();
            st.pop();
            ans = max(ans, a[i] ^ a[top]);
        }
        st.push(i);
    }

    stack<int> st2;
    for (int i = n - 1; i >= 0; --i) {
        while (!st2.empty() && a[i] > a[st2.top()]) {
            int top = st2.top();
            st2.pop();
            ans = max(ans, a[i] ^ a[top]);
        }
        st2.push(i);
    }
    cout << ans << '\n';
}

signed main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    solve();
    return 0;
}