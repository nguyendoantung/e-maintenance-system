export const root = process.env.REACT_APP_URL_API;

const path = {
  auth: {
    login: '/authenticate/token',
    logout: '/authenticate/logout',
    profile: '/authenticate/profile',
  },
  admin: {
    staff: {
      listStaff: ({ page, pageSize }) =>
        `/admin/staff/?page=${page}&pageSize=${pageSize}`,
      listRepairOrder: ({ page, pageSize }) =>
        `/admin/staff/get_order?page=${page}&pageSize=${pageSize}`,
      listOrderForAdmin: ({ page, pageSize }) =>
        `/admin/staff/get_order_for_admin?page=${page}&pageSize=${pageSize}`,
      acceptOrder: ({ orderId }) => `/admin/staff/accept_order/${orderId}`,
      orderOfStaff: ({ adminID, page, pageSize }) =>
        `/admin/staff/get_order_of_staff/${adminID}?page=${page}&pageSize=${pageSize}`,
      completeOrder: ({ orderID }) => `/admin/staff/complete_order/${orderID}`,
    },
    device: {
      listDevice: ({ category, page, pageSize }) =>
        // `/admin/device/?page=${page}&pageSize=${pageSize}`,
        category === ''
          ? `/admin/device/?page=${page}&pageSize=${pageSize}`
          : `/admin/device/?page=${page}&pageSize=${pageSize}&category_id=${category}`,
    },
    category: {
      listCategory: () => `/admin/category/`,
    },
    userService: {
      changePassword: () => `/user/change_password`,
      createRepairOrder: () => `/user/repair_order`,
      getRepairOrder: ({ page, pageSize }) =>
        `/user/repair_order?page=${page}&pageSize=${pageSize}`,
    },
  },
};

export default path;
