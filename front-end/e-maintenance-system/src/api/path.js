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
    },
  },
};

export default path;
