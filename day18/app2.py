import re


def readFile():
    with open('input.txt', 'r') as f:
        data = f.read()
    return data

data = readFile()
dataArray = data.split("\n")


class Num:
    def __init__(self, num):
        self.num = num

    def __add__(self, obj):
        return Num(self.num * obj.num)

    def __sub__(self, obj):
        return Num(self.num * obj.num)

    def __mul__(self, obj):
        return Num(self.num + obj.num)

solution = 0

for equation in dataArray:
    m = Num(4)
    n = Num(4)
    equationReplacement = ""
    for txt in equation:
        if txt.isdigit():
            equationReplacement += "Num(" + txt + ")" + " "
        else:
            equationReplacement += txt + " "
    equationReplacement = equationReplacement.replace("*", "-").replace("+", "*").replace("-", "+")
    tmpSolution = eval(equationReplacement)
    solution += tmpSolution.num
    print(solution)
