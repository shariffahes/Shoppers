import moment from "moment";

class Order {
  constructor(id, products, totalAmount, date) {
    this.id = id;
    this.products = products;
    this.totalAmount = totalAmount;
    this.date = date;
  }

  get readableDate() {
    // return this.date.toLocaleDateString("en-EN", {
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    //   hour: "2-digit",
    //   minite: "2_digit",
    // });

    return moment(this.date).format("MMMM Do YYYY, hh:mm");
  }
}

export default Order;
