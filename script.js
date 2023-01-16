// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
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

    //now to add the elements to the DOM
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

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  document.getElementById("currentDay").textContent =
    "Today is " +
    today.format("MMM D, YYYY, h:mm:ss") +
    "current time is " +
    today.format("hh");
});
