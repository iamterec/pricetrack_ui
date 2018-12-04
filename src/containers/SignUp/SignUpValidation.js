import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import isByteLength from "validator/lib/isByteLength"
import equals from "validator/lib/equals"


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
    },
    {
        field: "password",
        method: isByteLength,
        args: [{min: 3}],
        validWhen: true,
        message: "Should be more than 3 chars."
    },
    {
        field: "password",
        method: equals,
        validWhen: true,
        tag: "passwordConfirmation",
        message: "Password and Confirm password should be equal."
    }
];
