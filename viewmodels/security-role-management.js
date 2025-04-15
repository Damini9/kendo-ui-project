$(document).ready(function () {
  // Initialize search box
  $("#roleSearchBar").kendoSearchBox({
    placeholder: "Search here...",
    size: "medium",
    rounded: "medium",
    clearButton: true,
    search: function (e) {
      const grid = $("#roleListGrid").data("kendoGrid");
      if (grid) {
        grid.dataSource.filter({
          logic: "or",
          filters: [
            { field: "role", operator: "contains", value: e.value },
            { field: "department", operator: "contains", value: e.value }
          ]
        });
      }
    }
  });
 
  // Initialize tabs
  $("#roleTabs").kendoTabStrip({
    animation: false
  }).data("kendoTabStrip").select(0);

  // Load Role Grid by default
  loadGrid("roleListGrid", "users");

  function loadGrid(gridId, type) {
    // Destroy existing grid if it exists
    const gridElement = $(`#${gridId}`);
    const existingGrid = gridElement.data("kendoGrid");
    if (existingGrid) {
      existingGrid.destroy();
      gridElement.empty();
    }

    // Load JSON and initialize grid
    $.getJSON(`../../assets/data/${type}.json`, function (data) {
      const columns = getColumnsForType(type);
      
      gridElement.kendoGrid({
        dataSource: {
          data: data,
          pageSize: 10,
          schema: {
            model: {
              id: "id",
              fields: getFieldsForType(type)
            }
          }
        },
        sortable: true,
        filterable: true,
        pageable: {
          refresh: true,
          pageSizes: [10, 20, 50],
          buttonCount: 5
        },
        columns: columns,
        toolbar: ["create"],
        editable: "popup",
        reorderable: true,
        groupable: true,
        columnMenu: true,
        selectable: "row",
        scrollable: true,
        height: "100%"
      });
    });
  }

  function getColumnsForType(type) {
    switch(type) {
      case "users":
        return [
          { 
            field: "role", 
            title: "Role", 
            width: "30%",
            headerAttributes: { style: "font-weight: bold; background-color: #f5f5f5;" }
          },
          { 
            field: "department", 
            title: "Department", 
            width: "30%",
            headerAttributes: { style: "font-weight: bold; background-color: #f5f5f5;" }
          },
          { 
            command: ["edit", "destroy"],
            title: "Actions",
            width: 100,
            headerAttributes: { style: "font-weight: bold; background-color: #f5f5f5;" }
          }
        ];
      default:
        return [];
    }
  }

  function getFieldsForType(type) {
    switch(type) {
      case "users":
        return {
          role: { type: "string", validation: { required: true } },
          department: { type: "string", validation: { required: true } }
        };
      default:
        return {};
    }
  }

  // Handle Add Role button click
  $(".k-button").on("click", function() {
    // Add role button click handler
    console.log("Add Role clicked");
  });
});
