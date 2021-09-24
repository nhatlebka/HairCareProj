function approve() {
	$.ajax({
		type: 'PUT',
		url: '/manager/approve',
		data: {
			_id: $('#_id').val(),
			status: 2,
		},
		success: function (rs) {
			alert(rs);
			location.reload();
		},
	});
}
function cancelAppointment() {
	$.ajax({
		type: 'PUT',
		url: '/manager/cancel',
		data: {
			_id: $('#_id').val(),
			status: -2,
		},
		success: function (rs) {
			alert(rs);
			location.reload();
		},
	});
}
function editable() {
	$('#bookingForm').prop('disabled', false);
	$('input, select').css({
		border: '1px solid #ced4da',
	});
	$('#datetime-view').hide();
	$('#date-time').show();
	$('#update-btn').show();
	$('#edit-btn').hide();
	$('#cancel-btn').hide();
	$('#ratingForm').hide();
	$('#cancelled').hide();
	$('#cancelling').hide();
	$('#pending-msg').hide();
	$('#approve-btn').hide();
	$('#delete-btn').hide();
	$('#cancelled-btn').hide();
	$('#service_id').html(
		`<option disabled hidden selected value="">Choose service</option>`
	);
	$('#staff_id').html(
		`<option disabled hidden selected value="">Choose staff</option>`
	);
	getService();
	getStaff();
}
function getService() {
	$.ajax({
		url: '/manager/get-service',
		method: 'GET',
		success: function (rs) {
			for (var key in rs) {
				var option = `
                                    <option value="${rs[key]._id}">${rs[key].service_name}</option>
                                    `;
				$('#service_id').append(option);
			}
		},
	});
}
function getStaff() {
	$.ajax({
		url: '/manager/get-staff',
		method: 'GET',
		success: function (rs) {
			for (var key in rs) {
				var option = `
                                    <option value="${rs[key]._id}">${rs[key].staff_fullname}</option>
                                    `;
				$('#staff_id').append(option);
			}
		},
	});
}
function submitRating() {
	$('.rated').show();
	$('.star-text').hide();
	for (i = 0; i < document.getElementsByName('rating').length; i++) {
		if (document.getElementsByName('rating')[i].checked == true) {
			var ratingValue = document.getElementsByName('rating')[i].value;
			break;
		}
	}
	$.ajax({
		type: 'PUT',
		url: '/manager/update',
		data: {
			_id: $('#_id').val(),
			comment: $('#txtArea').val(),
			rating: ratingValue,
		},
		success: function (rs) {
			alert(rs);
			location.reload();
		},
	});
}
function deleteAppointment() {
	$.ajax({
		type: 'DELETE',
		url: '/manager/delete',
		data: {
			_id: $('#_id').val(),
		},
		success: function (rs) {
			alert(rs);
			location.reload();
		},
	});
}
function update() {
	var data = {
		customer_fullname: $('#customer_fullname').val(),
		customer_phone: $('#customer_phone').val(),
		customer_email: $('#customer_email').val(),
		customer_address: $('#customer_address').val(),
		service_id: $('#service_id').val(),
		staff_id: $('#staff_id').val(),
		datetime: $('#datetime').val(),
		_id: $('#_id').val(),
		status: 1,
	};
	$.ajax({
		type: 'PUT',
		url: '/manager/update',
		data: data,
		success: function (rs) {
			alert(rs);
			location.reload();
		},
	});
}
function viewDetail(value) {
	$.ajax({
		type: 'GET',
		url: '/manager/find-by-id',
		data: {
			_id: value,
		},
		success: function (rs) {
			$('#customer_fullname').html('');
			$('#customer_phone').html('');
			$('#customer_email').html('');
			$('#customer_address').html('');
			$('#service_id').html('');
			$('#staff_id').html('');
			$('#datetimeView').html('');
			$('#datetime').html('');
			document.getElementById('customer_fullname').value =
				rs[0].customer_fullname;
			document.getElementById('customer_phone').value = rs[0].customer_phone;
			document.getElementById('customer_email').value = rs[0].customer_email;
			document.getElementById('customer_address').value =
				rs[0].customer_address;
			document.getElementById(
				'service_id'
			).innerHTML = `<option value="" selected>${rs[0].Service.service_name}</option>`;
			document.getElementById(
				'staff_id'
			).innerHTML = `<option value="" selected>${rs[0].Staff.staff_fullname}</option>`;
			document.getElementById('datetimeView').innerHTML = `<b>${moment(
				`${rs[0].datetime}`
			).format('ddd DD/MM/YYYY - HH:mm')}</b>`;
			document.getElementById('datetime').value = rs[0].datetime;
			document.getElementById('_id').value = rs[0]._id;
			viewOnly(rs[0].datetime, rs[0].status, rs[0].rating);
		},
	});
}
function viewOnly(datetime, status, rating) {
	$('#create-btn').hide();
	$('input, select').css({
		border: 'none',
	});
	$('#bookingForm').prop('disabled', true);
	$('#datetime-view').show();
	$('#date-time').hide();
	var bookdate = new Date(datetime);
	var now = new Date();

	switch (status) {
		case -2:
			$('#cancelled').show();
			$('#cancelling').hide();
			$('#pending-msg').hide();
			$('#edit-btn').hide();
			$('#update-btn').hide();
			$('#approve-btn').hide();
			$('#delete-btn').hide();
			$('#cancel-btn').hide();
			$('#cancelled-btn').hide();
			$('#ratingForm').hide();
			break;
		case -1:
			$('#cancelling').show();
			$('#cancelled-btn').show();
			$('#cancelled').hide();
			$('#pending-msg').hide();
			$('#edit-btn').hide();
			$('#update-btn').hide();
			$('#approve-btn').hide();
			$('#delete-btn').hide();
			$('#cancel-btn').hide();
			$('#ratingForm').hide();
			break;
		case 1:
			$('#pending-msg').show();
			$('#edit-btn').show();
			$('#delete-btn').show();
			$('#approve-btn').show();
			$('#cancelling').hide();
			$('#cancelled-btn').hide();
			$('#cancelled').hide();
			$('#update-btn').hide();
			$('#cancel-btn').hide();
			$('#ratingForm').hide();
			break;
		case 2:
			if (bookdate <= now) {
				if (rating <= 0) {
					$('#ratingForm').show();
					$('#cancelled').hide();
					$('#cancelling').hide();
					$('#pending-msg').hide();
					$('#edit-btn').hide();
					$('#update-btn').hide();
					$('#approve-btn').hide();
					$('#delete-btn').hide();
					$('#cancel-btn').hide();
					$('#cancelled-btn').hide();
					$('#ratingForm fieldset').prop('disabled', false);
					$('.rated').hide();
					$('.star-text').show();
					$('input[name="rating"]').prop('checked', false);
				}
				if (rating > 0) {
					$('#ratingForm').show();
					$('#cancelled').hide();
					$('#cancelling').hide();
					$('#pending-msg').hide();
					$('#edit-btn').hide();
					$('#update-btn').hide();
					$('#approve-btn').hide();
					$('#delete-btn').hide();
					$('#cancel-btn').hide();
					$('#cancelled-btn').hide();
					$('.star-text').hide();
					$('#ratingForm fieldset').prop('disabled', true);
					var check = `#rate-${rating}`;
					$('.rated').show();
					$(`${check}`).prop('checked', true);
				}
			} else if (bookdate > now) {
				$('#edit-btn').show();
				$('#cancel-btn').show();
				$('#ratingForm').hide();
				$('#cancelled').hide();
				$('#cancelling').hide();
				$('#pending-msg').hide();
				$('#update-btn').hide();
				$('#approve-btn').hide();
				$('#delete-btn').hide();
				$('#cancelled-btn').hide();
			}
			break;

		default:
			break;
	}
}
function getAllBookingList() {
	$.ajax({
		url: '/manager/list-all-booking',
		method: 'GET',
		success: function (rs) {
			$('#list-recent-appointment').html('');
			$('#list-upcoming-appointment').html('');
			$('#list-completed-appointment').html('');
			$('#list-canceled-appointment').html('');
			var todayCount = 0;
			var completedCount = 0;
			var upcomingCount = 0;
			var pendingCount = 0;
			var cancelledCount = 0;
			var bookingCount = rs.length;
			$('#bookingCount').html(bookingCount);
			for (var key in rs) {
				var rsdate = new Date(rs[key].datetime);
				var today = new Date();
				switch (rs[key].status) {
					case -2:
						cancelledCount += 1;
						break;
					case -1:
						var item = `
                                                        <tr>
                                                            <td>${moment(
																															`${rs[key].datetime}`
																														).format(
																															'ddd DD/MM/YYYY - HH:mm'
																														)}</td>
                                                            <td>${
																															rs[key]
																																.customer_fullname
																														}</td>
                                                            <td>${
																															rs[key]
																																.customer_phone
																														}</td>
                                                            <td>${
																															rs[key].Service
																																.service_name
																														}</td>
                                                            <td>${
																															rs[key].Staff
																																.staff_fullname
																														}</td>
                                                            <td><span class="badge badge-danger">Pending</span></td>
                                                            <td><button type="button" class="btn btn-light" data-toggle="modal" data-target="#reviewModal" value="${
																															rs[key]._id
																														}"
                                                            onclick="viewDetail(this.value)">
                                                            <i class="fas fa-ellipsis-h"></i></button></td>
                                                        </tr>
                                                `;
						$('#list-recent-appointment').append(item);
						todayCount += 1;
						pendingCount += 1;
						break;
					case 1:
						var item = `
                                                        <tr>
                                                            <td>${moment(
																															`${rs[key].datetime}`
																														).format(
																															'ddd DD/MM/YYYY - HH:mm'
																														)}</td>
                                                            <td>${
																															rs[key]
																																.customer_fullname
																														}</td>
                                                            <td>${
																															rs[key]
																																.customer_phone
																														}</td>
                                                            <td>${
																															rs[key].Service
																																.service_name
																														}</td>
                                                            <td>${
																															rs[key].Staff
																																.staff_fullname
																														}</td>
                                                            <td><span class="badge badge-success">Pending</span></td>
                                                            <td><button type="button" class="btn btn-light" data-toggle="modal" data-target="#reviewModal" value="${
																															rs[key]._id
																														}"
                                                            onclick="viewDetail(this.value)">
                                                            <i class="fas fa-ellipsis-h"></i></button></td>
                                                        </tr>
                                                `;
						$('#list-recent-appointment').append(item);
						todayCount += 1;
						pendingCount += 1;
						break;
					case 2:
						if (rsdate <= today) {
							completedCount += 1;
							if (rs[key].rating <= 0) {
								var item = `
												<tr>
													<td>${moment(`${rs[key].datetime}`).format('ddd DD/MM/YYYY - HH:mm')}</td>
													<td>${rs[key].customer_fullname}</td>
													<td>${rs[key].customer_phone}</td>
													<td>${rs[key].Service.service_name}</td>
													<td>${rs[key].Staff.staff_fullname}</td>
													<td><span class="badge badge-secondary">none Rated</span></td>
													<td><button type="button" class="btn btn-light" data-toggle="modal" data-target="#reviewModal" value="${
														rs[key]._id
													}"
													onclick="viewDetail(this.value)">
													<i class="fas fa-ellipsis-h"></i></button></td>
												</tr>
											`;
								$('#list-completed-appointment').append(item);
							} else if (rs[key].rating > 0) {
								var item = `
												<tr>
													<td>${moment(`${rs[key].datetime}`).format('ddd DD/MM/YYYY - HH:mm')}</td>
													<td>${rs[key].customer_fullname}</td>
													<td>${rs[key].customer_phone}</td>
													<td>${rs[key].Service.service_name}</td>
													<td>${rs[key].Staff.staff_fullname}</td>
													<td><span class="badge badge-warning">Rated</span></td>
													<td><button type="button" class="btn btn-light" data-toggle="modal" data-target="#reviewModal" value="${
														rs[key]._id
													}"
													onclick="viewDetail(this.value)">
													<i class="fas fa-ellipsis-h"></i></button></td>
												</tr>
											`;
								$('#list-completed-appointment').append(item);
							}
						} else if (rsdate > today) {
							upcomingCount += 1;
							if (rsdate.toDateString() == today.toDateString()) {
								todayCount += 1;
								var item = `
													<tr>
														<td>${moment(`${rs[key].datetime}`).format('ddd DD/MM/YYYY - HH:mm')}</td>
														<td>${rs[key].customer_fullname}</td>
														<td>${rs[key].customer_phone}</td>
														<td>${rs[key].Service.service_name}</td>
														<td>${rs[key].Staff.staff_fullname}</td>
														<td><span class="badge badge-warning">Approve</span></td>
														<td><button type="button" class="btn btn-light" data-toggle="modal" data-target="#reviewModal" value="${
															rs[key]._id
														}"
														onclick="viewDetail(this.value)">
														<i class="fas fa-ellipsis-h"></i></button></td>
													</tr>
											`;
								$('#list-recent-appointment').append(item);
							}
							if (rsdate.toDateString() != today.toDateString()) {
								var item = `
														<tr>
															<td>${moment(`${rs[key].datetime}`).format('ddd DD/MM/YYYY - HH:mm')}</td>
															<td>${rs[key].customer_fullname}</td>
															<td>${rs[key].customer_phone}</td>
															<td>${rs[key].Service.service_name}</td>
															<td>${rs[key].Staff.staff_fullname}</td>
															<td><span class="badge badge-warning">Approve</span></td>
															<td><button type="button" class="btn btn-light" data-toggle="modal" data-target="#reviewModal" value="${
																rs[key]._id
															}"
															onclick="viewDetail(this.value)">
															<i class="fas fa-ellipsis-h"></i></button></td>
														</tr>
												`;
								$('#list-upcoming-appointment').append(item);
							}
						}
						break;

					default:
						break;
				}
				$('#todayCount').html(todayCount);
				$('#completedCount').html(
					`Compeleted appointment <b>${completedCount}/${bookingCount} (${(
						(completedCount / bookingCount) *
						100
					).toFixed(2)}%)</b>`
				);
				$('#upcomingCount').html(
					`Upcoming appointment <b>${upcomingCount}/${bookingCount} (${(
						(upcomingCount / bookingCount) *
						100
					).toFixed(2)}%)</b>`
				);
				$('#pendingCount').html(
					`Pending appointment <b>${pendingCount}/${bookingCount} (${(
						(pendingCount / bookingCount) *
						100
					).toFixed(2)}%)</b>`
				);
				$('#cancelledCount').html(
					`Cancelled appointment <b>${cancelledCount}/${bookingCount} (${(
						(cancelledCount / bookingCount) *
						100
					).toFixed(2)}%)</b>`
				);
			}

			counter.push(completedCount);
			counter.push(upcomingCount);
			counter.push(pendingCount);
			counter.push(cancelledCount);
		},
	});
}
var servicesChart = new Chart(document.getElementById('servicesChart'), {
	type: 'line',
	data: {
		labels: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		],
		datasets: [
			{
				label: 'Haircut/Styling',
				data: [100, 60, 120, 80, 140, 100, 140, 120, 140, 100, 140, 160],
				borderColor: '#00BD24',
				fill: false,
				// cubicInterpolationMode: 'monotone',
				tension: 0.2,
			},
			{
				label: 'Professional Shampoo / Scalp Massage',
				data: [80, 40, 20, 60, 120, 60, 100, 60, 70, 90, 70, 100, 150],
				borderColor: '#1DCECF',
				fill: false,
				tension: 0.2,
			},
			{
				label: 'Steaming/Nourishing/Restoring Hair',
				data: [60, 60, 30, 90, 45, 90, 45, 50, 60, 80, 105, 125, 145],
				borderColor: '#FE9320',
				fill: false,
				tension: 0.2,
			},
			{
				label: 'Hair Fashion (Extension/Curling/Straighten/Dying)',
				data: [40, 80, 40, 120, 60, 88, 44, 100, 40, 60, 90, 110, 160],
				borderColor: '#2D96FF',
				fill: false,
				tension: 0.2,
			},
			{
				label: 'Treatment of Hair Diseases',
				data: [20, 100, 50, 50, 75, 100, 80, 75, 100, 125, 100, 120, 150],
				borderColor: '#FF4A6D',
				fill: false,
				tension: 0.2,
			},
		],
	},
	options: {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: 'Growth chart of statistical services by month',
				font: {
					weight: 'bold',
					size: 24,
				},
			},
		},
		interaction: {
			intersect: false,
		},
		scales: {
			x: {
				display: true,
				title: {
					display: true,
				},
			},
			y: {
				display: true,
				title: {
					display: true,
					text: 'Value',
				},
				suggestedMin: 0,
				suggestedMax: 200,
			},
		},
	},
});
var counter = [];
getAllBookingList();
var bookingChart = new Chart(document.getElementById('bookingChart'), {
	type: 'pie',
	data: {
		labels: ['Completed', 'Upcoming', 'Pending', 'Cancelled'],
		datasets: [
			{
				label: 'My First Dataset',
				data: counter,
				backgroundColor: [
					'rgb(253, 208, 87)',
					'rgb(65, 159, 235)',
					'rgb(74, 191, 192)',
					'rgb(255, 101, 131)',
				],
				hoverOffset: 4,
			},
		],
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
				position: 'bottom',
				labels: {
					font: {
						size: 24,
					},
				},
			},
		},
	},
});

