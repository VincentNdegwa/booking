// Copyright (c) 2024, vincent and contributors
// For license information, please see license.txt

frappe.ui.form.on("Booking", {
	setup(frm) {
		if (!frm.doc.booking_date) {
			frm.set_value("booking_date", frappe.datetime.now_datetime());
		}
	},
	validate(frm) {
		const booking_date = frm.doc.booking_date;
		const start_time = frm.doc.start_time;
		const end_time = frm.doc.end_time;
		const now = frappe.datetime.now_datetime();
		if (booking_date > now) {
			frappe.msgprint(__("Booking date cannot be in the future"));
			frappe.validated = false;
		}
		if (end_time < start_time) {
			frappe.msgprint(__("End time cannot be before start time"));
			frappe.validated = false;
		}
	},
});
