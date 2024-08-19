// Copyright (c) 2024, vincent and contributors
// For license information, please see license.txt
function calculate_reservation_price(frm) {
	let total_reservation_price = 0;
	frm.doc.services.forEach((element) => {
		total_reservation_price += element.service_price;
	});
	frm.set_value("total_price", total_reservation_price);
}

frappe.ui.form.on("Reservation", {
	refresh(frm) {},
	before_submit(frm) {
		if (frm.doc.payment_status != "Paid") {
			frappe.throw(__("The reservation is unpaid, please pay first before submitting!"));
			return false;
		}
	},
});

frappe.ui.form.on("Reservation Service", {
	service_price(frm, cdt, cdn) {
		calculate_reservation_price(frm);
	},
});
