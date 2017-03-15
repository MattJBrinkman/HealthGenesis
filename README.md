# HealthGenesis
Public repository for the Health Genesis project.

Introduction
------------

This repository contains the source code for Health Genesis - a project created
during the ONC Blockchain Hackathon March 14/15 2017.  The goal of the Health
Genesis project is to show how medical records can be shared using Blockchain
technology with a demonstration using medical images.

Setup
-----

console 1:

> cd shareApp

> meteor npm install

> meteor

console 2:

> cd phrApp

> meteor npm install

> rm node_modules/crypto

> meteor --port 3100

console 3:

> cd authProxy

> meteor npm install

> PROXIED_SERVER=http://some-host:some-port  meteor --port 4444

Note that port 4444 is ignored here. The actual port to use to connect to Orthanc is 9042.

Additional options set via environment variables:

```
PROXY_PORT=####                             Port number to listen on for proxy requests. Defaults to
                                            9042

ETH_ACCOUNTS=hex-string-0,hex-string-1      One or more account IDs separated by commas. Defaults to
                                            Ethereum instance provider's account.

ETH_INSTANCE_URL=url                        The Ethereum instance URL. Defaults to
                                            http://localhost:8545

```

All applications can accept the additional ETH_INSTANCE_URL option.
