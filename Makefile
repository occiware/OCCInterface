
all: build

build:
	cd ./scripts; \
        ./install_erocci.sh

clean:
	true


.PHONY: all build clean
