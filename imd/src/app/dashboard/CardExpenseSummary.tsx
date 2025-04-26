import { ExpenseByCategorySummary, useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const colors = ["#00C49F", "#0088FE", "#FFBB2B"];

type ExpenseSums = {
    [category: string]: number;
}

const CardExpenseSummary = () => {

    const {data: expenseData, isLoading} = useGetDashboardMetricsQuery()
    
    const expenseSummary = expenseData?.expenseSummary[0];

    const data = expenseData?.expenseByCategorySummary || [];

    const expenseSums = data.reduce((prev:ExpenseSums, current) => {
        const category = current.category + " Expenses";
        const amount = parseInt(current.amount, 10);
        if (!prev[category]) prev[category] = 0;
        prev[category] += amount;
        return prev
    }, {})


    const expenseCategories = Object.entries(expenseSums).map(([name,value]) => ({
        name, value
    }))

    const totalExpense = expenseCategories.reduce((prev, current:{value:number}) =>{
        return prev + current.value
    }, 0)

    const formattedTotalExpenses = totalExpense.toFixed(2);

    console.log("dat", data)
  return (
    <div className="bg-white row-span-3 shadow-md rounded-2xl flex flex-col justify-between">
        {isLoading ? (
            <div className="m-5">Loading.........</div>
        ):(
            <>
                <div>
                    <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
                        Expense Summary
                    </h2>
                    <hr className='text-gray-300' />
                </div>


                <div className="xl:flex justify-between pr-7">

                    <div className="relative basis-3/5">
                        <ResponsiveContainer width="100%" height={140}>
                            <PieChart>
                                <Pie data={expenseCategories} innerRadius={50}
                                outerRadius={60} fill="#8884d8" dataKey="value"
                                nameKey="name" cx="50%" cy="50%">
                                    {expenseCategories.map((cat, index) =>(
                                        <Cell key={`cell-${index}`}
                                        fill={colors[index % colors.length]} />
                                    ))} 
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                        text-center basis-2/3">
                            <span>
                                ${formattedTotalExpenses}
                            </span>
                        </div>
                    </div>

                    <ul className="flexflex-col justify-around items-center xl:items-start py-5 gap-3">
                        {expenseCategories.map((cat, index) => (
                            <li
                            key={`legend-${index}`}
                            className="flex items-center text-xs"
                            >
                            <span
                                className="mx-3 mr-2 w-3 h-3 rounded-full"
                                style={{ backgroundColor: colors[index % colors.length] }}
                            ></span>
                            {cat.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <hr className='text-gray-300'/>
                    {expenseSummary && (
                        <div className="mt-3 flex justify-between items-center px-7 mb-4">
                            <div className="pt-2">
                                <p className="text-sm">
                                    Average: {" "}
                                    <span className="font-semibold">
                                        ${expenseSummary.totalExpenses.toFixed(2)}
                                    </span>
                                </p>
                            </div>
                            <span className="flex items-center mt-2">
                                <TrendingUp className="mr-2 text-green-500" />
                                30%
                            </span>
                        </div>
                    )}
                </div>
            </>
        )}
    </div>
  )
}

export default CardExpenseSummary