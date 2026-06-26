# type: ignore

import sys
from pathlib import Path
import numpy as np
import matplotlib.pyplot as plt

fig, (plt1, plt2) = plt.subplots(1, 2, figsize=(14,5))
xs = np.linspace(1, 50, 500)
ys_2logn = 2*np.log2(xs)
ys_n_2 = xs/2
ys_1n = xs
ys_nlogn_4 = xs*np.log2(xs)/4
ys_n2_10 = (xs**2)/10
ys_expn_20 = 2**xs/20

# plt1.set_xlim(0, 50); plt1.set_ylim(0, 70)
# plt1.plot(xs, ys_2logn,   ':');   plt1.text(43, ys_2logn[-1]+2, '2·log₂(n)')
# plt1.plot(xs, ys_n_2,     ':');  plt1.text(46, ys_n_2[-1]+2, 'n/2')
# plt1.plot(xs, ys_1n,     '--');   plt1.text(47, ys_1n[-1], 'n')
# plt1.plot(xs, ys_nlogn_4,'--');  plt1.text(38, 65, 'n·log₂(n)/4')
# plt1.plot(xs, ys_n2_10,   '-');   plt1.text(21, 65, 'n²/10')
# plt1.plot(xs, ys_expn_20, '-');  plt1.text(12, 65, '2ⁿ/20')
# plt1.plot([2,2,13,13], [0,16,16,0], ':')
# plt1.set_title('Growth rates for 5 equations')

plt1.set_xlim(0, 50); plt1.set_ylim(0, 70)
plt1.plot(xs, ys_2logn,   ':', color='gray');   plt1.text(43, ys_2logn[-1]+2, '2·log₂(n)')
plt1.plot(xs, ys_n_2,     ':', color='black');  plt1.text(46, ys_n_2[-1]+2, 'n/2')
plt1.plot(xs, ys_1n,     '--', color='grey');   plt1.text(47, ys_1n[-1], 'n')
plt1.plot(xs, ys_nlogn_4,'--', color='black');  plt1.text(38, 65, 'n·log₂(n)/4')
plt1.plot(xs, ys_n2_10,   '-', color='gray');   plt1.text(21, 65, 'n²/10')
plt1.plot(xs, ys_expn_20, '-', color='black');  plt1.text(12, 65, '2ⁿ/20')
plt1.plot([2,2,13,13], [0,16,16,0], ':', color='gray')
plt1.set_title('Growth rates for 5 equations')

plt2.set_xlim(2, 13); plt2.set_ylim(0, 16);
plt2.plot(xs, ys_2logn,   ':', color='gray');   plt2.text(11.5, ys_2logn[130]+0.2, '2·log₂(n)')
plt2.plot(xs, ys_n_2,     ':', color='black');  plt2.text(12.2, ys_n_2[100]+0.4, 'n/2')
plt2.plot(xs, ys_1n,     '--', color='gray');   plt2.text(12.4, ys_1n[130], 'n')
plt2.plot(xs, ys_nlogn_4,'--', color='black');  plt2.text(11.3, ys_nlogn_4[109], 'n·log₂(n)/4')
plt2.plot(xs, ys_n2_10,   '-', color='gray');   plt2.text(11.2, 15, 'n²/10')
plt2.plot(xs, ys_expn_20, '-', color='black');  plt2.text(7.2, 15, '2ⁿ/20')
plt2.set_title('Zoomed in')

fname = Path(sys.argv[0]).with_suffix('.svg')
print(fname)
plt.savefig(fname, format='svg', transparent=True)
