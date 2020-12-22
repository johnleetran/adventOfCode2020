# DO NOT EDIT
# This makefile makes sure all linkable targets are
# up-to-date with anything they link to
default:
	echo "Do not invoke directly"

# Rules to remove targets that are older than anything to which they
# link.  This forces Xcode to relink the targets from scratch.  It
# does not seem to check these dependencies itself.
PostBuild.main.Debug:
/Users/john/Documents/code/advent-of-code-2020/day22/build/Debug/main:
	/bin/rm -f /Users/john/Documents/code/advent-of-code-2020/day22/build/Debug/main


PostBuild.main.Release:
/Users/john/Documents/code/advent-of-code-2020/day22/build/Release/main:
	/bin/rm -f /Users/john/Documents/code/advent-of-code-2020/day22/build/Release/main


PostBuild.main.MinSizeRel:
/Users/john/Documents/code/advent-of-code-2020/day22/build/MinSizeRel/main:
	/bin/rm -f /Users/john/Documents/code/advent-of-code-2020/day22/build/MinSizeRel/main


PostBuild.main.RelWithDebInfo:
/Users/john/Documents/code/advent-of-code-2020/day22/build/RelWithDebInfo/main:
	/bin/rm -f /Users/john/Documents/code/advent-of-code-2020/day22/build/RelWithDebInfo/main




# For each target create a dummy ruleso the target does not have to exist
