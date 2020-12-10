import os


def get_input_file(day):
    path = "./input.txt"
    return path


def get_puzzle_link(day, year=2020):
    return f"https://adventofcode.com/{year}/day/{day}"


def generate_header(day, name=None):
    link = get_puzzle_link(day)
    if name:
        name = ": " + name
    else:
        name = ""
    header = f"Puzzle Title:     AoC 2020 Day {day}{name}\n"
    header += f"Puzzle Link:      {link}\n"
    header += f"Solution Author:  Luke Spademan <info@lukespademan.com>\n"
    header += f"Solution License: MIT\n"
    header += "-" * max(map(lambda x: len(x), header.split("\n")))
    return header
