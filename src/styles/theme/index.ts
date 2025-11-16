import type { ThemeConfig } from "antd";

export const customizeTheme: ThemeConfig = {
  token: {
    colorLink: "#463DC8",
    colorPrimary: "#5046E4",
  },
  components: {
    Button: {},
    Input: {
      controlHeight: 44,
      paddingBlock: 10,
      paddingInline: 14,
    },
    Table: {
      headerBg: "#bbe0e3",
      borderColor: "#000",
    },
    Pagination: {},
  },
};
