import { getSolution } from "../../db/solution";
import Solution from "../../../components/Solution";
import SolutionDialog from "../../../components/SolutionDialog";

const page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) {
    return <div>Solutions doesn't exists</div>;
  }
  console.log("id", params.id);
  //const solution = await getSolution(params.id);
  return (
    <div>
      <Solution
        title="Simple C++ Solution"
        email="arpit@gmail.com"
        explaination="asdf asd fasdf"
        problem="Two Sum"
        problemId="1234"
        language="cpp"
        code={`class Solution {
            public:
                void sortColors(vector<int>& nums) {
                    int i=0,j=0,f=nums.size()-1;
                    while(j<=f){
                        if(nums[j]==0){
                            swap(nums[i],nums[j]);
                            i++;j++;
                        }
                        else if(nums[j]==1){
                            swap(nums[i],nums[j]);
                            j++;
                        }
                        else{
                            swap(nums[j],nums[f]);
                            f--;
                        }
                    }
                }
            };`}
      />
      <SolutionDialog type="add" problem="Cool" />
    </div>
  );
};

export default page;
