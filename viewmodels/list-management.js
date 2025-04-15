$(document).ready(function () {
  // adding temporarily for selecting admin panel
  $("#mainTab").kendoTabStrip({
    animation: false,
    activate: function (e) {
      const index = $(e.item).index();
      if (index === 1) {
        $("#listManagementContent").load("views/list-management.html");
      }
    },
  });
  // .data("kendoTabStrip")
  // .select(1);

  // Load Country Grid by default
  loadGrid("grid-country", "country");

  $("#searchBox").kendoSearchBox({
    placeholder: "Search here...",
    size: "medium",
    rounded: "medium",
    clearButton: true,
    search: function (e) {
      const grid = $("#grid-country").data("kendoGrid");
      if (grid) {
        grid.dataSource.filter({
          logic: "or",
          filters: [
            { field: "country", operator: "contains", value: e.value },
            { field: "abbreviation", operator: "contains", value: e.value },
            { field: "region", operator: "contains", value: e.value },
          ],
        });
      }
    },
  });

  $("#searchGridBar").kendoSearchBox({
    placeholder: "Search here...",
    size: "medium",
    rounded: "medium",
    clearButton: true,
    search: function (e) {
      const grid = $("#grid-dynamic").data("kendoGrid");
      if (grid) {
        const columns = grid.columns;
        const filters = columns.map((column) => ({
          field: column.field,
          operator: "contains",
          value: e.value,
        }));
        grid.dataSource.filter({
          logic: "or",
          filters: filters,
        });
      }
    },
  });

  // Sidebar item click event
  $(".sidebar-item").on("click", function () {
    const type = $(this).data("type");
    // If country is clicked, we don't load second grid
    if (type === "country") return;
    // Load second grid dynamically
    loadGrid("grid-dynamic", type);
  });

  // Function to load grid by type
  function loadGrid(gridId, type) {
    // Destroy existing grid if it exists
    const gridElement = $(`#${gridId}`);
    const existingGrid = gridElement.data("kendoGrid");
    if (existingGrid) {
      existingGrid.destroy();
      gridElement.empty();
    }

    // Load JSON and initialize grid
    $.getJSON(`../assets/data/${type}.json`, function (data) {
      const columns = getColumnsForType(type);

      gridElement.kendoGrid({
        dataSource: {
          data: data,
          pageSize: 5,
          schema: {
            model: {
              id: "id",
              fields: getFieldsForType(type),
            },
          },
        },
        sortable: true,
        filterable: true,
        pageable: {
          refresh: true,
          pageSizes: [5, 10, 20],
          buttonCount: 5,
        },
        columns: columns,
        toolbar: ["create"],
        editable: "popup",
      });
    });
  }

  function getColumnsForType(type) {
    switch (type) {
      case "country":
        return [
          { field: "country", title: "Country", width: 150 },
          { field: "abbreviation", title: "Code", width: 100 },
          { field: "region", title: "Region", width: 120 },
          {
            field: "eu",
            title: "EU",
            width: 100,
            template: "#= eu ? 'Yes' : 'No' #",
          },
          { field: "status", title: "Status", width: 120 },
          {
            field: "createdOn",
            title: "Created On",
            width: 120,
            format: "{0:MM/dd/yyyy}",
          },
          {
            field: "modifiedOn",
            title: "Modified On",
            width: 120,
            format: "{0:MM/dd/yyyy}",
          },
          { command: ["edit", "destroy"], title: "Actions", width: 150 },
        ];
      case "entity":
        return [
          { field: "country", title: "Country", width: 150 },
          { field: "abbreviation", title: "Code", width: 100 },
          { field: "region", title: "Region", width: 120 },
          {
            field: "eu",
            title: "EU",
            width: 100,
            template: "#= eu ? 'Yes' : 'No' #",
          },
          { field: "status", title: "Status", width: 120 },
          {
            field: "createdOn",
            title: "Created On",
            width: 120,
            format: "{0:MM/dd/yyyy}",
          },
          {
            field: "modifiedOn",
            title: "Modified On",
            width: 120,
            format: "{0:MM/dd/yyyy}",
          },
          { command: ["edit", "destroy"], title: "Actions", width: 150 },
        ];
      case "indication":
        return [
          { field: "country", title: "Country", width: 150 },
          { field: "abbreviation", title: "Code", width: 100 },
          { field: "region", title: "Region", width: 120 },
          {
            field: "eu",
            title: "EU",
            width: 100,
            template: "#= eu ? 'Yes' : 'No' #",
          },
          { field: "status", title: "Status", width: 120 },
          {
            field: "createdOn",
            title: "Created On",
            width: 120,
            format: "{0:MM/dd/yyyy}",
          },
          {
            field: "modifiedOn",
            title: "Modified On",
            width: 120,
            format: "{0:MM/dd/yyyy}",
          },
          { command: ["edit", "destroy"], title: "Actions", width: 150 },
        ];
      case "origin":
        return [
          { field: "country", title: "Country", width: 150 },
          { field: "abbreviation", title: "Code", width: 100 },
          { field: "region", title: "Region", width: 120 },
          {
            field: "eu",
            title: "EU",
            width: 100,
            template: "#= eu ? 'Yes' : 'No' #",
          },
          { field: "status", title: "Status", width: 120 },
          {
            field: "createdOn",
            title: "Created On",
            width: 120,
            format: "{0:MM/dd/yyyy}",
          },
          {
            field: "modifiedOn",
            title: "Modified On",
            width: 120,
            format: "{0:MM/dd/yyyy}",
          },
          { command: ["edit", "destroy"], title: "Actions", width: 150 },
        ];
      default:
        return [];
    }
  }

  function getFieldsForType(type) {
    switch (type) {
      case "country":
        return {
          country: { type: "string", validation: { required: true } },
          abbreviation: { type: "string", validation: { required: true } },
          region: { type: "string", validation: { required: true } },
          eu: { type: "boolean" },
          status: { type: "string", validation: { required: true } },
          createdOn: { type: "date" },
          modifiedOn: { type: "date" },
        };
      case "entity":
        return {
          country: { type: "string", validation: { required: true } },
          abbreviation: { type: "string", validation: { required: true } },
          region: { type: "string", validation: { required: true } },
          eu: { type: "boolean" },
          status: { type: "string", validation: { required: true } },
          createdOn: { type: "date" },
          modifiedOn: { type: "date" },
        };
      case "indication":
        return {
          country: { type: "string", validation: { required: true } },
          abbreviation: { type: "string", validation: { required: true } },
          region: { type: "string", validation: { required: true } },
          eu: { type: "boolean" },
          status: { type: "string", validation: { required: true } },
          createdOn: { type: "date" },
          modifiedOn: { type: "date" },
        };
      case "origin":
        return {
          country: { type: "string", validation: { required: true } },
          abbreviation: { type: "string", validation: { required: true } },
          region: { type: "string", validation: { required: true } },
          eu: { type: "boolean" },
          status: { type: "string", validation: { required: true } },
          createdOn: { type: "date" },
          modifiedOn: { type: "date" },
        };
      default:
        return {};
    }
  }
});
