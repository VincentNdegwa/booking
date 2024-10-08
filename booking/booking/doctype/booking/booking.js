// Copyright (c) 2024, vincent and contributors
// For license information, please see license.txt

function update_booking_status(frm) {
	const now = frappe.datetime.now_datetime();
	const start_date = frm.doc.start_date;
	if (start_date <= now) {
		frm.set_value({
			booking_status: "Late",
		});
	}
}
frappe.ui.form.on("Booking", {
	setup(frm) {
		if (!frm.doc.booking_date) {
			frm.set_value("booking_date", frappe.datetime.now_datetime());
		}
	},

	before_submit(frm) {
		if (frm.doc.payment_status !== "Paid") {
			frappe.throw(__("Please pay the booking amount before submitting the booking."));
			return false;
		}
	},
	setup(frm) {
		update_booking_status(frm);
	},
	refresh(frm) {
		update_booking_status(frm);
	},
	validate(frm) {
		const booking_date = frm.doc.booking_date;
		const start_time = frm.doc.start_time;
		const end_time = frm.doc.end_time;
		const now = frappe.datetime.now_datetime();
		if (booking_date >= now) {
			frappe.msgprint(__("Booking date cannot be in the future"));
			frappe.validated = false;
		}
		if (end_time < start_time) {
			frappe.msgprint(__("End time cannot be before start time"));
			frappe.validated = false;
		}
	},
});
