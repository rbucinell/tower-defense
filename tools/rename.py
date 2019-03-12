import os
i = 0
for fname in os.listdir():
    if( fname.endswith("png")):
        dest = "td_tile%03d.png" % i
        print( dest )
        os.rename( fname, dest )
        print( fname )
        i+=1
