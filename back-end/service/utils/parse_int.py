def parse_int_with_limit(x, default=0, limit=None):
    try:
        return min(int(x), limit) if limit else int(x)
    except:
        return default


def parse_int(x, default=0):
    return parse_int_with_limit(x, default)
