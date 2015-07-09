#!/bin/bash -e

PORT=${PORT-8000}
cd www
python -m http.server $PORT
