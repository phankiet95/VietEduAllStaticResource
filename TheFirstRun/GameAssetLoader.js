// Init all the Asset
$(document).ready(function () {
    loadAsset(window.gameCustomAsset);
});

function loadAsset(asset) {
    asset.forEach(element => {
        loadAssetAndDestroy(element);
    });
}

function loadAssetAndDestroy(element) {
    if (element.type == CONST_ICON) {
        $(`#${element.name}`).attr('href', element.base64);
        console.log('GamePlayAssetLoader.AssetLoaded: CONST_ICON', element.name);
    }

    if (element.type == CONST_AUDIO) {
        $(`#${element.name}`).attr('src', element.base64);
        console.log('GamePlayAssetLoader.AssetLoaded: CONST_AUDIO', element.name);
    }

    if (element.type == CONST_IMAGE) {
        $(`#${element.name}`).attr('src', element.base64);
        console.log('GamePlayAssetLoader.AssetLoaded: CONST_IMAGE', element.name);
    }

    if (element.type == CONST_VIDEO) {
        $(`#${element.name}`).attr('src', element.base64);
        console.log('GamePlayAssetLoader.AssetLoaded: CONST_VIDEO', element.name);
    }

    if (element.type == CONST_CONTROL_SELECTBOX) {
        loadSelectOption(`#${element.name}`, element.data, false);
    }

    if (element.destroy != 'false') {
        element.base64 = '';
        console.log('element.name cleared');
    }

}