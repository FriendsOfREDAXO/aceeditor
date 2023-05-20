<?php

declare(strict_types=1);

$addon = rex_addon::get('aceeditor');

/* AceEditor-Assets entpacken */
$message = '';
$zipArchive = new ZipArchive();

// use path relative to __DIR__ to get correct path in update temp dir
$path = __DIR__ . '/assets/vendor/aceeditor.zip';

try {
    if (true === $zipArchive->open($path) &&
        $zipArchive->extractTo($addon->getAssetsPath('vendor/'))
    ) {
        $zipArchive->close();
    } else {
        $message = rex_i18n::msg('aceeditor_error_unzip') . '<br>' . $path;
    }
} catch (Exception $exception) {
    $message = rex_i18n::msg('aceeditor_error_unzip') . '<br>' . $path;
    $message .= '<br>' . $exception->getMessage();
}

if (!$addon->hasConfig('theme')) {
    $addon->setConfig('theme', 'eclipse');
}

if (!$addon->hasConfig('darktheme')) {
    $addon->setConfig('darktheme', 'dracula');
}

if ('' !== $message) {
    throw new rex_functional_exception($message);
}

$addon->setProperty('successmsg', rex_i18n::rawMsg('aceeditor_success_message', '<a href="' . rex_url::backendPage('system/aceeditor') . '">' . $addon->i18n('aceeditor_title') . '</a>'));
