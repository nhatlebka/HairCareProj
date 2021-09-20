var currentTab = 0;
showTab(currentTab);
function showTab(n) {
	var tab = $('fieldset.tab');
	tab[n].style.display = 'block';
	if (n == 0) {
		$('#prevBtn').hide();
	} else {
		$('#prevBtn').show();
	}
	if (n >= tab.length - 1) {
		$('#submitBtn').show();
		$('#nextBtn').hide();
		$('a#nextBtn').attr('href', '#bookingForm');
	} else {
		$('#submitBtn').hide();
		$('#nextBtn').show();
		$('a#nextBtn').removeAttr('href');
	}
	stepIndicator(n);
}

function nextPrev(n) {
	var tab = $('fieldset.tab');
	if (n == 1 && !validateInput()) {
		$('#staff-id~.invalid-feedback').show();
		return false;
	} else {
		$('#staff-id~.invalid-feedback').hide();
		$('input').removeClass('is-invalid');
		$('select').removeClass('is-invalid');
		tab[currentTab].style.display = 'none';
		currentTab = currentTab + n;
		showTab(currentTab);
	}
}

function stepIndicator(n) {
	var i,
		step = $('li.step');
	for (i = 0; i < step.length; i++) {
		step[i].className = step[i].className.replace(' active', '');
	}
	if (n < 4) {
		step[n].className += ' active';
		$('li.step.active').removeClass('finish');
	} else return;
}

function validateInput() {
	var tab,
		x = 0,
		y = 0,
		i = 0,
		z = 0,
		valid = true;
	tab = document.getElementsByClassName('tab');
	y = tab[currentTab].getElementsByTagName('input');
	z = tab[currentTab].getElementsByTagName('select');
	x = tab[currentTab].getElementsByClassName('form-check-input');
	var selTime = new Date($('#datetime').val());
	var curTime = new Date();
	if (y.length > 0) {
		if (selTime < curTime) {
			valid = false;
			for (i = 0; i < y.length; i++) {
				y[i].className += ' is-invalid';
			}
		}
		for (i = 0; i < y.length; i++) {
			if (y[i].value == '') {
				y[i].className += ' is-invalid';
				valid = false;
			}
		}
	}
	if (z.length > 0) {
		for (i = 0; i < z.length; i++) {
			if (z[i].value == '') {
				z[i].className += ' is-invalid';
				valid = false;
			}
		}
	}
	if (x.length > 0) {
		valid = false;
		for (i = 0; i < x.length; i++) {
			if (x[i].checked == true) {
				valid = true;
			} else {
				x[i].className += ' is-invalid';
			}
		}
	}
	if (valid) {
		document.getElementsByClassName('step')[currentTab].className += ' finish';
	}
	return valid;
}

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
                <div class="form-check form-check-inline col-3 justify-content-center">
                    <input id="${rs[key]._id}" type="radio" hidden value="${rs[key]._id}" class="form-check-input"
                        name="select-staff" onchange="staffIntro(this.value)" required>
                    <label for="${rs[key]._id}" class="form-check-label">
                        <img src="${rs[key].staff_avatar}" alt="">
                    </label>
                </div>
                `;
				$('#staff-id').prepend(option);
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
	console.log(document.getElementById('datetime').value);
}
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
var yyyy = today.getFullYear();
if (dd < 10) {
	dd = '0' + dd;
}
if (mm < 10) {
	mm = '0' + mm;
}

today = yyyy + '-' + mm + '-' + dd;
document.getElementById('dateField').setAttribute('min', today);
