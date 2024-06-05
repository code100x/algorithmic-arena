-- AddForeignKey
ALTER TABLE "ContestPoints" ADD CONSTRAINT "ContestPoints_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
