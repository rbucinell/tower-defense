import os
from PIL import Image

def generateXML( xmlpath, sourceimg, tile_size ):
    """ Generates an xml file of SubTextures for a given image file

    Args:
        xmlpath {str}: the output file to where the data will be written
        sourceimg {str}: path of the image file that will be used
        tile_size: the size of one side of a square tile        
    """
    with Image.open( sourceimg ) as img:
        atlas_w, atlas_h = img.size
    xml_writer = open( xmlpath, "w" )
    name_index = max(sourceimg.rfind('/'),0)+1
    xml_writer.write( f"<TextureAtlas imagePath=\"{ sourceimg[name_index:]}\">\n" )
    #print( f"<TextureAtlas imagePath=\"{ sourceimg[name_index:]}\">\n" )
    i = 0
    for y in range( 0, (atlas_h // tile_size) ):
        for x in range( 0, (atlas_w // tile_size) ):
            index = '%03d' % (i)
            subtexture = f"<SubTexture name=\"towerDefense_tile{index}.png\" x=\"{x * tile_size}\" y=\"{y * tile_size}\" width=\"{tile_size}\" height=\"{tile_size}\"/>"
            xml_writer.write( "\t" + subtexture + "\n" )
            #print( subtexture )
            i+=1
    xml_writer.write("</TextureAtlas>\n")
    xml_writer.close()


generateXML("../src/data/tower_defense_spritesheet.xml", "../src/img/towerDefense_tilesheet.png", 64 )
