# Copyright (c) 2024, vincent and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Reservation(Document):
    pass


# @frappe.whitelist()
# def change_doc_status(name):
#     try:
#         doc = frappe.get_doc("Reservation", name)
#         if doc:
#             doc.cancel()
#             return {"status": True, "message": "Changed doc status"}
#         else:
#             return {"status": False, "message": "Doc not found"}
#     except:
#         return {
#             "status": False,
#             "message": "Error: Unable to change status",
#             "name": name,
#         }  #
