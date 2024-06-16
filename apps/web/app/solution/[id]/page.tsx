import { getSolution } from "../../db/solution";
import Solution from "../../../components/Solution";

const page = async ({ params }: { params: { id: string } }) => {
  console.log("iddd", params.id);
  if (!params.id) {
    return <div>Solutions doesn't exists</div>;
  }
  const data = await getSolution(params.id);

  console.log(data);
  if (data == null) {
    return (
      <div className="min-h-[80dvh] flex items-center justify-center">
        <p>Something went wrong.</p>
      </div>
    );
  }
  return (
    <div>
      {data && (
        <Solution
          title={data.title}
          email={data.user.email}
          explaination={data.explaination}
          problem={data.problem.title}
          problemId={data.problemId}
          language={data.language.name}
          code={data.code}
          id={data.id}
        />
      )}
    </div>
  );
};

export default page;
