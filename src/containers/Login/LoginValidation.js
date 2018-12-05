import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";

export const rules = [
    {
        field: "email",
        method: isEmpty,
        validWhen: false,
        message: "Please provide an email address."
    },
    {
        field: "email",
        method: isEmail,
        validWhen: true,
        message: "That is not a valid email."
    }
];
