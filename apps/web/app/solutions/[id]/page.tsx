import { getSolutions } from "../../db/solution";
import { SolutionsCard } from "../../../components/SolutionsCard";
const page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) {
    return <div>Solutions doesn't exists</div>;
  }
  const solutions = await getSolutions(params.id);

  return (
    <div>
      <p>Solutions</p>
      <div className="grid md:grid-cols-2 md:gap-4 mx-4 my-2">
        {solutions.map((ele) => {
          return (
            <SolutionsCard
              title={ele.title}
              id={ele.id}
              email={ele.user.email}
              createdAt={ele.createdAt}
              language={ele.language}
            />
          );
        })}
      </div>
    </div>
  );
};

export default page;
