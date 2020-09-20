$(document).ready(function () {
  var history = JSON.parse(window.localStorage.getItem("history")) || [];
  if (history.length > 0) {
    currentWeather(history[history.length - -1]);
  }
  for (var i = 0; i < history.length; i++) {
    addingRow(history[i]);
  }

  $("#search-button").on("click", function () {
    var searchCity = $("#search-value").val();
    $("#search-value").val("");
    currentWeather(searchCity);
  });

  $(".list").on("click", "li", function () {
    currentWeather($(this).text());
  });

  function addingRow(text) {
    var group = $("<li>").addClass("list-group-item").text(text);

    $(".list").append(group);
  }
  function Forecast(searchCity) {
    $.ajax({
      type: "GET",
      url:
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        searchCity +
        "&APPID=07e68075023eae8dca48ae956aa9a015&units=imperial",
      dataType: "json",
      success: function (data) {
        $("#weather")
          .html('<h4 class="mt-3">5-Day weather:</h4>')
          .append('<div class="row">');
        for (var i = 0; i < data.list.length; i++) {
          if (data.list[i].dt_txt.indexOf("12:00") !== -1) {
            var title = $("<h2>")
              .addClass("card-title")
              .text(new Date(data.list[i].dt_txt).toLocaleDateString());
            var img = $("<img>").attr(
              "src",
              "http://openweathermap.org/img/w/" +
                data.list[i].weather[0].icon +
                ".png"
            );
            var column = $("<div>").addClass("col-sm-2");
            var box = $("<div>").addClass("card bg-primary text-white");
            var body = $("<div>").addClass("card-body");
            var title = $("<h2>")
              .addClass("card-title")
              .text(new Date(data.list[i].dt_txt).toLocaleDateString());
            var img = $("<img>").attr(
              "src",
              "http://openweathermap.org/img/w/" +
                data.list[i].weather[0].icon +
                ".png"
            );
            var title = $("<h2>");
            var p1 = $("<p>")
              .addClass("card-text")
              .text("Temp: " + data.list[i].main.temp_max + " °F");
            var p2 = $("<p>")
              .addClass("card-text")
              .text("Humidity: " + data.list[i].main.humidity + "%");
            column.append(box.append(body.append(title, img, p1, p2)));
            $("#weather .row").append(column);
          }
        }
      },
    });
  }

  function currentWeather(searchCity) {
    $.ajax({
      type: "GET",

      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        searchCity +
        "&APPID=07e68075023eae8dca48ae956aa9a015&units=imperial",
      dataType: "json",
      success: function (data) {
        if (history.indexOf(searchCity) === -1) {
          history.push(searchCity);
          window.localStorage.setItem("history", JSON.stringify(history));
          addingRow(searchCity);
        }
        var title = $("<h2>")
          .addClass("card-title")
          .text(data.name + " (" + new Date().toLocaleDateString() + ")");
        var box = $("<div>").addClass("card");
        var wind = $("<p>")
          .addClass("card-text")
          .text("Wind Speed: " + data.wind.speed + " MPH");
        var humid = $("<p>")
          .addClass("card-text")
          .text("Humidity: " + data.main.humidity + "%");
        var temp = $("<p>")
          .addClass("card-text")
          .text("Temperature: " + data.main.temp + " °F");
        var bBody = $("<div>").addClass("card-body");
        var img = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
        );
        var info = title.append(img);
        bBody.append(title, temp, humid, wind, info);
        box.append(bBody);
        $("#current").append(box);
        Forecast(searchCity);
        getUVIndex(data.coord.lat, data.coord.lon);
      },
    });
  }
  function getUVIndex(lat, lon) {
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/uvi?appid=07e68075023eae8dca48ae956aa9a015&lat=${lat}&lon=${lon}`,
      dataType: "json",
      success: function (data) {
        var uv = $("<p>").text("UV Index: ");
        var btn = $("<span>").addClass("btn btn-sm").text(data.value);
        $("#current .card-body").append(uv.append(btn));
      },
    });
  }
});
