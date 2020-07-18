import numpy as np
from scipy.io.wavfile import write

samplerate = 44100

freq = 1000
amp = np.iinfo(np.int16).max
t = np.arange(0, 0.5, 1 / samplerate)

y = (amp * np.sin(2 * np.pi * freq * t)).astype('i2')

write('beep_500ms.wav', samplerate, y)
