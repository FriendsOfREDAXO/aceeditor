<?php

declare(strict_types=1);

$addon = rex_addon::get('aceeditor');

if (true === rex_plugin::get('be_style', 'customizer')->isInstalled() && 1 === rex_plugin::get('be_style', 'customizer')->getConfig('codemirror')) {
    echo rex_view::warning($addon->i18n('error_codemirror'));
}

$form = rex_config_form::factory('aceeditor');

// Activate AceEditor and Selectors
$field = $form->addFieldset($addon->i18n('config_legend1'));

$field = $form->addCheckboxField('active');
$field->addOption($addon->i18n('config_active'), 1);

$field = $form->addInputField('text', 'selectors', null, ['class' => 'form-control']);
$field->setLabel($addon->i18n('config_selectors'));
$field->setNotice($addon->i18n('config_selectors_notice'));

$field = $form->addRawField('<dl class="rex-form-group form-group"><dt></dt><dd><p>'.$addon->i18n('config_infotext').'</p></dd></dl>');

// AceEditor Themes
$field = $form->addFieldset($addon->i18n('config_legend2'));

$curDir = $addon->getAssetsUrl('vendor/aceeditor/');
$themes = [];
$files = glob($curDir . 'theme-*.js');
if (false !== $files) {
    foreach ($files as $filename) {
        $themes[] = str_replace('theme-', '', substr(rex_path::basename($filename), 0, -3));
    }
}

$field = $form->addSelectField('theme', $value = null, ['class' => 'form-control selectpicker']);
$field->setLabel($addon->i18n('config_theme'));
$select = $field->getSelect();
foreach ($themes as $theme) {
    $select->addOption($theme, $theme);
}

$field = $form->addSelectField('darktheme', $value = null, ['class' => 'form-control selectpicker']);
$field->setLabel($addon->i18n('config_darktheme'));
$select = $field->getSelect();
foreach ($themes as $theme) {
    $select->addOption($theme, $theme);
}

// AceEditor Options
$field = $form->addFieldset($addon->i18n('config_legend3'));

$field = $form->addTextAreaField('options', null, ['class' => 'form-control rex-code', 'rows' => 15, 'aceeditor-theme' => 'github', 'aceeditor-mode' => 'json', 'aceeditor-options' => '{"showInvisibles": true}']);
$field->setLabel($addon->i18n('config_options'));
$field->setNotice($addon->i18n('config_options_notice'));

// AceEditor Info
$field = $form->addFieldset($addon->i18n('config_legend4'));

$field = $form->addRawField('<dl class="rex-form-group form-group"><dt></dt><dd><p>'.$addon->i18n('config_infotext1').'</p></dd></dl>');
$field = $form->addRawField('<dl class="rex-form-group form-group"><dt></dt><dd><p>'.$addon->i18n('config_infotext2').'</p></dd></dl>');
$field = $form->addRawField('<dl class="rex-form-group form-group"><dt></dt><dd><p>'.$addon->i18n('config_infotext3').'</p></dd></dl>');
$field = $form->addRawField('<dl class="rex-form-group form-group"><dt></dt><dd><p>'.$addon->i18n('config_infotext4').'</p></dd></dl>');

// Ausgabe des Formulars
$fragment = new rex_fragment();
$fragment->setVar('class', 'edit', false);
$fragment->setVar('title', $addon->i18n('aceeditor_config_title'), false);
$fragment->setVar('body', $form->get(), false);
echo $fragment->parse('core/page/section.php');
