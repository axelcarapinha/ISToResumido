#!/bin/bash

################################################
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'
################################################

mkdir -p ./image-only-pdfs

SOURCE_DIR="./data-llm"
DEST_DIR="./image-only-pdfs"

for pdf in "$SOURCE_DIR"/*.pdf; do
    # Check if file exists to avoid errors if no PDFs are found
    [ -f "$pdf" ] || continue

    # Run pdftotext to ry to find selectable text
    if pdftotext "$pdf" - | grep -q '[[:alnum:]]'; then
        echo "Contains text: $pdf"
    else
        echo -e "${RED}Image-only PDF: $pdf -> Moving to $DEST_DIR${NC}"
        mv "$pdf" "$DEST_DIR/"
    fi
done

echo -e "${GREEN}Processing complete!${NC}"
