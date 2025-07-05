import { Box, Text, Input, type InputProps } from "@chakra-ui/react";
export const AuthSignupFields = ({
  formData,
  validationErrors,
  handleInputChange,
  getInputStyle,
}: {
    formData: {
        fullName: string;
        userName: string;
        email: string;
        birthDay: string;
    };
    validationErrors: {
        fullName?: string;
        userName?: string;
        email?: string;
        birthDay?: string;
    };
    handleInputChange: (field: string, value: string) => void;
    getInputStyle: (field: string) => InputProps;
}) => {
  return (
    <>
      <Box w="full">
        <Input
          placeholder="Full Name"
          type="text"
          fontSize={14}
          value={formData.fullName}
          onChange={(e) => handleInputChange("fullName", e.target.value)}
          {...getInputStyle("fullName")}
          outline={"none"}
          id="fullName"
        />
        {validationErrors.fullName && (
          <Text color="red.500" fontSize={12} mt={1}>
            {validationErrors.fullName}
          </Text>
        )}
      </Box>
      <Box w="full">
        <Input
          placeholder="Username"
          type="text"
          fontSize={14}
          value={formData.userName}
          onChange={(e) => handleInputChange("userName", e.target.value)}
          {...getInputStyle("userName")}
          outline={"none"}
          id="userName"
          autoComplete="username"
        />
        {validationErrors.userName && (
          <Text color="red.500" fontSize={12} mt={1}>
            {validationErrors.userName}
          </Text>
        )}
      </Box>
      <Box w="full">
        <Input
          placeholder="Email"
          type="email"
          fontSize={14}
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          {...getInputStyle("email")}
          outline={"none"}
          id="email"
          autoComplete="email"
        />
        {validationErrors.email && (
          <Text color="red.500" fontSize={12} mt={1}>
            {validationErrors.email}
          </Text>
        )}
      </Box>
      <Box w="full">
        <Input
          placeholder="Birth Date"
          type="date"
          fontSize={14}
          value={formData.birthDay}
          onChange={(e) => handleInputChange("birthDay", e.target.value)}
          {...getInputStyle("birthDay")}
          outline={"none"}
          id="birthDay"
        />
        {validationErrors.birthDay && (
          <Text color="red.500" fontSize={12} mt={1}>
            {validationErrors.birthDay}
          </Text>
        )}
      </Box>
    </>
  );
};
