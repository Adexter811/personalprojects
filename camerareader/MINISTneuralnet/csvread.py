import csv
import numpy as np
from matplotlib import pyplot as plt

def parse_csv_file(filepath):
    """Parses a CSV file and returns its content as a list of lists."""
    data = []
    with open(filepath, 'r', newline='') as csv_file:
        csv_reader = csv.reader(csv_file)
        for row in csv_reader:
            data.append(row)
    #print(data.__len__())
    return data

def getgrayscale(data):
    newdata = []

    for i in range (1,data.__len__()):
        red = float(data[i][1])
        green = float(data[i][2])
        blue = float(data[i][3])
        val = (((0.299 * red + 0.587 * green + 0.114 * blue)/255)-1)*-1
        if val<.6:
            val = 0

        newdata.append(val)

    #print(newdata.__len__())
    return newdata

def makeimg(data):
    img = np.array(data).reshape(96,96)
    #print(img.size)
    return img

def resizeimg(img):
    h, w = img.shape
    new_h, new_w = 28, 28

    # Split into bins
    y_bins = np.linspace(0, h, new_h+1, dtype=int)
    x_bins = np.linspace(0, w, new_w+1, dtype=int)

    result = np.zeros((new_h, new_w))

    for i in range(new_h):
        for j in range(new_w):
            block = img[y_bins[i]:y_bins[i+1], x_bins[j]:x_bins[j+1]]
            result[i, j] = block.mean() if block.size > 0 else 0

    return result

def outputtonet():

    parsed_data = parse_csv_file('/Users/aiden/Documents/VScode/venv/camerareader/pixels.csv')
    grayscale = getgrayscale(parsed_data)
    img = makeimg(grayscale)
    img = resizeimg(img)
    outputarr = img.reshape(784,1)
    return(outputarr)
    


parsed_data = parse_csv_file('/Users/aiden/Documents/VScode/venv/camerareader/pixels.csv')
grayscale = getgrayscale(parsed_data)

img = makeimg(grayscale)
#print(img)
#plt.imshow(img, cmap='gray', interpolation = 'nearest')
# plt.axis('equal')
#plt.show()

img = resizeimg(img)



outputarr = img.reshape(784,1)
#print(outputarr)

sendout = outputtonet()

#plt.imshow(img, cmap='gray', interpolation='nearest')
#plt.axis('equal')
#plt.show()




