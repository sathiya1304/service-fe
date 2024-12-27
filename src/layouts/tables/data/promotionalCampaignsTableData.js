
export default function campaignsData() {

    return {
      columns: [
        { Header: "Id", accessor: "campaigns_id", align: "left" },
        { Header: "Campaign Name", accessor: "campaigns_name", align: "left" },
        { Header: "Start Date", accessor: "start_date", align: "center" },
        { Header: "End Date", accessor: "end_date", align: "center" },
        { Header: "Target Audience", accessor: "target_audience", align: "center" },
      ],
  
      rows: [
        {
          "campaigns_id": "1",
          "campaigns_name": "Run to Buy",
          "start_date": "2024-12-23",
          "end_date": "2024-12-30",
          "target_audience": "Male",
        },
        {
            "campaigns_id": "2",
            "campaigns_name": "Live with Toys",
            "start_date": "2024-12-23",
            "end_date": "2024-12-30",
            "target_audience": "Kids",
        },
        {
            "campaigns_id": "3",
            "campaigns_name": "Saree Meala",
            "start_date": "2024-12-23",
            "end_date": "2024-12-30",
            "target_audience": "Female",
        },
       
      ],
    };
  }
  