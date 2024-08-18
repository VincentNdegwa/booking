frappe.listview_settings["Booking"] = {
	formatters: {
		start_date(value, df, doc) {
			if (!value) return "";
			const date = moment(value);
			return date.fromNow();
		},
	},
};
