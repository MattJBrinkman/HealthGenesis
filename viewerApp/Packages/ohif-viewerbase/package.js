Package.describe({
    name: 'ohif:viewerbase',
    summary: 'Shared components and functions for Meteor DICOM Viewers',
    version: '0.0.1'
});

Package.onUse(function(api) {
    api.versionsFrom('1.4');

    api.use('ecmascript');
    api.use('standard-app-packages');
    api.use('http');
    api.use('jquery');
    api.use('stylus');
    api.use('momentjs:moment');
    api.use('validatejs');

    // Our custom packages
    api.use('ohif:design');
    api.use('ohif:core');
    api.use('ohif:log');

    const assets = [
        'assets/icons.svg',
        'assets/fonts/Roboto-Black-latin-ext.woff',
        'assets/fonts/Roboto-Black-latin-ext.woff2',
        'assets/fonts/Roboto-Black-latin.woff',
        'assets/fonts/Roboto-Black-latin.woff2',
        'assets/fonts/Roboto-BlackItalic-latin-ext.woff',
        'assets/fonts/Roboto-BlackItalic-latin-ext.woff2',
        'assets/fonts/Roboto-BlackItalic-latin.woff',
        'assets/fonts/Roboto-BlackItalic-latin.woff2',
        'assets/fonts/Roboto-Bold-latin-ext.woff',
        'assets/fonts/Roboto-Bold-latin-ext.woff2',
        'assets/fonts/Roboto-Bold-latin.woff',
        'assets/fonts/Roboto-Bold-latin.woff2',
        'assets/fonts/Roboto-BoldItalic-latin-ext.woff',
        'assets/fonts/Roboto-BoldItalic-latin-ext.woff2',
        'assets/fonts/Roboto-BoldItalic-latin.woff',
        'assets/fonts/Roboto-BoldItalic-latin.woff2',
        'assets/fonts/Roboto-Italic-latin-ext.woff',
        'assets/fonts/Roboto-Italic-latin-ext.woff2',
        'assets/fonts/Roboto-Italic-latin.woff',
        'assets/fonts/Roboto-Italic-latin.woff2',
        'assets/fonts/Roboto-Light-latin-ext.woff',
        'assets/fonts/Roboto-Light-latin-ext.woff2',
        'assets/fonts/Roboto-Light-latin.woff',
        'assets/fonts/Roboto-Light-latin.woff2',
        'assets/fonts/Roboto-LightItalic-latin-ext.woff',
        'assets/fonts/Roboto-LightItalic-latin-ext.woff2',
        'assets/fonts/Roboto-LightItalic-latin.woff',
        'assets/fonts/Roboto-LightItalic-latin.woff2',
        'assets/fonts/Roboto-Medium-latin-ext.woff',
        'assets/fonts/Roboto-Medium-latin-ext.woff2',
        'assets/fonts/Roboto-Medium-latin.woff',
        'assets/fonts/Roboto-Medium-latin.woff2',
        'assets/fonts/Roboto-MediumItalic-latin-ext.woff',
        'assets/fonts/Roboto-MediumItalic-latin-ext.woff2',
        'assets/fonts/Roboto-MediumItalic-latin.woff',
        'assets/fonts/Roboto-MediumItalic-latin.woff2',
        'assets/fonts/Roboto-Regular-latin-ext.woff',
        'assets/fonts/Roboto-Regular-latin-ext.woff2',
        'assets/fonts/Roboto-Regular-latin.woff',
        'assets/fonts/Roboto-Regular-latin.woff2',
        'assets/fonts/Roboto-Thin-latin-ext.woff',
        'assets/fonts/Roboto-Thin-latin-ext.woff2',
        'assets/fonts/Roboto-Thin-latin.woff',
        'assets/fonts/Roboto-Thin-latin.woff2',
        'assets/fonts/Roboto-ThinItalic-latin-ext.woff',
        'assets/fonts/Roboto-ThinItalic-latin-ext.woff2',
        'assets/fonts/Roboto-ThinItalic-latin.woff',
        'assets/fonts/Roboto-ThinItalic-latin.woff2',
        'assets/fonts/Sanchez-Regular-latin-ext.woff',
        'assets/fonts/Sanchez-Regular-latin-ext.woff2',
        'assets/fonts/Sanchez-Regular-latin.woff',
        'assets/fonts/Sanchez-Regular-latin.woff2'
    ];

    api.addAssets(assets, 'client');


    // TODO: Use NPM depends for these
    api.addFiles('client/compatibility/jquery.hotkeys.js', 'client', {
        bare: true
    });
    api.addFiles('client/compatibility/dialogPolyfill.js', 'client', {
        bare: true
    });
    api.addFiles('client/compatibility/dialogPolyfill.styl', 'client');

    // ---------- Components ----------

    // Basic components
    api.addFiles('client/components/basic/layout/layout.html', 'client');
    api.addFiles('client/components/basic/layout/layout.styl', 'client');
    api.addFiles('client/components/basic/loadingText/loadingText.html', 'client');
    api.addFiles('client/components/basic/loadingText/loadingText.styl', 'client');

    api.addFiles('client/components/basic/removableBackdrop/removableBackdrop.html', 'client');
    api.addFiles('client/components/basic/removableBackdrop/removableBackdrop.styl', 'client');

    api.addFiles('client/components/basic/aboutModal/aboutModal.html', 'client');
    api.addFiles('client/components/basic/aboutModal/aboutModal.js', 'client');
    api.addFiles('client/components/basic/aboutModal/aboutModal.styl', 'client');

    // Study Browser components
    api.addFiles('client/components/studyBrowser/studyBrowser/studyBrowser.html', 'client');
    api.addFiles('client/components/studyBrowser/studyBrowser/studyBrowser.js', 'client');
    api.addFiles('client/components/studyBrowser/studyBrowser/studyBrowser.styl', 'client');

    api.addFiles('client/components/studyBrowser/thumbnailEntry/thumbnailEntry.html', 'client');
    api.addFiles('client/components/studyBrowser/thumbnailEntry/thumbnailEntry.js', 'client');
    api.addFiles('client/components/studyBrowser/thumbnailEntry/thumbnailEntry.styl', 'client');

    api.addFiles('client/components/studyBrowser/imageThumbnail/imageThumbnail.html', 'client');
    api.addFiles('client/components/studyBrowser/imageThumbnail/imageThumbnail.js', 'client');
    api.addFiles('client/components/studyBrowser/imageThumbnail/imageThumbnail.styl', 'client');

    // Viewer components
    api.addFiles('client/components/viewer/imageViewerViewport/imageViewerViewport.html', 'client');
    api.addFiles('client/components/viewer/imageViewerViewport/imageViewerViewport.js', 'client');
    api.addFiles('client/components/viewer/imageViewerViewport/imageViewerViewport.styl', 'client');

    api.addFiles('client/components/viewer/gridLayout/gridLayout.html', 'client');
    api.addFiles('client/components/viewer/gridLayout/gridLayout.js', 'client');
    api.addFiles('client/components/viewer/gridLayout/gridLayout.styl', 'client');

    api.addFiles('client/components/viewer/loadingIndicator/loadingIndicator.html', 'client');
    api.addFiles('client/components/viewer/loadingIndicator/loadingIndicator.js', 'client');
    api.addFiles('client/components/viewer/loadingIndicator/loadingIndicator.styl', 'client');

    api.addFiles('client/components/viewer/annotationDialogs/annotationDialogs.html', 'client');
    api.addFiles('client/components/viewer/annotationDialogs/annotationDialogs.js', 'client');
    api.addFiles('client/components/viewer/annotationDialogs/annotationDialogs.styl', 'client');

    api.addFiles('client/components/viewer/viewportOrientationMarkers/viewportOrientationMarkers.html', 'client');
    api.addFiles('client/components/viewer/viewportOrientationMarkers/viewportOrientationMarkers.styl', 'client');

    api.addFiles('client/components/viewer/viewportOverlay/viewportOverlay.html', 'client');
    api.addFiles('client/components/viewer/viewportOverlay/viewportOverlay.js', 'client');
    api.addFiles('client/components/viewer/viewportOverlay/viewportOverlay.styl', 'client');

    api.addFiles('client/components/viewer/viewerMain/viewerMain.html', 'client');
    api.addFiles('client/components/viewer/viewerMain/viewerMain.js', 'client');
    api.addFiles('client/components/viewer/viewerMain/viewerMain.styl', 'client');

    api.addFiles('client/components/viewer/imageControls/imageControls.html', 'client');
    api.addFiles('client/components/viewer/imageControls/imageControls.js', 'client');
    api.addFiles('client/components/viewer/imageControls/imageControls.styl', 'client');

    api.addFiles('client/components/viewer/layoutButton/layoutButton.html', 'client');
    api.addFiles('client/components/viewer/layoutButton/layoutButton.js', 'client');

    api.addFiles('client/components/viewer/layoutChooser/layoutChooser.html', 'client');
    api.addFiles('client/components/viewer/layoutChooser/layoutChooser.js', 'client');
    api.addFiles('client/components/viewer/layoutChooser/layoutChooser.styl', 'client');

    api.addFiles('client/components/viewer/cineDialog/cineDialog.html', 'client');
    api.addFiles('client/components/viewer/cineDialog/cineDialog.js', 'client');
    api.addFiles('client/components/viewer/cineDialog/cineDialog.styl', 'client');

    api.addFiles('client/components/viewer/toolbarSectionButton/toolbarSectionButton.html', 'client');
    api.addFiles('client/components/viewer/toolbarSectionButton/toolbarSectionButton.js', 'client');
    api.addFiles('client/components/viewer/toolbarSectionButton/toolbarSectionButton.styl', 'client');

    api.addFiles('client/components/viewer/toolbarSectionTools/toolbarSectionTools.html', 'client');
    api.addFiles('client/components/viewer/toolbarSectionTools/toolbarSectionTools.js', 'client');
    api.addFiles('client/components/viewer/toolbarSectionTools/toolbarSectionTools.styl', 'client');

    api.addFiles('client/components/viewer/playClipButton/playClipButton.html', 'client');
    api.addFiles('client/components/viewer/playClipButton/playClipButton.js', 'client');

    api.addFiles('client/components/viewer/confirmDeleteDialog/confirmDeleteDialog.html', 'client');
    api.addFiles('client/components/viewer/confirmDeleteDialog/confirmDeleteDialog.js', 'client');
    api.addFiles('client/components/viewer/confirmDeleteDialog/confirmDeleteDialog.styl', 'client');

    api.addFiles('client/components/viewer/textMarkerDialogs/textMarkerDialogs.html', 'client');
    api.addFiles('client/components/viewer/textMarkerDialogs/textMarkerDialogs.js', 'client');
    api.addFiles('client/components/viewer/textMarkerDialogs/textMarkerDialogs.styl', 'client');

    api.addFiles('client/components/viewer/displaySetNavigation/displaySetNavigation.html', 'client');
    api.addFiles('client/components/viewer/displaySetNavigation/displaySetNavigation.js', 'client');

    api.addFiles('client/components/viewer/studySeriesQuickSwitch/studySeriesQuickSwitch.html', 'client');
    api.addFiles('client/components/viewer/studySeriesQuickSwitch/studySeriesQuickSwitch.styl', 'client');
    api.addFiles('client/components/viewer/studySeriesQuickSwitch/studySeriesQuickSwitch.js', 'client');

    api.addFiles('client/components/viewer/studyTimepointBrowser/studyTimepoint.html', 'client');
    api.addFiles('client/components/viewer/studyTimepointBrowser/studyTimepoint.styl', 'client');
    api.addFiles('client/components/viewer/studyTimepointBrowser/studyTimepoint.js', 'client');

    api.addFiles('client/components/viewer/studyTimepointBrowser/studyTimepointBrowser.html', 'client');
    api.addFiles('client/components/viewer/studyTimepointBrowser/studyTimepointBrowser.styl', 'client');
    api.addFiles('client/components/viewer/studyTimepointBrowser/studyTimepointBrowser.js', 'client');

    api.addFiles('client/components/viewer/studyTimepointBrowser/studyTimepointStudy.html', 'client');
    api.addFiles('client/components/viewer/studyTimepointBrowser/studyTimepointStudy.styl', 'client');
    api.addFiles('client/components/viewer/studyTimepointBrowser/studyTimepointStudy.js', 'client');

    api.export('dialogPolyfill', 'client');

    api.mainModule('main.js', 'client');

});
