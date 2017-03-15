#!/bin/bash
docker exec -it bootstrap /geth --datadir=/root/.ethereum/devchain --exec 'miner.start()' attach ipc://root/.ethereum/devchain/geth.ipc
(cd dicomData && ./pushdata.sh)
