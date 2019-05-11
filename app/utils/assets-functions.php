<?php

function getAssetAbsoluteURL($assetRelativeURL)
{
    $assetRelativeURL = ltrim($assetRelativeURL, '/');

    return $_SERVER['BASE_URI'] . '/' . $assetRelativeURL;
}
