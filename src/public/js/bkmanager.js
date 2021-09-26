$('form').submit(function (e) {
	e.preventDefault();
});
function getAllBookingList() {
	$.ajax({
		url: '/manager/list-all-booking',
		method: 'GET',
		success: function (rs) {
			$('#list-recent-appointment').html('');
			$('#list-upcoming-appointment').html('');
			$('#list-completed-appointment').html('');
			$('#list-canceled-appointment').html('');
			for (var key in rs) {
				var rsdate = new Date(rs[key].datetime);
				var today = new Date();

				switch (rs[key].status) {
					case -2:
						var item = `
									<tr>
										<td>${moment(`${rs[key].datetime}`).format('ddd DD/MM/YYYY - HH:mm')}</td>
										<td>${rs[key].customer_fullname}</td>
										<td>${rs[key].customer_phone}</td>
										<td>${rs[key].Service.service_name}</td>
										<td>${rs[key].Staff.staff_fullname}</td>
										<td><span class="badge badge-danger">Cancelled</span></td>
										<td><button type="button" class="btn btn-light" data-toggle="modal" data-target="#reviewModal" value="${
											rs[key]._id
										}"
										onclick="viewDetail(this.value)">
										<i class="fas fa-ellipsis-h"></i></button></td>
									</tr>
							`;
						$('#list-canceled-appointment').append(item);
						break;
					case -1:
						var item = `
									<tr>
										<td>${moment(`${rs[key].datetime}`).format('ddd DD/MM/YYYY - HH:mm')}</td>
										<td>${rs[key].customer_fullname}</td>
										<td>${rs[key].customer_phone}</td>
										<td>${rs[key].Service.service_name}</td>
										<td>${rs[key].Staff.staff_fullname}</td>
										<td><span class="badge badge-danger">Pending</span></td>
										<td><button type="button" class="btn btn-light" data-toggle="modal" data-target="#reviewModal" value="${
											rs[key]._id
										}"
										onclick="viewDetail(this.value)">
										<i class="fas fa-ellipsis-h"></i></button></td>
									</tr>
							`;
						$('#list-recent-appointment').append(item);
						break;
					case 1:
						var item = `
									<tr>
										<td>${moment(`${rs[key].datetime}`).format('ddd DD/MM/YYYY - HH:mm')}</td>
										<td>${rs[key].customer_fullname}</td>
										<td>${rs[key].customer_phone}</td>
										<td>${rs[key].Service.service_name}</td>
										<td>${rs[key].Staff.staff_fullname}</td>
										<td><span class="badge badge-success">Pending</span></td>
										<td><button type="button" class="btn btn-light" data-toggle="modal" data-target="#reviewModal" value="${
											rs[key]._id
										}"
										onclick="viewDetail(this.value)">
										<i class="fas fa-ellipsis-h"></i></button></td>
									</tr>
							`;
						$('#list-recent-appointment').append(item);
						break;
					case 2:
						if (rsdate <= today) {
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
								$('#list-completed-appointment').prepend(item);
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
								$('#list-completed-appointment').prepend(item);
							}
						} else if (rsdate > today) {
							if (rsdate.toDateString() == today.toDateString()) {
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
			}
		},
	});
}
getAllBookingList();
function findByPhone() {
	if ($('#customer-phone').val() == '') {
		return false;
	} else {
		$.ajax({
			url: '/manager/find-by-phone',
			method: 'GET',
			data: {
				customer_phone: $('#customer-phone').val(),
			},
			success: function (rs) {
				$('#list-recent-appointment').html('');
				$('#list-upcoming-appointment').html('');
				$('#list-completed-appointment').html('');
				$('#list-canceled-appointment').html('');
				for (var key in rs) {
					var rsdate = new Date(rs[key].datetime);
					var today = new Date();
					switch (rs[key].status) {
						case -2:
							var item = `
										<tr>
											<td>${moment(`${rs[key].datetime}`).format('ddd DD/MM/YYYY - HH:mm')}</td>
											<td>${rs[key].customer_fullname}</td>
											<td>${rs[key].customer_phone}</td>
											<td>${rs[key].Service.service_name}</td>
											<td>${rs[key].Staff.staff_fullname}</td>
											<td><span class="badge badge-danger">Cancelled</span></td>
											<td><button type="button" class="btn btn-light" data-toggle="modal" data-target="#reviewModal" value="${
												rs[key]._id
											}"
											onclick="viewDetail(this.value)">
											<i class="fas fa-ellipsis-h"></i></button></td>
										</tr>
								`;
							$('#list-canceled-appointment').append(item);
							break;
						case -1:
							var item = `
										<tr>
											<td>${moment(`${rs[key].datetime}`).format('ddd DD/MM/YYYY - HH:mm')}</td>
											<td>${rs[key].customer_fullname}</td>
											<td>${rs[key].customer_phone}</td>
											<td>${rs[key].Service.service_name}</td>
											<td>${rs[key].Staff.staff_fullname}</td>
											<td><span class="badge badge-danger">Pending</span></td>
											<td><button type="button" class="btn btn-light" data-toggle="modal" data-target="#reviewModal" value="${
												rs[key]._id
											}"
											onclick="viewDetail(this.value)">
											<i class="fas fa-ellipsis-h"></i></button></td>
										</tr>
								`;
							$('#list-recent-appointment').append(item);
							break;
						case 1:
							var item = `
										<tr>
											<td>${moment(`${rs[key].datetime}`).format('ddd DD/MM/YYYY - HH:mm')}</td>
											<td>${rs[key].customer_fullname}</td>
											<td>${rs[key].customer_phone}</td>
											<td>${rs[key].Service.service_name}</td>
											<td>${rs[key].Staff.staff_fullname}</td>
											<td><span class="badge badge-success">Pending</span></td>
											<td><button type="button" class="btn btn-light" data-toggle="modal" data-target="#reviewModal" value="${
												rs[key]._id
											}"
											onclick="viewDetail(this.value)">
											<i class="fas fa-ellipsis-h"></i></button></td>
										</tr>
								`;
							$('#list-recent-appointment').append(item);
							break;
						case 2:
							if (rsdate <= today) {
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
									$('#list-completed-appointment').prepend(item);
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
									$('#list-completed-appointment').prepend(item);
								}
							} else if (rsdate > today) {
								if (rsdate.toDateString() == today.toDateString()) {
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
				}
			},
		});
	}
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
function addAppointment() {
	$('#bookingForm').prop('disabled', false);
	$('input, select').css({
		border: '1px solid #ced4da',
	});
	$('#cancel-btn').hide();
	$('#pending-msg').hide();
	$('#approve-btn').hide();
	$('#cancelled').hide();
	$('#cancelled-btn').hide();
	$('#cancelling').hide();
	$('#ratingForm').hide();
	$('#datetime-view').hide();
	$('#date-time').show();
	$('#create-btn').show();
	$('#update-btn').hide();
	$('#delete-btn').hide();
	$('#edit-btn').hide();
	$('#service_id').html(
		`<option disabled hidden selected value="">Choose service</option>`
	);
	$('#staff_id').html(
		`<option disabled hidden selected value="">Choose staff</option>`
	);
	getService();
	getStaff();
}
function createAppointment() {
	var data = {
		customer_fullname: $('#customer_fullname').val(),
		customer_phone: $('#customer_phone').val(),
		customer_email: $('#customer_email').val(),
		customer_address: $('#customer_address').val(),
		service_id: $('#service_id').val(),
		staff_id: $('#staff_id').val(),
		datetime: $('#datetime').val(),
		status: 1,
	};
	$.ajax({
		url: '/manager/booking',
		method: 'POST',
		data: data,
		success: function (rs) {
			alert(rs);
			location.reload();
		},
	});
}
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
// Disable form submissions if there are invalid fields
(function () {
	'use strict';
	window.addEventListener(
		'load',
		function () {
			// Get the forms we want to add validation styles to
			var forms = document.getElementsByClassName('needs-validation');
			// Loop over them and prevent submission
			var validation = Array.prototype.filter.call(forms, function (form) {
				form.addEventListener(
					'submit',
					function (event) {
						if (form.checkValidity() === false) {
							event.preventDefault();
							event.stopPropagation();
						}
						form.classList.add('was-validated');
					},
					false
				);
			});
		},
		false
	);
})();
