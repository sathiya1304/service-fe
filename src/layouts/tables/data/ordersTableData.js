
export default function ordersdata() {

  return {
    columns: [
      { Header: "Order Id", accessor: "order_id", width: "30%", align: "left" },
      { Header: "Customer Name", accessor: "customer_name", align: "left" },
      { Header: "Order Date", accessor: "order_date", align: "center" },
      { Header: "Shipping Address", accessor: "shipping_address", align: "center" },
      { Header: "Billing Address", accessor: "billing_address", align: "center" },
      { Header: "Order Items", accessor: "order_items", align: "center" },
      { Header: "Quantity", accessor: "quantity", align: "center"},
      { Header: "Price", accessor: "price", align: "center"},
      { Header: "Total Amount", accessor: "total_amount", align: "center" },
      { Header: "Payment Status ", accessor: "payment_status", align: "center" },
      { Header: "Order Status ", accessor: "order_status", align: "center" },
    ],

    rows: [
      {
        "order_id": "1",
        "customer_name": "Karthika",
        "order_date": "22/12/2024",
        "shipping_address": "8,chinnakadai street thirumangalam,Madurai",
        "billing_address": "8,chinnakadai street thirumangalam,Madurai",
        "order_items": "Eco-Friendly Water Bottle",
        "quantity":"2",
        "price":"200",
        "total_amount": "400",
        "payment_status": "paid",
        "order_status": "delivered",
      },
      {
        "order_id": "2",
        "customer_name": "Abinaya",
        "order_date": "23/12/2024",
        "shipping_address": "67/14A, Kamaraj by pass road",
        "billing_address": "67/14A, Kamaraj by pass road",
        "order_items": "Smart Fitness Watch",
        "quantity":"1",
        "price":"1500",
        "total_amount": "1500",
        "payment_status": "pending",
        "order_status": "processing",
      },
      {
        "order_id": "3",
        "customer_name": "Madhu",
        "order_date": "23/12/2024",
        "shipping_address": "2/140 West Street bommakottai ,karisalkulam( post)",
        "billing_address": "2/140 West Street bommakottai ,karisalkulam( post)",
        "order_items": "Organic Cotton T-Shirt",
        "quantity":"3",
        "price":"500",
        "total_amount": "1500",
        "payment_status": "pending",
        "order_status": "shipped",
      },
      {
        "order_id": "4",
        "customer_name": "Prabhu",
        "order_date": "23/12/2024",
        "shipping_address": "2/140 West Street bommakottai ,karisalkulam( post)",
        "billing_address": "2/140 West Street bommakottai ,karisalkulam( post)",
        "order_items": "Smart Fitness Watch",
        "quantity":"1",
        "price":"2000",
        "total_amount": "2000",
        "payment_status": "pending",
        "order_status": "shipped",
      },
    ],
  };
}
