// Copyright (c) 2024, vincent and contributors
// For license information, please see license.txt

function calculate_total_price(frm) {
	let total_add_on_price = 0.0;
	frm.doc.add_ons.forEach((element) => {
		total_add_on_price += element.price;
	});
	total_add_on_price += frm.doc.price;
	frm.set_value("total_price", total_add_on_price);
}

frappe.ui.form.on("Booking Service", {
	refresh(frm) {},
	price(frm) {
		calculate_total_price(frm);
	},
});

frappe.ui.form.on("Booking Service Add-ons", {
	price(frm, cdt, cdn) {
		calculate_total_price(frm);
	},
	add_ons_remove(frm) {
		calculate_total_price(frm);
	},
});
