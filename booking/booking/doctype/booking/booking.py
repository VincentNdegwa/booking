# Copyright (c) 2024, vincent and contributors
# For license information, please see license.txt

import frappe
from frappe.website.website_generator import WebsiteGenerator


class Booking(WebsiteGenerator):
    pass


@frappe.whitelist()
def create_booking_from_reservation(client, reservation_date, total_amount, service,name):
    try:
        new_booking = frappe.new_doc("Booking")
        new_booking.client = client
        new_booking.booking_date = reservation_date
        new_booking.status = "Pending"
        new_booking.payment_status = "Paid"
        new_booking.total_amount = total_amount
        new_booking.service = service
        new_booking.reservation = name
        new_booking.insert()
        return {"status": True, "message": "Booking Created"}
    except:
        return {"status": False, "message": "Error creating booking"}
