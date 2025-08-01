<?php

declare(strict_types=1);

namespace FriendsOfRedaxo\AceEditor;

use rex;
use rex_addon;
use rex_plugin;
use rex_view;
use rex_be_controller;

$addon = rex_addon::get('aceeditor');

$config = $addon->getConfig();

if (true === rex::isBackend() && null !== rex::getUser() && '|1|' === $addon->getConfig('active')) {
    if (true === rex_plugin::get('be_style', 'customizer')->isInstalled() && 1 === rex_plugin::get('be_style', 'customizer')->getConfig('codemirror') && rex_be_controller::getCurrentPagePart(2) !== 'aceeditor') {
        return;
    }

    // Set default selectors if not present
    if ('' === $config['selectors']) {
        $config['selectors'] = 'textarea.rex-code, textarea.rex-js-code, textarea.aceeditor, textarea.codemirror';
    }

    rex_view::setJsProperty('aceeditor_selectors', $config['selectors']);
    rex_view::setJsProperty('aceeditor_defaulttheme', $config['theme']);
    rex_view::setJsProperty('aceeditor_defaultdarktheme', $config['darktheme']);
    rex_view::setJsProperty('aceeditor_options', $config['options']);

    rex_view::addCssFile($addon->getAssetsUrl('css/aceeditor.min.css'));

    rex_view::addJsFile($addon->getAssetsUrl('js/aceeditor.min.js'), [rex_view::JS_IMMUTABLE => true]);
}
