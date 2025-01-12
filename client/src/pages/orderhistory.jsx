import {useEffect, useState } from 'react';
import LayOut from '../layouts/layout';
import { useDispatch, useSelector } from 'react-redux';
import { orderList } from '../redux/actions/order_action';
import moment from 'moment';
// import {Loading} from '../c'

const OrderHistory = () =>{


    const orderListReducer = useSelector((state) => state.orderListReducer)
    const {orders=[], loading, error} = orderListReducer;

    const [orderLists, setOrderLists] = useState([])
    const dispatch = useDispatch();

    // const handleOrderType = (e) => {
    //   const orderTemp = structuredClone(orders);
    //   const filterOrder = orderTemp.filter((order) =>{
    //     if(e.target.value === 'paid'){
    //       return order.isPaid;
    //     }
    //     if(e.target.value === 'cancelled'){
    //       return order.isPaid === false
    //     }
    //     return order
    //   })
     
    //   setOrderLists(filterOrder)
    // }

    // const handleDateType = (e) => {
    //   const filterByDate = orders.filter((order) => {
    //     if(e.target.value === 'this week'){
    //       const startOfWeek = moment().startOf('week').format('YYYY-MM-DD');
    //       const endOfWeek = moment().endOf('week').format('YYYY-MM-DD');
    //       return moment(order.orderDate).isBetween(startOfWeek, endOfWeek);
    //     }
    //     if(e.target.value === 'this month'){
    //       const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    //       const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
    //       return moment(order.orderDate).isBetween(startOfMonth, endOfMonth);
    //     }
    //     if(e.target.value === 'this year'){
    //       const startOfYear = moment().startOf('year').format('YYYY-MM-DD');
    //       const endOfYear = moment().endOf('year').format('YYYY-MM-DD');
    //       return moment(order.orderDate).isBetween(startOfYear, endOfYear);
    //     }
    //     if(e.target.value === 'last 3 months'){
    //       const startOfLast3Months = moment().subtract(3,'months').startOf('month').format('YYYY-MM-DD');
    //       const endOfLast3Months = moment().subtract(1,'months').endOf('month').format('YYYY-MM-DD');
    //       return moment(order.orderDate).isBetween(startOfLast3Months, endOfLast3Months);
    //     }
    //     if(e.target.value === 'last 6 months'){
    //       console.log('Last 6 months')
    //       const startOfLast6Months = moment().subtract(6,'months').startOf('month').format('YYYY-MM-DD');
    //       const endOfLast6Months = moment().subtract(1,'months').endOf('month').format('YYYY-MM-DD');
    //       return moment(order.orderDate).isBetween(startOfLast6Months, endOfLast6Months);
    //     }
    //   })

    //   setOrderLists(filterByDate)
    // }
    // 
    // useEffect(() => {
    //     dispatch(orderList());
    //     setOrderLists(orders)
    // }, [dispatch]);


  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("this week");

  // Helper function to calculate date range
  const getDateRange = (filter) => {
    switch (filter) {
      case "this week":
        return [
          moment().startOf("week"),
          moment().endOf("week"),
        ];
      case "this month":
        return [
          moment().startOf("month"),
          moment().endOf("month"),
        ];
      case "last 3 months":
        return [
          moment().subtract(3, "months").startOf("month"),
          moment().subtract(1, "months").endOf("month"),
        ];
      case "last 6 months":
        return [
          moment().subtract(6, "months").startOf("month"),
          moment().subtract(1, "months").endOf("month"),
        ];
      case "this year":
        return [
          moment().startOf("year"),
          moment().endOf("year"),
        ];
      default:
        return [null, null];
    }
  };

  // Combined filtering logic
  const applyFilters = () => {
    let filteredOrders = [...orders];

    // Apply order type filter
    if (typeFilter === "paid") {
      filteredOrders = filteredOrders.filter((order) => order.isPaid);
    } else if (typeFilter === "cancelled") {
      filteredOrders = filteredOrders.filter((order) => !order.isPaid);
    }

    // Apply date filter
    const [startDate, endDate] = getDateRange(dateFilter);
    if (startDate && endDate) {
      filteredOrders = filteredOrders.filter((order) =>
        moment(order.orderDate).isBetween(startDate, endDate)
      );
    }

    setOrderLists(filteredOrders);
  };

  // Handle filter changes
  const handleOrderType = (e) => {
    setTypeFilter(e.target.value);
  };

  const handleOrderDate = (e) => {
    setDateFilter(e.target.value);
  };

  useEffect(() => {
    dispatch(orderList());
  }, [dispatch]);

  useEffect(() => {
    applyFilters();
  }, [typeFilter, dateFilter]);


    return(
        <div>
            <LayOut >
                {loading ?(<h1>Loading Order History</h1>) :
                (
                    <section className="bg-white h-5/6 py-8 antialiased dark:bg-gray-900 md:py-16">
                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                      <div className="mx-auto max-w-5xl">
                        <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                            My orders
                          </h2>
        
                          <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                            <div>
                              <label
                                htmlFor="order-type"
                                className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Select order type
                              </label>
                              <select
                                id="order-type"
                                onChange={(e) => handleOrderType(e)}
                                className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                              >
                                <option defaultValue="all orders">All orders</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="paid">Paid</option>
                              </select>
                            </div>
        
                            <span className="inline-block text-gray-500 dark:text-gray-400">
                              {" "}
                              from{" "}
                            </span>
        
                            <div>
                              <label
                                htmlFor="duration"
                                className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Select duration
                              </label>
                              <select
                                id="duration"
                                onChange={(e) => handleOrderDate(e)}
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                              >
                                <option value="this week" defaultValue="this week">this week</option>
                                <option value="this month">this month</option>
                                <option value="last 3 months">the last 3 months</option>
                                <option value="last 6 months">the last 6 months</option>
                                <option value="this year">this year</option>
                              </select>
                            </div>
                          </div>
                        </div>
        
                        <div className="mt-6 h-full flow-root sm:mt-8">
                          <div className="divide-y h-full divide-gray-200 dark:divide-gray-700">
                            {orderLists &&
                              orderLists.map((order) => (
                                <div
                                  key={order._id}
                                  className="flex flex-wrap items-center gap-y-4 py-6"
                                >
                                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                                      Order ID:
                                    </dt>
                                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                      <a href="#" className="hover:underline">
                                        #{order._id}
                                      </a>
                                    </dd>
                                  </dl>
        
                                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1 ml-10">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400 ">
                                      Date:
                                    </dt>
                                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                      {moment(order.createdAt).format("MMM Do YY")}
                                    </dd>
                                  </dl>
        
                                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                                      Price:
                                    </dt>
                                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                      ${order.totalPrice}
                                    </dd>
                                  </dl>
        
                                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                                      Status:
                                    </dt>
                                    <dd
                                      className={
                                        order.isPaid
                                          ? `"me-2 mt-1.5 inline-flex items-center rounded  bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300"`
                                          : `"me-2 mt-1.5 inline-flex items-center rounded  bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300"`
                                      }
                                    >
                                      <svg
                                        className="me-1 h-3 w-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M5 11.917 9.724 16.5 19 7.5"
                                        />
                                      </svg>
                                      {order.isPaid ? `Paid` : `Not Paid yet`}
                                    </dd>
                                  </dl>
        
                                  <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                                    <button
                                      type="button"
                                      className="w-full rounded-lg bg-primary-700 px-3 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 lg:w-auto"
                                    >
                                      Order again
                                    </button>
                                    {/* <a
                                    href="#"
                                    className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                                  >
                                    View details
                                  </a> */}
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
            </LayOut>
        </div>
    )
}

export default OrderHistory;