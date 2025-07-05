interface ValidationError {
  field: string;
  message: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export const validateAuth = (
  formData: {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    userNameOrEmail: string;
    birthDay: string;
  },
  isLogin: boolean
): ValidationResult => {
  const errors: ValidationError[] = [];

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!isLogin) {
    if (!formData.email.trim()) {
      errors.push({ field: "email", message: "Email is required" });
    } else if (formData.email && !emailRegex.test(formData.email)) {
      errors.push({
        field: "email",
        message: "Please enter a valid email address",
      });
    }

    // Full name validation
    if (!formData.fullName.trim()) {
      errors.push({ field: "fullName", message: "Full name is required" });
    } else if (formData.fullName.trim().length < 3) {
      errors.push({
        field: "fullName",
        message: "Full name must be at least 3 characters",
      });
    }

    // Username validation
    if (!formData.userName.trim()) {
      errors.push({ field: "userName", message: "Username is required" });
    } else if (formData.userName.trim().length < 3) {
      errors.push({
        field: "userName",
        message: "Username must be at least 3 characters",
      });
    }
  }

  // Username or email validation (only for login)
  if (isLogin && !formData.userNameOrEmail.trim()) {
    errors.push({
      field: "userNameOrEmail",
      message: "Email or username is required",
    });
  }

  // Password validation
  if (!formData.password) {
    errors.push({ field: "password", message: "Password is required" });
  } else if (formData.password.length < 6) {
    errors.push({
      field: "password",
      message: "Password must be at least 6 characters",
    });
  } else {
    const hasUppercase = /[A-Z]/.test(formData.password);
    const hasLowercase = /[a-z]/.test(formData.password);
    const hasNumber = /\d/.test(formData.password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);

    if (!hasUppercase) {
      errors.push({
        field: "password",
        message: "Password must contain at least one uppercase letter",
      });
    }
    if (!hasLowercase) {
      errors.push({
        field: "password",
        message: "Password must contain at least one lowercase letter",
      });
    }
    if (!hasNumber) {
      errors.push({
        field: "password",
        message: "Password must contain at least one number",
      });
    }
    if (!hasSpecialChar) {
      errors.push({
        field: "password",
        message: "Password must contain at least one special character",
      });
    }
  }

  // Birthday validation (only for registration)
  if (!isLogin && formData.birthDay) {
    const selectedDate = new Date(formData.birthDay);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare dates only

    if (selectedDate > today) {
      errors.push({
        field: "birthDay",
        message: "Birth date cannot be in the future",
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
