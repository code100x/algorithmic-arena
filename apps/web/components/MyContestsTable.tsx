import Image from "next/image";
import Info from "../public/svg/Info.svg";
export function MyContestsTable({ data }: {
  data: {
    title: string,
    finishTime: string,
    solved: string,
    ranking: string
  }[]
}) {
  return (
    <div className="border border-[#E2E8F0] dark:border-[#1F2A41] rounded-lg overflow-hidden shadow-sm">
      {data.length > 0 ? <Table data={data} /> : <NoContests />}
    </div>
  )
}

function Table({ data }: {
  data: {
    title: string,
    finishTime: string,
    solved: string,
    ranking: string
  }[]
}) {
  return (
    <table className="w-full text-sm text-left text-gray-500 scale-[1.01]  rounded-lg dark:border-[#1F2A41] dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-[#E2E8F0] dark:bg-[#0F172A] dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Contest
          </th>
          <th scope="col" className="px-6 py-3">
            Finish Time
          </th>
          <th scope="col" className="px-6 py-3">
            Solved
          </th>
          <th scope="col" className="px-6 py-3">
            Ranking
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-400">
        {
          data.map((item, index) => (
            <tr key={index} className="bg-white dark:bg-[#020817] border border-[#E2E8F0] dark:border-[#1F2A41] ">
              <td className="px-6 text-gray-400 py-4 whitespace-nowrap">
                <p className="text-sm">
                  {item.title}
                </p>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm">
                  {item.finishTime}
                </p>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm">
                  {item.solved}
                </p>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm">
                  {item.ranking}
                </p>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

function NoContests() {
  return (
    <div className="w-full flex justify-center text-center py-[20px] md:p-[2rem] items-center">
      <div className="flex flex-col items-center gap-y-2 max-w-[600px]">
        <Image src={Info} alt="info" width={40} height={40} />
        <h1 className="text-lg md:text-2xl font-bold ">
          You haven't joined any contests yet
        </h1>
        <p className="text-gray-400 text-sm max-w-[70%]">
          You haven't joined any contests yet. Compete in upcoming
          challenges to climb the leaderboards.
        </p>
      </div>
    </div>
  )
}
