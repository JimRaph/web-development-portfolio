import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getExpensesByCategory = async (req, res) => {
    try {
        const getExpensesByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
            orderBy: {
                date: "desc"
            }
        });
        const expenseByCategorySummary = getExpensesByCategorySummaryRaw.map((item) => ({
            ...item,
            amount: item.amount.toString(),
        }));
        res.json(expenseByCategorySummary);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving expenses by category" });
    }
};
