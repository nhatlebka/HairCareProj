const boxes = document.querySelectorAll('.combo')

window.addEventListener('scroll', checkBoxes)

checkBoxes()

function checkBoxes() {
    const triggerBottom = window.innerHeight / 5 * 4

    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top

        if(boxTop < triggerBottom) {
            box.classList.add('show')
        } else {
            box.classList.remove('show')
        }
    })
}

function getService() {
	$.ajax({
		url: '/services/data',
		method: 'GET',
		success: function (rs) {
            $('#main-combo').html("");
			for (var key in rs) {
				var option = `
                <div class="combo col-lg-12 col-md-12 col-sm-12" >
                    <div class="row">
                        <div class="col-lg-6 col-md-12 col-sm-12">
                            <div class="combo-title text-center">
                                <h3>${rs[key].service_name}</h3>
                            </div>
                            <p class="combo-des">${rs[key].service_introduce}</p>
                                <div class="post-read-more text-center">
                                    <a href="/services/${rs[key].slug}">Read More&nbsp;<i class="fas fa-angle-double-right read-more-icon"></i>
                                        <div class="post-read-more-before"></div>
                                        <div class="post-read-more-after"></div>
                                    </a>
                                </div>
                        </div>
                        <div class="col-lg-2 col-md-12 col-sm-12"></div>
                        <div class="col-lg-4 col-md-12 col-sm-12">
                            <div class="combo-img">
                                <img src="${rs[key].service_image}" alt="" width="80%">
                            </div>
                        </div>
                        
                    </div>
                </div>
                `;
				$('#main-combo').append(option);
			}
		},
	});
}

function getServiceSpecial() {
	$.ajax({
		url: '/services/data',
		method: 'GET',
		success: function (rs) {
            $('#main-post').html("");
			for (var i=0; i < 3 ; i++) {
				var option = `
                <div class="col-lg-4 col-md-12 col-sm-12">
                <div class="post text-center">
                    <div class="post-title breadcrumb-text">
                        <h3 style="color:#000000;">${rs[i].service_name}</h3>
                    </div>
                    <div class="post-img">
                        <img src="${rs[i].service_image}" alt="" width="70%">
                    </div>
                    <p class="post-des">${rs[i].service_introduce}</p>
                    <div class="post-read-more">
                        <a href="/services/${rs[i].slug}">Read More&nbsp;<i class="fas fa-angle-double-right read-more-icon"></i>
                            <div class="post-read-more-before"></div>
                            <div class="post-read-more-after"></div>
                        </a>
                    </div>
                </div>
            </div>
                `;
				$('#main-post').append(option);
			}
		},
	});
}
getService();
getServiceSpecial();

