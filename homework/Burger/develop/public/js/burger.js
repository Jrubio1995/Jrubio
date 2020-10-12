$(function () {
  $(".create-form").on("submit", function (event) {
    event.preventDefault();

    const newBurger = {
      burger_name: $("#newburger").val().trim(),
      devoured: 0,
    };

    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(function () {
      console.log("Adding to new burger list");
      location.reload();
    });
  });

  //Devouring
  $(".eatburger").on("click", function (event) {
    event.preventDefault();

    var id = $(this).data("id");
    var devouring = {
      devoured: 1,
    };

    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: devouring,
    }).then(function () {
      console.log("Burger devoured aka eating");
      location.reload();
    });
  });

  //Removing
  $(".trashburger").on("click", function (event) {
    event.preventDefault();

    var id = $(this).data("id");

    // Deletes from page
    $.ajax({
      type: "DELETE",
      url: "/api/burgers/" + id,
    }).then(location.reload());
  });
});
