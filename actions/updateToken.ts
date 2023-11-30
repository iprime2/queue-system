// import { getServerSession } from "next-auth";

// import prismadb from "@/lib/prismadb";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";
// import { Token } from "@prisma/client";

// export const updateToken = async (data: Token[]) => {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session) {
//       return null;
//     }

//     await prismadb.token.updateMany({
//       where: {
//         id: data.id,
//       },
//       data: {
//         title: data.title,
//         description: data.description,
//         tokenNo: data.tokenNo,
//         status: data.status,
//         isCompleted: data.isCompleted,
//         counterId: data.counterId,
//         departmentId: data.departmentId,
//         userId: data.userId,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
