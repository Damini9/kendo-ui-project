$(document).ready(function () {
  // Initialize search box
  $("#searchBar").kendoSearchBox({
    placeholder: "Search users...",
    size: "medium",
    rounded: "medium",
    clearButton: true,
    search: function (e) {
      // Perform search action here
      var searchValue = e.value;
      console.log("Searching for: " + searchValue);
    },
  });
  // Initialize grid
  $("#grid-products").kendoGrid({
    dataSource: {
      transport: {
        read: {
          url: "../../assets/data/products.json",
          dataType: "json",
          type: "GET",
        },

        parameterMap: function (data, type) {
          return JSON.stringify(data); // ensure correct format
        },
      },
      schema: {
        model: {
          id: "id",
          fields: {
            activeSubstances: {
              type: "string",
              validation: { required: true },
            },
            division: { type: "string", validation: { required: true } },
            therapeuticAreas: {
              type: "string",
              validation: { required: true },
            },
            productType: { type: "string", validation: { required: true } },
            source: { type: "string", validation: { required: true } },
            createdBy: { type: "string", editable: false },
            createdOn: { type: "date", editable: false },
            modifiedBy: { type: "string", editable: false },
            modifiedOn: { type: "date", editable: false },
          },
        },
      },
      pageSize: 10,
    },
    height: 550,
    sortable: true,
    filterable: true,
    pageable: {
      refresh: true,
      pageSizes: [10, 20, 50],
      buttonCount: 5,
    },
    toolbar: ["create"], // ✅ adds the Add button
    editable: "popup", // ✅ enables popup editing
    columns: [
      { field: "activeSubstances", title: "Active Substances", width: 150 },
      { field: "division", title: "Division", width: 150 },
      { field: "therapeuticAreas", title: "Therapeutic Areas", width: 200 },
      { field: "productType", title: "Product Type", width: 150 },
      { field: "source", title: "Source", width: 150 },
      { field: "createdBy", title: "Created By", width: 150 },
      {
        field: "createdOn",
        title: "Created On",
        width: 150,
        format: "{0:MM/dd/yyyy}",
      },
      { field: "modifiedBy", title: "Modified By", width: 150 },
      {
        field: "modifiedOn",
        title: "Modified On",
        width: 150,
        format: "{0:MM/dd/yyyy}",
      },
      { command: ["edit", "destroy"], title: "Actions", width: 200 },
    ],
  });

  // Add Button Click Handler
  $("#addBtn").click(function () {
    const grid = $("#grid-products").data("kendoGrid");
    grid.addRow();
  });

  // Export  Button Click Handler
  $("#exportBtn").click(function () {
    const grid = $("#grid-products").data("kendoGrid");
    grid.saveAsExcel();
  });
});
