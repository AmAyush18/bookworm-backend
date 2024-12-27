import prisma from "./db.config";

export const getUser = async (userId: any) => {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  };
  