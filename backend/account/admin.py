from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


class UserModelAdmin(BaseUserAdmin):
    # User list
    list_display = ["id", "email", "name", "tc", "is_admin", "is_active"]
    list_filter = ["is_admin", "is_active"]

    # Edit user
    fieldsets = [
        (
            "User Credentials",
            {"fields": ["email", "password"]},
        ),
        (
            "Personal info",
            {"fields": ["name", "tc"]},
        ),
        (
            "Permissions",
            {"fields": ["is_admin", "is_active"]},
        ),
    ]

    # Add user
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": [
                    "email",
                    "name",
                    "tc",
                    "password1",
                    "password2",
                ],
            },
        ),
    ]

    search_fields = ["email", "name"]
    ordering = ["email"]
    filter_horizontal = []


admin.site.register(User, UserModelAdmin)
