const POINT_MAPPING: Record<string, number> = {
  EASY: 250,
  MEDIUM: 500,
  HARD: 1000,
};

export const getPoints = async (
  contestId: string,
  userId: string,
  problemId: string,
  difficulty: string,
  startTime: Date,
  endTime: Date,
): Promise<number> => {
  const now = new Date();
  const timeDiff = Math.abs(endTime.getTime() - startTime.getTime());
  const points = POINT_MAPPING[difficulty || "EASY"];
  if(!points) return 0;
  const totalPoints =
    (((endTime.getTime() - now.getTime()) / timeDiff) * points) / 2 +
    points / 2;

  return totalPoints;
};
