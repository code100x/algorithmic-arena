#include <bits/stdc++.h>
using namespace std;
#define pb push_back
#define ll long long int
 
void solve() {
    int n;
    cin>>n;
    vector<int>a(n);
    for(int i=0;i<n;i++)cin>>a[i];
    map<int,int>mp;
    int i=0,j=0;
    int ans=0;
    while(j<n){
        mp[a[j]]++;
        if(mp.size()==(j-i+1)){
            ans=max(ans,j-i+1);
            j++;
        }else if(mp.size()<(j-i+1)){
            while(mp.size()<(j-i+1) and i<=j){
                mp[a[i]]--;
                if(mp[a[i]]==0)mp.erase(a[i]);
                i++;
            }
            j++;
        }
    }
    cout<<ans;
}
 
int main(){
    int t;
	t=1;
    // cin>>t;
    while(t--){
        solve();
    }
}
