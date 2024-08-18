frappe.listview_settings["Booking"] = {
	formatters: {
		start_date(value, df, doc) {
			if (!value) return "";
			const date = moment(value);
			const now = moment();

			const hoursDiff = date.diff(now, "hours");

			let color;
			if (hoursDiff < 0) {
				color = "red"; // Past date
			} else if (hoursDiff <= 24) {
				color = "yellow"; // Less than 24 hours remaining
			} else {
				color = "green"; // More than 24 hours remaining
			}

			const style = `
				color: slate; 
				background-color: var(--${color}, ${color});
                font-weight:500;
			`;

			return `<div class="pill" style="${style}">${date.fromNow()}</div>`;
        },
        
        booking_date(value, df, doc) {
            if (!value) return "";
            const date = moment(value);
            return date.fromNow()
        }
	},
};
