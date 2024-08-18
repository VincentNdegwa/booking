from frappe.utils import now


def update_late_bookings():
    right_now = now()
    bookings = frappe.db.get_list(
        "Booking",
        fields=["name", "booking_date", "start_date", "booking_status"],
        filters={
            "booking_status": ["in", ["New", None]],
            "due_date": ["<", now()],
        },
    )
    for booking in bookings:
        if booking.start_date < right_now:
            frappe.db.set_value("Booking", booking.name, "booking_status", "Late")
            frappe.db.commit()
            return "Late bookings updated"
        return "No late bookings found"
