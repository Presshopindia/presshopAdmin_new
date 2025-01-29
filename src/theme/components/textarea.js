import { mode } from "@chakra-ui/theme-tools";

const commonFieldStyles = {
  borderRadius: "16px",
  _placeholder: { color: "secondaryGray.600" },
};

export const textareaStyles = {
  components: {
    Textarea: {
      baseStyle: {
        field: {
          fontWeight: 400,
          borderRadius: "8px", // Different radius for baseStyle
        },
      },

      variants: {
        main: (props) => ({
          field: {
            bg: mode("transparent", "navy.800")(props),
            border: "1px solid !important",
            color: mode("secondaryGray.900", "white")(props),
            borderColor: mode("secondaryGray.100", "whiteAlpha.100")(props),
            fontSize: "sm",
            p: "20px",
            _placeholder: { color: "secondaryGray.400" },
            ...commonFieldStyles, // Apply common styles
          },
        }),
        auth: (props) => ({
          field: {
            bg: "white",
            border: "1px solid",
            borderColor: "secondaryGray.100",
            ...commonFieldStyles, // Apply common styles
          },
        }),
        authSecondary: (props) => ({
          field: {
            bg: "white",
            border: "1px solid",
            borderColor: "secondaryGray.100",
            ...commonFieldStyles, // Apply common styles
          },
        }),
        search: (props) => ({
          field: {
            border: "none",
            py: "11px",
            borderRadius: "inherit",
            _placeholder: { color: "secondaryGray.600" },
            ...commonFieldStyles, // Apply common styles
          },
        }),
      },
    },
  },
};
