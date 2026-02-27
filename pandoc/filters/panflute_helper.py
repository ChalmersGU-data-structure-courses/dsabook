# type: ignore

import time
import inspect
import panflute as pf


def run_filter(*args, **xargs):
    frm = inspect.stack()[1]
    mod = inspect.getmodule(frm[0])
    t0 = time.time()
    result = pf.run_filter(*args, **xargs)
    pf.debug(f"...Panflute filter {mod.__name__}: {time.time()-t0:0.2f} s")
    return result
