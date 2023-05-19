<?php

declare(strict_types=1);

$addon = rex_addon::get('aceeditor');

$config = $addon->getConfig();

if (true === rex::isBackend() && null !== rex::getUser() && '|1|' === $addon->getConfig('active')) {

    if (true === rex_plugin::get('be_style', 'customizer')->isInstalled() && 1 === rex_plugin::get('be_style', 'customizer')->getConfig('codemirror')) {
        return;
    }

    rex_view::setJsProperty('aceeditor_selectors', $config['selectors']);
    rex_view::setJsProperty('aceeditor_defaulttheme', $config['theme']);
    rex_view::setJsProperty('aceeditor_defaultdarktheme', $config['darktheme']);
    rex_view::setJsProperty('aceeditor_options', $config['options']);

    rex_view::addCssFile($addon->getAssetsUrl('css/aceeditor.min.css'));

    rex_view::addJsFile($addon->getAssetsUrl('js/aceeditor.min.js'), [rex_view::JS_IMMUTABLE => true]);

}
