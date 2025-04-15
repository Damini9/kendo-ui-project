$(document).ready(function () {
  // Initialize search box
  $("#searchUsersBar").kendoSearchBox({
    placeholder: "Search users...",
    size: "medium",
    rounded: "medium",
    clearButton: true,
    search: function (e) {
      const grid = $("#grid-users").data("kendoGrid");
      if (grid) {
        grid.dataSource.filter({
          logic: "or",
          filters: [
            { field: "username", operator: "contains", value: e.value },
            { field: "email", operator: "contains", value: e.value },
            { field: "role", operator: "contains", value: e.value },
          ],
        });
      }
    },
  });

  // Initialize grid
  $("#grid-users").kendoGrid({
    dataSource: {
      transport: {
        read: {
          url: "../../assets/data/users.json",
          dataType: "json",
          type: "GET",
        },
      },
      schema: {
        model: {
          id: "id",
          fields: {
            id: { type: "number", editable: false },
            username: { type: "string", validation: { required: true } },
            email: { type: "string", validation: { required: true } },
            role: { type: "string", validation: { required: true } },
            status: { type: "string", validation: { required: true } },
            lastLogin: { type: "date", editable: false },
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
    columns: [
      { field: "id", title: "ID", width: 80 },
      { field: "username", title: "Username", width: 150 },
      { field: "email", title: "Email", width: 200 },
      { field: "role", title: "Role", width: 120 },
      { field: "status", title: "Status", width: 120 },
      {
        field: "lastLogin",
        title: "Last Login",
        width: 150,
        format: "{0:MM/dd/yyyy HH:mm}",
      },
      { command: ["edit", "destroy"], title: "Actions", width: 200 },
    ],
    editable: "popup",
  });

  // Add User Button Click Handler
  $("#addUserBtn").click(function () {
    const grid = $("#grid-users").data("kendoGrid");
    grid.addRow();
  });

  // Export Users Button Click Handler
  $("#exportUsersBtn").click(function () {
    const grid = $("#grid-users").data("kendoGrid");
    grid.saveAsExcel();
  });
});
