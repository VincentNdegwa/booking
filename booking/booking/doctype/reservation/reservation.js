// Copyright (c) 2024, vincent and contributors
// For license information, please see license.txt
function calculate_reservation_price(frm) {
	let total_reservation_price = 0;
	total_reservation_price += frm.doc.service_price;
	let payed_amount = 0;
	frm.doc.payments.forEach((element) => {
		payed_amount += element.amount_paid;
	});
	frm.set_value("total_amount", total_reservation_price);
	frm.set_value("total_amount_paid", payed_amount);
	frm.set_value("balance_remaining", total_reservation_price - payed_amount);
}

frappe.ui.form.on("Reservation", {
	refresh(frm) {
		calculate_reservation_price(frm);
	},
	before_submit(frm) {
		if (frm.doc.payment_status != "Paid") {
			frappe.throw(__("The reservation is unpaid, please pay first before submitting!"));
			return false;
		}
	},
	service_price(frm) {
		calculate_reservation_price(frm);
	},
});

frappe.ui.form.on("Reservation Payment History", {
	amount_paid(frm, cdt, cdn) {
		calculate_reservation_price(frm);
	},
	payments_remove(frm) {
		calculate_reservation_price(frm);
	},
});
