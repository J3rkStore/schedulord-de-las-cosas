$(function () {
  var gridContainerEl = $("#grid-container");
  var today = dayjs();
  var currentHour = today.format("HH");
  console.log(currentHour);
  var hours = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];

  for (var i = 0; i < hours.length; i++) {
    var hour = hours[i];
    var hourEl = $("<div>");
    hourEl.addClass("row");
    hourEl.addClass("time-block");
    //hourEl.addClass("past");
    hourEl.attr("id", hour + "-hour");
    var colEl = $("<div>");
    colEl.addClass("col-2 col-md-1 hour text-center py-3");
    colEl.text(hour + ":00");
    var textAreaEl = $("<textarea>");
    textAreaEl.addClass("col-8 col-md-10 description");
    textAreaEl.attr("rows", "3");
    textAreaEl.attr("id", "text-" + hour);
    var SvBtnEl = $("<button>");
    SvBtnEl.addClass("btn saveBtn col-2 col-md-1");
    SvBtnEl.attr("id", hour + "btn");
    SvBtnEl.attr("aria-label", "save");
    SvBtnEl.attr("hr", hour);
    var iSvEl = $("<i>");
    iSvEl.addClass("fas fa-save");
    iSvEl.attr("aria-hidden", "true");
    SvBtnEl.append(iSvEl);
    hourEl.append(colEl);
    hourEl.append(textAreaEl);
    hourEl.append(SvBtnEl);
    gridContainerEl.append(hourEl);
    console.log("added hour " + hour);

    if (currentHour > hour) {
      hourEl.addClass("past");
    } else if (currentHour == hour) {
      hourEl.addClass("present");
    } else if (currentHour < hour) {
      hourEl.addClass("future");
    }
  }

  console.log(gridContainerEl);
  var btn15El = $("#15btn");
  btn15El.on("click", function () {
    console.log("you clicked 15");
  });

  for (var i = 0; i < hours.length; i++) {
    var hour = hours[i];
    $("#" + hour + "btn").on("click", function () {
      console.log("you clicked save on number " + this.id);
      var thNu = this.id.replace("btn", "");
      localStorage.setItem(
        "time-" + this.id,
        document.getElementById("text-" + thNu).value
      );
    });
    document.getElementById("text-" + hour).textContent = localStorage.getItem(
      "time-" + hour + "btn"
    );
  }

  document.getElementById("currentDay").textContent =
    "Today is " + today.format("MMM D, YYYY, h:mm:ss");
});
