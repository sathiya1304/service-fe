
export default function productsdata() {

  return {
    columns: [
      { Header: "Product Id", accessor: "product_id", width: "30%", align: "left" },
      { Header: "Product Name", accessor: "product_name", align: "left" },
      { Header: "Description", accessor: "description", align: "left" },
      { Header: "Category", accessor: "category", align: "left" },
      { Header: "Price", accessor: "price", align: "left" },
      { Header: "Discount Price", accessor: "discount_price", align: "left" },
      { Header: "Sku", accessor: "sku", align: "left" },
      { Header: "Stock Quantity", accessor: "stock_quantity", align: "left" },
      { Header: "Weight", accessor: "weight", align: "left" },
      { Header: "Dimensions", accessor: "dimensions", align: "left" },
      { Header: "Tags", accessor: "tags", align: "left" },
      { Header: "Product Images", accessor: "images", align: "left" },
      { Header: "Vendor", accessor: "vendor", align: "left" },
     
    ],

    rows: [
      {
        "product_id": "001",
        "product_name": "Eco-Friendly Water Bottle",
        "description": "32oz reusable, BPA-free water bottle, perfect for everyday hydration.",
        "category": "Home & Kitchen",
        "price": "20.00",
        "discount_price": "18.00",
        "sku": "SKU1234",
        "stock_quantity": "150",
        "weight": "0.35 kg",
        "dimensions": "10in x 3in",
        "tags": "Eco-friendly, BPA-free, Reusable",
        "images": "link_to_image.jpg",
        "vendor": "GreenPlanet",
        
      },
      {
        "product_id": "002",
        "product_name": "Smart Fitness Watch",
        "description": "Track your fitness and health metrics with cutting-edge technology.",
        "category": "Electronics",
        "price": "199.99",
        "discount_price": "179.99",
        "sku": "SKU5678",
        "stock_quantity": "75",
        "weight": "0.05 kg",
        "dimensions": "6in x 2in",
        "tags": "Health, Fitness, Wearable",
        "images": "link_to_image_2.jpg",
        "vendor": "TechGear",
       
      },
      {
        "product_id": "003",
        "product_name": "Organic Cotton T-Shirt",
        "description": "Soft, 100% organic cotton t-shirt available in several colors.",
        "category": "Apparel",
        "price": "25.00",
        "discount_price": "22.00",
        "sku": "SKU91011",
        "stock_quantity": "200",
        "weight": "0.2 kg",
        "dimensions": "N/A",
        "tags": "Organic, Cotton, Comfort",
        "images": "link_to_image_3.jpg",
        "vendor": "EcoWear",
       
      }
     
    ],
  };
}
