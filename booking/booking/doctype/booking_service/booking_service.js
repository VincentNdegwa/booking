// Copyright (c) 2024, vincent and contributors
// For license information, please see license.txt

frappe.ui.form.on("Booking Service", {
	refresh(frm) {},
});

frappe.ui.form.on("Booking Service Add-ons", {
	price(frm, cdt, cdn) {
		let total_add_on_price = 0.0;
		frm.doc.add_ons.forEach((element) => {
			total_add_on_price += element.price;
		});
		total_add_on_price += frm.doc.price;
		frm.set_value("price", total_add_on_price);
		console.log(frm);
	},
});
