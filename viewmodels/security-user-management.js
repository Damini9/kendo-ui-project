$(document).ready(function () {
  // Initialize search box
  $("#userSearchBar").kendoSearchBox({
    placeholder: "Search users...",
    size: "medium",
    rounded: "medium",
    clearButton: true,
    search: function (e) {
      const grid = $("#userListGrid").data("kendoGrid");
      grid.dataSource.filter({
        logic: "or",
        filters: [
          { field: "username", operator: "contains", value: e.value },
          { field: "email", operator: "contains", value: e.value }
        ]
      });
    }
  });

  // Initialize tabs
  $("#userTabs").kendoTabStrip({
    animation: false
  }).data("kendoTabStrip") //  Load List Management by default on page load
  .select(0);;

  // Initialize grid
  $("#userListGrid").kendoGrid({
    dataSource: {
      transport: {
        read: {
          url: "../../assets/data/users.json",
          dataType: "json"
        }
      },
      schema: {
        model: {
          fields: {
            username: { type: "string" },
            email: { type: "string" }
          }
        }
      },
      pageSize: 10
    },
    selectable: "row",
    scrollable: true,
    height: "800px",
    columns: [
      {
        field: "username",
        title: "Full Name",
        width: "50%",
        headerAttributes: { style: "font-weight: bold; background-color: #f5f5f5;" }
      },
      {
        field: "email",
        title: "Username",
        width: "50%",
        headerAttributes: { style: "font-weight: bold; background-color: #f5f5f5;" }
      }
    ],
    dataBound: function(e) {
      // Add hover effect to rows
      this.tbody.find("tr").hover(
        function() { $(this).addClass("k-hover"); },
        function() { $(this).removeClass("k-hover"); }
      );
    },
    change: function(e) {
      const selectedRow = this.select();
      if (selectedRow.length) {
        const dataItem = this.dataItem(selectedRow);
        // Handle row selection
        console.log("Selected user:", dataItem);
      }
    }
  });
});
