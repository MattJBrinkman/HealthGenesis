# HealthGenesis
Public repository for the Health Genesis project.

Introduction
------------

This repository contains the source code for Health Genesis - a project created
during the ONC Blockchain Code-a-thon March 14/15 2017.  The goal of the Health
Genesis project is to show how medical records can be shared using blockchain
technology:

* Identity Management is handled via public key cryptography

* Authentication of identities is handled via digital signatures

* Authorization of access to medical records is handled via smart contracts linking
  identities to URI based resources and verified by a resource servers.

This architecture generalizes identity management so the same model can be used
by patients, providers and computer systems.  It also generalizes access to
URI based resources and can be easily integrated with modern standards such as
HL7 FHIR, DICOMweb and future resource based protocols such as IPFS.  

Technology Stack
----------------

* Ethereum

* Meteor

* Orthanc

* OHIF Viewer

* Docker

* Metamask

Architecture
------------

shareApp - A meteor based web application that allows health system staff to query
           for a patient's medical images and share them with another identity.
           The identity could be a patient, provider or computer system.

phrApp - A meteor based web application that allows patients to register, view
         resources shared with them and launch a medical image viewer to view
         those images.

viewerApp - A fork of the OHIFViewer that integrates ethereum based identity
            management to sign requests for resources they have access to.


authProxy - A meteor based application that acts as a HTTP proxy to a DICOMWeb
            server including authentication and authorization by veriying
            digital signatures and resource authroziation grants stored
            in the ethereum blockchain.

Running
-------

The entire system can be brought up with docker

> docker-compose up

Load DICOM files obtained from the The Cancer Imaging Archive (funded by NIH)

> dicomData/pushdata.sh

Make sure you have the metamask extension installed in chrome and create
two accounts (account A and account B).

1) Open the shareApp web app: http://localhost:3000

2) Click "Register".  Enter the code "topsecret" and press submit.  Confirm the transaction

3) Press "Search". You should see a single DICOM Study appear

4) Click "Share".  Enter the addres for ethereum account B, press submit

5) Open another tab to the phrApp: http://localhost:3100

6) Select metamask account b, press Register.  Confirm the transaction

7) You should see an entry in the table representing the share made in step 4

8) Click "View Images".  The Image Viewer should appear with a button in upper
   left corner labled "Sign".  Presss sign and confirm the transaction

You should now see images!

Developer Setup
---------------

NOTE: This needs to be updated/finished

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


Docker Deployment
-----------------
A demo version of Health Genesis can be instantiated as a set of Docker containers.
This system will be composed of one or more ethereum geth nodes, the eth-netstats
dashboard, the Orthanc image archive, a mongo database instance and the four
Health Genesis applications.

This section will describe the process for creating the Health Genesis demo system
form the supplied source.

System Prerequisites:

1. bash: Installation automation is provided as a set of bash scripts.

2. Meteor.js: The Health Genesis applications are built on the Meteor.js
   framework. Meteor is installed to provide for the application bundling process.

3. Node.js: Meteor.js and the Health Genesis applications require Node.js

4. Docker: Docker is used as a local deployment and orchestration system.


Steps to Build the System:

1. Bundle the Health Genesis applications for deployment by running the bash
   script named "build.sh" that is found in the root of the Health Genesis
   source directory.

2. Deploy the Health Genesis system by running the command

        docker-compose up -d

   in the root of the Health Genesis source directory.

3. Complete the installation by running the script named "finalize.sh"  This
   script will start the ethereum block chain mining and install sample image
   data.

4. Add an entry to your hosts file to point auth-proxy to localhost.
