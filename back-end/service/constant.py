class AuthenticateMessage:
    UNAUTHORIZED = "Unauthorized"
    DUPLICATE_INFO = "Thông tin bạn cung cấp đã trùng lặp, vui lòng kiểm tra lại!"

class RegexPattern:
    EMAIL = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}"