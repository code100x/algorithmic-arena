#include "bits/stdc++.h"

using namespace std;

template <typename T> std::ostream &operator<<(std::ostream &stream, const vector<T> &vec) {for (size_t i = 0; i < vec.size(); i++) { stream << vec[i]; if (i != vec.size() - 1) stream << ' '; }; return stream; } template <typename T> std::istream &operator>>(std::istream &stream, vector<T> &vec) {for (T &x : vec) stream >> x; return stream; } template <typename T, typename U> std::ostream &operator<<(std::ostream &stream, const pair<T, U> &pr) {stream << pr.first << ' ' << pr.second; return stream; } template <typename T, typename U> std::istream &operator>>(std::istream &stream, pair<T, U> &pr) {stream >> pr.first >> pr.second; return stream; } template <typename A, typename B> string to_string(pair<A, B> p); template <typename A, typename B, typename C> string to_string(tuple<A, B, C> p); template <typename A, typename B, typename C, typename D> string to_string(tuple<A, B, C, D> p); string to_string(const string &s) { return '"' + s + '"'; } string to_string(char c) {string s; s += c; return s; } string to_string(const char *s) { return to_string((string)s); } string to_string(bool b) { return (b ? "1" : "0"); } string to_string(vector<bool> v) {bool first = true; string res = "{"; for (int i = 0; i < static_cast<int>(v.size()); i++) {if (!first) {res += ", "; } first = false; res += to_string(v[i]); } res += "}"; return res; } template <size_t N> string to_string(bitset<N> v) {string res = ""; for (size_t i = 0; i < N; i++) {res += static_cast<char>('0' + v[i]); } return res; } template <typename A> string to_string(A v) {bool first = true; string res = "{"; for (const auto &x : v) {if (!first) {res += ", "; } first = false; res += to_string(x); } res += "}"; return res; } template <typename A, typename B> string to_string(pair<A, B> p) { return "(" + to_string(p.first) + ", " + to_string(p.second) + ")"; } template <typename A, typename B, typename C> string to_string(tuple<A, B, C> p) { return "(" + to_string(get<0>(p)) + ", " + to_string(get<1>(p)) + ", " + to_string(get<2>(p)) + ")"; } template <typename A, typename B, typename C, typename D> string to_string(tuple<A, B, C, D> p) { return "(" + to_string(get<0>(p)) + ", " + to_string(get<1>(p)) + ", " + to_string(get<2>(p)) + ", " + to_string(get<3>(p)) + ")"; } void debug_out() { cout << endl; } template <typename Head, typename... Tail> void debug_out(Head H, Tail... T) {cout << " " << to_string(H); debug_out(T...); }

#define VarunDeepSaini ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr);
#define int            long long
#define double         long double
#define endl           "\n"
#define all(x)         x.begin(), x.end()
#define v              vector
#define vi             vector<int>
#define vvi            vector<vector<int>>
#define pii            pair<int, int>
#define mpci           map<char, int>
#define mpii           map<int, int>
#define pb             emplace_back
#define mp             make_pair
#define F              first
#define S              second
#define si             set<int>
#define msi            multiset<int>
#define maxn           1000005

int gcd(int a, int b) { if (b == 0) return a; return gcd(b, a % b);}
int power(int a, int b, int m) { int ans = 1; while (b) { if (b & 1) ans = (ans * a) % m; b /= 2; a = (a * a) % m; } return ans; }
int lcm(int a, int b) { return (a * b) / gcd(a, b); }
int modInverse(int a, int m) { return power(a, m - 2, m); }
int modAdd(int a, int b, int m) { return ((a % m) + (b % m)) % m; }
int modMul(int a, int b, int m) { return ((a % m) * (b % m)) % m; }
int modSub(int a, int b, int m) { return ((a % m) - (b % m) + m) % m; }
int modDiv(int a, int b, int m) { return (modMul(a, modInverse(b, m), m) + m) % m; }
bool isPrime(int n) { if (n <= 1) return false; if (n <= 3) return true; if (n % 2 == 0 || n % 3 == 0) return false; for (int i = 5; i * i <= n; i = i + 6) if (n % i == 0 || n % (i + 2) == 0) return false; return true; }
int nCr(int n, int r) { if (r > n - r) r = n - r; int ans = 1; for (int i = 0; i < r; i++) { ans *= (n - i); ans /= (i + 1); } return ans; }
int nCrModP(int n, int r, int p) { if (r > n - r) r = n - r; int C[r + 1]; memset(C, 0, sizeof(C)); C[0] = 1; for (int i = 1; i <= n; i++) { for (int j = min(i, r); j > 0; j--) C[j] = (C[j] + C[j - 1]) % p; } return C[r]; }
int nPr(int n, int r) { int ans = 1; for (int i = 0; i < r; i++) ans *= (n - i); return ans; }
int nPrModP(int n, int r, int p) { int ans = 1; for (int i = 0; i < r; i++) ans = (ans * (n - i)) % p; return ans; }
int log(int num , int base){int ans = 0; while(num){num /= base;ans++;} return ans;}
int countSetBits(int x){int ans = 0;while(x){ans += (x&1);x >>= 1;}return ans;}

int dx[4] = {1,-1,0,0};
int dy[4] = {0,0,1,-1};

bool testcases = 0;

const int mod = 1e9 + 7;
string s;
si anss;

void rec(int index, vector<int> &nums, vector<char> &ops){
    if(index == s.size()){
        int ans = nums[0];
        for(int i = 0 ; i < ops.size() ; i++){
            if(ops[i] == '+') ans += nums[i+1];
            else ans -= nums[i+1];
        }
        anss.insert(ans);
        return;
    }

    if(index == 0){
        nums.pb(s[index] - '0');
        rec(index + 1, nums, ops);
        nums.pop_back();
    }
    else{
        nums.pb(s[index] - '0');
        ops.pb('+');
        rec(index + 1, nums, ops);
        ops.pop_back();
        ops.pb('-');
        rec(index + 1, nums, ops);
        ops.pop_back();
        nums.pop_back();
    }

}

void solve()
{
    cin >> s;
    vector<int> nums;
    vector<char> op;
    rec(0, nums, op);
    for(auto x : anss) cout << x << " ";
}

int32_t main()
{
    VarunDeepSaini 
    int t = 1;
    testcases and cin >> t;
    while(t--) solve();
}