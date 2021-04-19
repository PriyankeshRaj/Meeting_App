function toggleSidebar() {
	document.getElementById("sidebar").classList.toggle("active");
}

// function loadAboutMe() {
// 	$.ajax({
// 		url: "",
// 		success: function (data) {
// 			$("#other").html(data);
// 		},
// 	});
// }
// $(function () {
// 	$(".nav-placeholder").load("nav.html");
// });
function Meeting(
	meetingName,
	no_of_people_attending,
	date,
	startTime,
	endTime
) {
	this.meetingName = meetingName;
	this.no_of_people_attending = no_of_people_attending;
	this.date = date;
	this.startTime = startTime;
	this.endTime = endTime;
}
// Add
function Display() {}
Display.prototype.add = function (meeting) {
	console.log("Adding to UI");
	id = document.getElementById("table_id").rows.length;
	console.log(id);
	console.log("id=", id);
	table = document.getElementById("table_id");
	let uiString = `
                        <tr>
                            <td>${id}</td>
							<td>${meeting.meetingName}</td>
							<td>${meeting.no_of_people_attending}</td>
							<td>${meeting.date}</td>
							<td>${meeting.startTime}</td>
							<td>${meeting.endTime}</td>
							<td><i class="fa fa-trash" onclick="deleteRow(this)"></i></td>
						</tr>`;
	table.innerHTML += uiString;
	id = id + 1;
};
Display.prototype.clear = function () {
	document.getElementById("meetingName").value = "";
	document.getElementById("no_of_people_attending").value = "";
	document.getElementById("date").value = "";
	document.getElementById("startTime").value = "";
	document.getElementById("endTime").value = "";
};
function add() {
	console.log("Add button pressed");
	let meetingName = document.getElementById("meetingName").value;
	let no_of_people_attending = document.getElementById("no_of_people_attending")
		.value;
	let date = document.getElementById("date").value;
	let startTime = document.getElementById("startTime").value;
	let endTime = document.getElementById("endTime").value;
	let meeting = new Meeting(
		meetingName,
		no_of_people_attending,
		date,
		startTime,
		endTime
	);
	console.log(meeting);
	let display = new Display();
	let empty = false;
	if (
		isEmpty(meetingName) ||
		isEmpty(no_of_people_attending) ||
		isEmpty(date) ||
		isEmpty(startTime) ||
		isEmpty(endTime)
	) {
		console.log("meetingName=", meetingName);
		console.log("no_of_people_attending=", no_of_people_attending);
		console.log("date=", date);
		console.log("startTime=", startTime);
		console.log("endTime=", endTime);
		alert("Please input all the values");
		empty = true;
	}
	if (empty) display.clear();
	else {
		display.add(meeting);
		display.clear();
	}
}
function isEmpty(value) {
	return value == null || value === "";
}
// Search
function searchTable() {
	var input, filter, table, tr, td, i, txtValue, from, to, date;
	input = document.getElementById("search_input");
	filter = input.value.toUpperCase();
	from = document.getElementById("from").value;
	to = document.getElementById("to").value;
	table = document.getElementById("table_id");
	tr = table.getElementsByTagName("tr");
	// console.log("from=", from, "\nto=", to);
	// Loop through all table rows, and hide those who don't match the search query
	// console.log(isEmpty(from), isEmpty(to));
	// console.log(filter);
	if (isEmpty(from) && isEmpty(to)) {
		for (i = 1; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td")[1];
			// console.log("tr=", tr[i]);
			if (td) {
				txtValue = td.textContent || td.innerText;
				if (txtValue.toUpperCase().indexOf(filter) > -1) {
					tr[i].style.display = "";
				} else {
					tr[i].style.display = "none";
				}
			}
		}
	}
	if (from && to) {
		from = new Date(from);
		to = new Date(to);
		for (i = 1; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td")[1];
			date = new Date(tr[i].getElementsByTagName("td")[3].textContent);
			if (td) {
				if (from <= date && to >= date) {
					tr[i].style.display = "";
				} else {
					tr[i].style.display = "none";
				}
			}
		}
	}
	if (filter && from && to) {
		from = new Date(from);
		to = new Date(to);
		for (i = 1; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td")[1];
			date = new Date(tr[i].getElementsByTagName("td")[3].textContent);
			if (td) {
				txtValue = td.textContent || td.innerText;
				if (
					txtValue.toUpperCase().indexOf(filter) > -1 &&
					from <= date &&
					to >= date
				) {
					tr[i].style.display = "";
				} else {
					tr[i].style.display = "none";
				}
			}
		}
	}
}
function deleteRow(row) {
	var i = row.parentNode.parentNode.rowIndex;
	document.getElementById("table_id").deleteRow(i);
}
