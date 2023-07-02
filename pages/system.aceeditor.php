<?php

declare(strict_types=1);

$addon = rex_addon::get('aceeditor');

if ('' !== rex_post('_csrf_token', 'string', '')) {
    echo '<script>window.location.href = "' . rex_url::backendPage('system/aceeditor') . '"</script>';
}

if (true === rex_plugin::get('be_style', 'customizer')->isInstalled() && 1 === rex_plugin::get('be_style', 'customizer')->getConfig('codemirror')) {
    echo rex_view::warning($addon->i18n('error_codemirror'));
}

$form = rex_config_form::factory('aceeditor');

// Activate AceE-ditor and Selectors
$form->addFieldset($addon->i18n('config_legend1'));

$field = $form->addCheckboxField('active');
$field->addOption($addon->i18n('config_active'), 1);

$field = $form->addInputField('text', 'selectors', null, ['class' => 'form-control']);
$field->setLabel($addon->i18n('config_selectors'));
$field->setNotice($addon->i18n('config_selectors_notice'));

$field = $form->addRawField('<dl class="rex-form-group form-group"><dt></dt><dd><p>'.$addon->i18n('config_infotext').'</p></dd></dl>');

// Ace-Editor Themes
$form->addFieldset($addon->i18n('config_legend2'));

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

$field = $form->addRawField('<dl class="rex-form-group form-group"><dt>' . $addon->i18n('config_theme_preview') . '</dt><dd><textarea class="form-control rex-js-code themepreview" readonly rows="15" data-theme="' . $addon->getConfig('theme') . '">
<?php
function nfact($n) {
    if ($n == 0) {
        return 1;
    }
    else {
        return $n * nfact($n - 1);
    }
}

echo "\n\nPlease enter a whole number ... ";
$num = trim(fgets(STDIN));

// ===== PROCESS - Determing the factorial of the input number =====
$output = "\n\nFactorial " . $num . " = " . nfact($num) . "\n\n";
echo $output;
</textarea></dd></dl>');

// Ace-Editor Options
$form->addFieldset($addon->i18n('config_legend3'));

$field = $form->addTextAreaField('options', null, ['class' => 'form-control rex-js-code', 'rows' => 15, 'aceeditor-theme' => 'github', 'aceeditor-themedark' => 'cobalt', 'aceeditor-mode' => 'json', 'aceeditor-options' => '{"showInvisibles": true}']);
$field->setLabel($addon->i18n('config_options'));
$field->setNotice($addon->i18n('config_options_notice'));

// Ace-Editor Info aus README.md
$helptext = 'README.md not found';

$path = rex_path::addon('aceeditor') . 'README.md';
$languagePath = substr($path, 0, -3) . '.' . rex_i18n::getLanguage() . '.md';
if (is_readable($languagePath)) {
    $path = $languagePath;
}

$file = rex_file::get($path);
if (null !== $file) {
    $parser = rex_markdown::factory();
    $helptext = $parser->parse($file);

    $html = '
    <div class="panel panel-default">
        <header class="panel-heading collapsed" data-toggle="collapse" data-target="#collapse-aceeditorinfo">
            <div class="panel-title"><h4><i class="rex-icon rex-icon-info"></i> ' . $addon->i18n('config_legend4') . '</h4></div>
        </header>
        <div id="collapse-aceeditorinfo" class="panel-collapse collapse">
            <div class="rex-docs"><article class="rex-docs-content">' . $helptext . '</article></div>
        </div>
    </div>
    ';
    $field = $form->addRawField($html);
}

// Ausgabe des Formulars
$fragment = new rex_fragment();
$fragment->setVar('class', 'edit', false);
$fragment->setVar('title', $addon->i18n('aceeditor_config_title'), false);
$fragment->setVar('body', $form->get(), false);
echo $fragment->parse('core/page/section.php');
?>

<script>
$(document).on('rex:ready', function () {
    $('#aceeditor-themes-theme').on('change', function() {
        $('textarea.themepreview').prev().remove();
        $('textarea.themepreview')[0].style.display = 'block';
        $('textarea.themepreview')[0].setAttribute('data-aceactive', 'false');
        editor = textAreaToAceEditor($('textarea.themepreview')[0]);
        editor.setTheme('ace/theme/' + this.value);
        $('textarea.themepreview').data('theme', this.value);
    });

    $('#aceeditor-themes-darktheme').on('change', function() {
        $('textarea.themepreview').prev().remove();
        $('textarea.themepreview')[0].style.display = 'block';
        $('textarea.themepreview')[0].setAttribute('data-aceactive', 'false');
        editor = textAreaToAceEditor($('textarea.themepreview')[0]);
        editor.setTheme('ace/theme/' + this.value);
        $('textarea.themepreview').data('theme', this.value);
    });

    $('.dropdown-toggle').on('focus', function() {
        if ($(this).attr('title') != $('textarea.themepreview').data('theme')) {
            $('textarea.themepreview').prev().remove();
            $('textarea.themepreview')[0].style.display = 'block';
            $('textarea.themepreview')[0].setAttribute('data-aceactive', 'false');
            editor = textAreaToAceEditor($('textarea.themepreview')[0]);
            editor.setTheme('ace/theme/' + $(this).attr('title'));
            $('textarea.themepreview').data('theme', $(this).attr('title'));
        }
    });
});
</script>
