// Init all the Asset
$(document).ready(function () {

    loadAsset(window.commonAsset);

    loadAsset(window.gameCustomAsset);

});

function loadAsset(asset){
    asset.forEach(element => {
        loadAssetAndDestroy(element);
    });
}

function loadAssetAndDestroy(element){
    if (element.type == CONST_ICON) {
        $(`[name=${element.name}]`).attr('href', element.base64);
    }

    if (element.type == CONST_AUDIO) {
        $(`[name=${element.name}]`).attr('src', element.base64);
    }

    if (element.type == CONST_IMAGE) {
        $(`[name=${element.name}]`).attr('src', element.base64);
    }

    if (element.type == CONST_CONTROL_SELECTBOX) {
        loadSelectOption(`[name=${element.name}]`, element.data, false);
    }
    
    element.base64 = '';
}