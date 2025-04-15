$(document).ready(function () {
  $("#securityTabstrip")
    .kendoTabStrip({
      animation: { open: { effects: "fadeIn" } },
      activate: function (e) {
        const contentId = $(e.contentElement).attr("id");
        if (contentId === "tab-users") {
          loadTabContent("tab-users", "users.html");
        } else if (contentId === "tab-user-management") {
          loadTabContent("tab-user-management", "user-management.html");
        } else if (contentId === "tab-role-management") {
          loadTabContent("tab-role-management", "role-management.html");
        }
      },
    })
    .data("kendoTabStrip")
    .select(0);

  function loadTabContent(containerId, fileName) {
    $(`#${containerId}`).load(`views/secuirty/${fileName}`);
  }
});
