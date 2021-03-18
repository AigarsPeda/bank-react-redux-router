import { ITransactions } from "../types";

export const reduceTransactionsUniquePerDay = (
  transactions: ITransactions[],
  period: "year" | "day" | "week" | "month"
): ITransactions[] =>
  transactions.reduce((accumulator: ITransactions[], current) => {
    if (period === "year") {
      if (
        !accumulator.some(
          (tran: ITransactions) =>
            tran.formatted_date === current.formatted_date
        )
      ) {
        // if current is unique object add it to array
        accumulator.push(current);
      } else {
        // if current already is in the array find it index
        const objIndex = accumulator.findIndex(
          (obj) => obj.formatted_date === current.formatted_date
        );

        // necessary because accumulator[objIndex]?.withdraw_amount may be null
        const withdraw_amount = accumulator[objIndex]?.withdraw_amount ?? "0";
        const current_withdraw_amount = current?.withdraw_amount ?? "0";
        const deposit_amount = accumulator[objIndex]?.deposit_amount ?? "0";
        const current_deposit_amount = current?.deposit_amount ?? "0";

        // creating new object with updated values
        const updated = {
          ...accumulator[objIndex],
          withdraw_amount: (
            +withdraw_amount + +current_withdraw_amount
          ).toString(),
          deposit_amount: (+deposit_amount + +current_deposit_amount).toString()
        };

        // if object is in accumulator array find it and update it
        return [
          ...accumulator.slice(0, objIndex),
          updated,
          ...accumulator.slice(objIndex + 1)
        ];
      }
    }
    if (period === "day") {
      const today = new Date();
      const date = ("0" + today.getDate()).slice(-2);
      const month = ("0" + (today.getMonth() + 1)).slice(-2);
      const year = today.getFullYear();

      const formatted_date = `${date}-${month}-${year}`;

      if (current.formatted_date === formatted_date) {
        accumulator.push(current);
      }
    }

    if (period === "week") {
      const today = new Date(); // get current date
      const first = today.getDate() - today.getDay() + 1; // First day is the day of the month - the day of the week
      const last = first + 6; // last day is the first day + 6

      const firstDay = new Date(today.setDate(first)).toLocaleDateString();
      const lastDay = new Date(today.setDate(last)).toLocaleDateString();

      // new Date( "13-01-2011".replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") );
      const curr = current.formatted_date.split("-");
      const formattedCurrentDate = new Date(
        parseInt(curr[2]),
        parseInt(curr[1]) - 1,
        parseInt(curr[0])
      ).toLocaleDateString();

      if (firstDay <= formattedCurrentDate && lastDay >= formattedCurrentDate) {
        accumulator.push(current);
      }
    }

    if (period === "month") {
      const monthNow = new Date().getMonth();
      const curr = current.formatted_date.split("-");
      const formattedCurrentDate = new Date(
        parseInt(curr[2]),
        parseInt(curr[1]) - 1,
        parseInt(curr[0])
      );

      if (formattedCurrentDate.getMonth() === monthNow) {
        accumulator.push(current);
      }
    }

    return accumulator;
  }, []);
