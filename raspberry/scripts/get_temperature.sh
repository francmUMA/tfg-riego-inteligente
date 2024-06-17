#!/bin/sh
# Get the temperature of the CPU
vcgencmd measure_temp | cut -d "=" -f 2 | cut -d "'" -f 1 | tr -d '\n'