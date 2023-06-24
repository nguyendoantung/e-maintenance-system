PAGE_SIZE_LIMIT = 25
PAGE_SIZE_DEFAULT = 25


class AuthenticateMessage:
    UNAUTHORIZED = "Unauthorized"
    DUPLICATE_INFO = "Thông tin bạn cung cấp đã trùng lặp, vui lòng kiểm tra lại!"


class RegexPattern:
    EMAIL = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}"


class OrderStatus:
    START = "Started"
    REJECT = "Rejected"
    PENDING = "Pending"
    ON_PROCESS = "Working"
    COMPLETE = "Completed"
