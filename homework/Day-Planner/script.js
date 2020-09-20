//Time
var ampm = 0;
$("document").ready(function () {
  var hour = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
  ];
  var scheduleColumn;
  for (index = 1; index < hour.length; index++) {
    addingTimeRows(index, hour[index]);
  }

  function addingTimeRows(hour) {
    var dailyHour = hour > 12 ? hour - 12 : hour;
    var ampm = hour >= 12 ? "pm" : "am";
    var currentHour = moment().format("H");
    var hoursColumn = $("<div class='col-lg-8 timeCol'></div>").text(
      dailyHour + ":00" + " " + ampm
    );
    scheduleColumn = $(
      `<div class='col-sm-6 schedule' id='${
        hour + "a"
      }'><input class="col-md-12 inputText"></div>`
    );
    var saveColumn = $(
      `<div class="col-sm-2" id="save"><button type="button" class="btn btn-info" id='${
        hour + "b"
      }'><i class="fas fa-lock"></i></button></div>`
    );
    // adding rows to the html for time slots
    var addRow = $(`<div class='row' id='${hour}'></div>`).append(
      hoursColumn,
      scheduleColumn,
      saveColumn
    );
    $(".container").append(addRow);

    // setting the row color based on the current time
    if (hour == currentHour) {
      $("#" + hour).css("background-color", "#ff6961");
    } else if (hour < currentHour) {
      $("#" + hour).css("background-color", "#d3d3d3");
    } else {
      $("#" + hour).css("background-color", "#77dd77");
    }

    // getting the local storage information
    var savedText = window.localStorage.getItem(hour + "a");
    if (savedText !== undefined) {
      $("#" + hour + "a input").val(savedText);
    }
  }

  // setting key value pairs to local storage
  $(".btn").on("click", function () {
    var buttonId = $(this).attr("id");
    var textId = buttonId.replace("b", "a");
    var textContent = $("#" + textId).children()[0].value;
    localStorage.setItem(textId, textContent);
  });
});

function todaysDate() {
  var todaysDate = moment().format("dddd, MMMM Do, YYYY");
  $("#currentDay").text(todaysDate);
}
todaysDate();
