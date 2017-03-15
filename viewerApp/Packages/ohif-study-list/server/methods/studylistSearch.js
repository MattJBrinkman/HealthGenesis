Meteor.methods({
    /**
     * Use the specified filter to conduct a search from the DICOM server
     *
     * @param filter
     */
    StudyListSearch(filter, headers) {
        // Get the server data. This is user-defined in the config.json files or through servers
        // configuration modal
        const server = getCurrentServer();

        if (!server) {
            throw 'No properly configured server was available over DICOMWeb or DIMSE.';
        }

        if (server.type === 'dicomWeb') {
            return Services.QIDO.Studies(server, filter, headers);
        } else if (server.type === 'dimse') {
            return Services.DIMSE.Studies(filter);
        }
    }
});
