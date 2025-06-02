import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "Transaksi",
        url: "/transaction",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Order Barang",
        url: "/order",
        icon: Icons.Alphabet,
        items: [],
      },
      {
        title: "Customer",
        icon: Icons.User,
        items: [
          {
            title: "List Customer",
            url: "/customer",
          },
          {
            title: "Daftar Harga",
            url: "/customerprice",
          },
        ],
      },
      {
        title: "Produk",
        url: "/product",
        icon: Icons.FourCircle,
        items: [],
      },
      {
        title: "Forms Example",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Form Elements",
            url: "/forms/form-elements",
          },
          {
            title: "Form Layout",
            url: "/forms/form-layout",
          },
        ],
      },
      {
        title: "Tables Example",
        url: "/tables",
        icon: Icons.Table,
        items: [
          {
            title: "Tables",
            url: "/tables",
          },
        ],
      },
      {
        title: "Pages Example",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Settings",
            url: "/pages/settings",
          },
        ],
      },
    ],
  },
  {
    label: "OTHERS",
    items: [
      {
        title: "Authentication",
        icon: Icons.Authentication,
        items: [
          {
            title: "Sign In",
            url: "/auth/sign-in",
          },
        ],
      },
    ],
  },
];