var beChart = new Chart(document.getElementById('beChart'), {
	type: 'radar',
	data: {
		labels: [
			'Eating',
			'Drinking',
			'Sleeping',
			'Designing',
			'Coding',
			'Cycling',
			'Running',
		],
		datasets: [
			{
				label: 'My First Dataset',
				data: [65, 59, 90, 81, 56, 55, 40],
				fill: true,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgb(255, 99, 132)',
				pointBackgroundColor: 'rgb(255, 99, 132)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgb(255, 99, 132)',
			},
			{
				label: 'My Second Dataset',
				data: [28, 48, 40, 19, 96, 27, 100],
				fill: true,
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderColor: 'rgb(54, 162, 235)',
				pointBackgroundColor: 'rgb(54, 162, 235)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgb(54, 162, 235)',
			},
		],
	},
	options: {
		elements: {
			line: {
				borderWidth: 3,
			},
		},
	},
});

var feChart = new Chart(document.getElementById('feChart'), {
	type: 'radar',
	data: {
		labels: [
			'Eating',
			'Drinking',
			'Sleeping',
			'Designing',
			'Coding',
			'Cycling',
			'Running',
		],
		datasets: [
			{
				label: 'My First Dataset',
				data: [65, 59, 90, 81, 56, 55, 40],
				fill: true,
				backgroundColor: 'rgba(74, 191, 192, 0.2)',
				borderColor: 'rgb(74, 191, 192)',
				pointBackgroundColor: 'rgb(74, 191, 192)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgb(74, 191, 192)',
			},
			{
				label: 'My Second Dataset',
				data: [60, 80, 50, 70, 96, 77, 100],
				fill: true,
				backgroundColor: 'rgba(253, 208, 87, 0.2)',
				borderColor: 'rgb(253, 208, 87)',
				pointBackgroundColor: 'rgb(253, 208, 87)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgb(253, 208, 87)',
			},
		],
	},
	options: {
		elements: {
			line: {
				borderWidth: 3,
			},
		},
	},
});
function tabView(evt, tabId) {
	var i, x, tablinks;
	x = document.getElementsByClassName('tabContainer');
	for (i = 0; i < x.length; i++) {
		x[i].style.display = 'none';
	}
	tablinks = document.getElementsByClassName('tablink');
	for (i = 0; i < x.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(
			' w3-border-black',
			''
		);
	}
	document.getElementById(tabId).style.display = 'block';
	evt.currentTarget.firstElementChild.className += ' w3-border-black';
}
