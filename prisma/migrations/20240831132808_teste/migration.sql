-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prompts" TEXT[],

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);
