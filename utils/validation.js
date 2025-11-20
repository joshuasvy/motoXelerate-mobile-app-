export const passwordRules = [
    {
        label: "Password must be at least 8 characters long",
        test: (pw) => pw.length >= 8,
    },
    {
        label: "Password contains special character",
        test: (pw) => /[@$!%*?&_-]/.test(pw),
    },
    {
        label: "Password contains number",
        test: (pw) => /\d/.test(pw),
    },
];

export const confirmPasswordRules = (pw, rePw) => {
    if (!rePw) return []; // nothing typed yet → no rules shown
    if (pw === rePw) {
        return [
            {
                label: "Passwords match",
                test: () => true,
            },
        ];
    } else {
        return [
            {
                label: "Passwords mismatch",
                test: () => false,
            },
        ];
    }
};

export const validateField = (fieldName, value, allValues) => {
    switch (fieldName) {
        case "fname":
            return value ? "" : "First name is required";
        case "lname":
            return value ? "" : "Last name is required";
        case "address":
            return value ? "" : "Address is required";
        case "contact": {
            const digits = value.replace(/\D/g, "");
            if (!value) return "Contact number is required";
            if (digits.length < 10)
                return "Contact number must be at least 10 digits";
            return "";
        }
        case "email":
            if (!value) return "Email is required";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                return "Invalid email format";
            return "";
        case "password":
            if (!value) return "Password is required";
            if (!passwordRules.every((rule) => rule.test(value))) {
                return "Password does not meet all requirements"; // ✅ keep this for signup
            }
            return "";
        case "rePassword":
            if (!value) return "Confirm password is required";
            if (value !== allValues.password) return "Passwords do not match";
            return "";
        default:
            return "";
    }
};

// Format contact number into +63 XXX XXX XXXX style
export const formatContactNumber = (input) => {
    let digits = input.replace(/\D/g, "").replace(/^0/, "");
    if (digits.startsWith("63")) digits = digits.slice(2);
    const prefix = "+63";

    if (digits.length === 0) return prefix;
    if (digits.length <= 3) return `${prefix} ${digits}`;
    if (digits.length <= 6)
        return `${prefix} ${digits.slice(0, 3)} ${digits.slice(3)}`;
    return `${prefix} ${digits.slice(0, 3)} ${digits.slice(
        3,
        6
    )} ${digits.slice(6, 11)}`;
};

// Final validation for signup (batch check)
export const validateSignUp = (
    fname,
    lname,
    address,
    contact,
    email,
    password,
    rePassword
) => {
    const errors = {};
    errors.fname = validateField("fname", fname, { password });
    errors.lname = validateField("lname", lname, { password });
    errors.address = validateField("address", address, { password });
    errors.contact = validateField("contact", contact, { password });
    errors.email = validateField("email", email, { password });
    errors.password = validateField("password", password, { password });
    errors.rePassword = validateField("rePassword", rePassword, { password });

    // removes the error each inputs
    Object.keys(errors).forEach((key) => {
        if (!errors[key]) delete errors[key];
    });
    return errors;
};

// Login validation (only email format, no required checks)
export const validateLogin = (email, password) => {
    const errors = {};

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Invalid email format";
    }

    // no required checks here
    Object.keys(errors).forEach((key) => {
        if (!errors[key]) delete errors[key];
    });

    return errors;
};
