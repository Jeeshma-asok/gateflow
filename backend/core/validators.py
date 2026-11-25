from django.core.validators import RegexValidator

NAME_REGEX_VALIDATOR = RegexValidator(
    regex=r"^[a-zA-Z](?:[a-zA-Z ]*[a-zA-Z])?$",
    message="Only letters and spaces are allowed. The name must start and end with a letter.",
    code="invalid_name"
)
