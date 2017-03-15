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

> PROXIED_SERVER=http://pacsemulator.cloudapp.net:8042 meteor --port 3001

Note that port 4444 is ignored here. The actual port to use to connect to Orthanc is 9042.
