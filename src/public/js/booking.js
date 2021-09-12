$('form').submit(function (e) {
	e.preventDefault();
});
function bookingForm() {
	var data = {
		customer_fullname: $('#customer_fullname').val(),
		customer_phone: $('#customer_phone').val(),
		customer_email: $('#customer_email').val(),
		customer_address: $('#customer_address').val(),
		service_id: $('#service_id').val(),
		staff_id: $('#staff_id').val(),
		datetime: $('#datetime').val(),
	};
	$.ajax({
		url: '/booking',
		method: 'POST',
		data: data,
		success: function (rs) {
			window.location = '/thankyou';
		},
	});
	// document.getElementById('bookingForm').submit(data);
}
function autofill() {
	document.getElementById('customer_fullname').value =
		document.getElementById('customer-fullname').value;
	document.getElementById('customer_phone').value =
		document.getElementById('customer-phone').value;
	document.getElementById('customer_email').value =
		document.getElementById('customer-email').value;
	document.getElementById('customer_address').value =
		document.getElementById('customer-address').value;
}

var currentTab = 0;
showTab(currentTab);
function showSubmitBtn() {
	document.getElementById('submitBtn').style.display = 'inline-block';
}
function showTab(n) {
	var x = document.getElementsByClassName('tab');
	x[n].style.display = 'block';
	if (n == 0) {
		document.getElementById('prevBtn').style.display = 'none';
	} else {
		document.getElementById('prevBtn').style.display = 'inline-block';
	}
	if (n == x.length - 1) {
		document.getElementById('nextBtn').innerHTML = 'Next';
		$('a#nextBtn').attr('href', '#bookingForm');
	} else {
		document.getElementById('nextBtn').innerHTML = 'Next';
	}
	fixStepIndicator(n);
}
function fixStepIndicator(n) {
	var i,
		x = document.getElementsByClassName('step');
	for (i = 0; i < x.length; i++) {
		x[i].className = x[i].className.replace(' active', '');
	}
	if (n < 4) {
		x[n].className += ' active';
	} else return;
}

function nextPrev(n) {
	var x = document.getElementsByClassName('tab');
	if (n == 1 && !validateForm()) return false;
	x[currentTab].style.display = 'none';
	currentTab = currentTab + n;
	// if (currentTab >= x.length) {
	//     document.getElementById('bookingForm').submit();
	//     return false;
	// }
	showTab(currentTab);
}

function validateForm() {
	var tab,
		x,
		y,
		i,
		z,
		valid = true;
	tab = document.getElementsByClassName('tab');
	y = tab[currentTab].getElementsByTagName('input');
	z = tab[currentTab].getElementsByTagName('select');
	x = tab[currentTab].getElementsByClassName('form-check-input');
	if (y.length > 0) {
		for (i = 0; i < y.length; i++) {
			if (y[i].value == '') {
				y[i].className += ' invalid';
				valid = false;
			}
		}
	}
	if (z.length > 0) {
		for (i = 0; i < z.length; i++) {
			if (z[i].value == '') {
				z[i].className += ' invalid';
				valid = false;
			}
		}
	}
	if (x.length > 0) {
		valid = false;
		for (i = 0; i < x.length; i++) {
			if (x[i].checked == true) {
				// x[i].className += ' invalid';
				valid = true;
			} else {
				$('.invalid-feedback').show();
			}
		}
	}
	if (valid) {
		document.getElementsByClassName('step')[currentTab].className += ' finish';
	}
	return valid;
}

function getService() {
	$.ajax({
		url: '/booking/get-service',
		method: 'GET',
		success: function (rs) {
			for (var key in rs) {
				var option = `
                <option value="${rs[key]._id}">${rs[key].service_name}</option>
                `;
				$('#service-id').append(option);
			}
		},
	});
}
function getStaff() {
	$.ajax({
		url: '/booking/get-staff',
		method: 'GET',
		success: function (rs) {
			for (var key in rs) {
				var option = `
                <div class="form-check-inline col-3 justify-content-center">
                    <input id="${rs[key]._id}" type="radio" hidden value="${rs[key]._id}" class="form-check-input"
                        name="select-staff" onchange="staffIntro(this.value)" required>
                    <label for="${rs[key]._id}" class="form-check-label">
                        <img src="${rs[key].staff_avatar}" alt="">
                    </label>
                </div>
                `;
				$('#staff-id').append(option);
			}
		},
	});
}
getService();
getStaff();
function serviceIntro() {
	$.ajax({
		url: '/booking/get-service',
		method: 'GET',
		success: function (rs) {
			$('#service_introduce').html('');
			var service_id = $('#service-id').val();
			for (var key in rs) {
				var rs_id = rs[key]._id;
				if (service_id == rs_id) {
					var info = rs[key].service_introduce;
					$('#service_introduce').append(info);
					var assign = `
                    <option value="${rs[key]._id}" selected>${rs[key].service_name}</option>
                    `;
					$('#service_id').append(assign);
				} else {
					continue;
				}
			}
		},
	});
}
function staffIntro(value) {
	$.ajax({
		url: '/booking/get-staff',
		method: 'GET',
		success: function (rs) {
			$('.invalid-feedback').hide();
			$('#staff_stars').html('');
			$('#staff_introduce').html('');
			var staff_id = value;
			for (var key in rs) {
				var rs_id = rs[key]._id;
				if (staff_id == rs_id) {
					$('#staff_fullname').html(`<b>${rs[key].staff_fullname}</b>`);
					var stars = `
                    Service quality: <br> <b>${rs[key].staff_stars}</b> <br> <i class="fas fa-star"></i>
                    `;
					var info = rs[key].staff_introduce;
					$('#staff_stars').append(stars);
					$('#staff_introduce').append(info);
					var assign = `
                    <option value="${rs[key]._id}" selected>${rs[key].staff_fullname}</option>
                    `;
					$('#staff_id').append(assign);
				} else {
					continue;
				}
			}
		},
	});
}
function setDateTime() {
	var mydate, mytime, mystring;
	mydate = $('#dateField').val();
	mytime = $('#timeField').val();
	mystring = `${mydate}T${mytime}`;
	document.getElementById('dateView').innerHTML = `<b>${moment(
		`${mydate}`
	).format('dddd DD/MM/YYYY')}</b>`;
	document.getElementById('timeView').innerHTML = `<b>${mytime}</b>`;
	document.getElementById('datetime').value = mystring;
}