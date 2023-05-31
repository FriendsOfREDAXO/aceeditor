/*
AceEditor for REDAXO-Backend and Frontend

Compress to `aceeditor.min.js` with https://jscompress.com/
*/

// Load AceEditor for textareas only in REDAXO-Backend using `jQuery` and `rex:ready`
if (typeof $ === 'function') {
    $(document).on('rex:ready', function () {

        // Select textareas
        let aceTextAreas = document.querySelectorAll(rex.aceeditor_selectors);

        // Load AceEditor only if needed!
        if (aceTextAreas.length > 0) {
            // Load AceEditor-Script
            var script = document.createElement('script');
            script.src = '../assets/addons/aceeditor/vendor/aceeditor/ace.js';
            document.head.appendChild(script);
            script.onload = function () {
                // Transform textareas to AceEditor
                for (var i = 0; i < aceTextAreas.length; i++) {
                    let textArea = aceTextAreas[i];
                    editor = textAreaToAceEditor(textArea);
                }
            };
        }

    });
}

// Function for transform textarea to AceEditor, parameter textarea-Element
function textAreaToAceEditor(textArea) {

    // Get width for AceEditor
    function getTextAreaWidth(textArea, fontSize) {
        if (textArea.classList.contains('rex-js-code')) { // REDAXO-Backend default Code-Textareas
            return '100%';
        }
        if (null !== textArea.getAttribute('aceeditor-width')) { // Width from textarea-Attribute
            return textArea.getAttribute('aceeditor-width');
        }
        if (null !== textArea.getAttribute('cols')) { // Calc with from cols-Attribute
            width = Number(Number(textArea.getAttribute('cols')) + 1) * (Number(fontSize) / 1.5);
            return width + 'px';
        }
        width = textArea.offsetWidth; // Width from textarea
        if (width < 400) {
            return '100%'; // default to 100%
        }
        return width + 'px';
    }

    // Get height for AceEditor
    function getTextAreaHeight(textArea, fontSize) {
        if (textArea.classList.contains('rex-js-code')) { // REDAXO-Backend default Code-Textareas
            return '500px';
        }
        if (null !== textArea.getAttribute('aceeditor-height')) { // Height from textarea-Attribute
            return textArea.getAttribute('aceeditor-height');
        }
        if (null !== textArea.getAttribute('rows')) { // Calc height from rows-Attribute
            height = Number(Number(textArea.getAttribute('rows')) + 1) * 1.5 * Number(fontSize);
            return height + 'px';
        }
        height = textArea.offsetHeight; // Height from textarea
        if (height < 200) {
            height = 200; // default to 200px
        }
        return height + 'px';
    }

    // Check parameter textArea
    if (!textArea || textArea.tagName.toLowerCase() !== 'textarea') {
        console.warn('Addon aceeditor: Invalid Parameter for function textAreaToAceEditor()! Use only <textarea> as parameter!');
        return null;
    }

    // Check if already AceEditor
    if (textArea.getAttribute('data-aceactive') === 'true') {
        return null;
    }

    // Insert DIV for AceEditor
    let editorNode = document.createElement('div');
    textArea.parentNode.insertBefore(editorNode, textArea);

    // Initiate AceEditor and set value of textarea
    let editor = ace.edit(editorNode);
    editor.getSession().setValue(textArea.value);

    // Default options
    default_options = {
        "showLineNumbers": true,
        "showGutter": true,
        "showInvisibles": false,
        "fontSize": 15,
        "mode": "ace/mode/php"
    };

    // General options from Settings-Page
    if (typeof rex === 'object') {
        try {
            ace_options = JSON.parse(rex.aceeditor_options);
        } catch (error) {
            // Default options on Error
            ace_options = default_options;
            console.warn('Addon aceeditor: Error in aceeditor-Options! Using minimum default configuration!\n' + error);
        }
    } else {
        ace_options = default_options;
    }

    // readonly from Textarea-Attribute
    if (null !== textArea.getAttribute('readonly')) {
        editor.setReadOnly(true);
    }

    // Additional settings from attribute `aceeditor-options`
    add_options = textArea.getAttribute('aceeditor-options');
    if (null !== add_options) {
        try {
            new_options = JSON.parse(add_options);
        } catch (e) {
            // Ignore on Error
            new_options = {};
            console.warn('Addon aceeditor: Error in Attribute aceeditor-options! Options ignored!');
        }
        ace_options = Object.assign(ace_options, new_options);
    }

    // Set AceEditor options
    editor.setOptions(ace_options);

    // Set width + height for AceEditor
    editorNode.style.width = getTextAreaWidth(textArea, editor.getOptions().fontSize);
    editorNode.style.height = getTextAreaHeight(textArea, editor.getOptions().fontSize);

    // Hide textarea
    textArea.style.display = 'none';
    textArea.setAttribute('data-aceactive', 'true');

    // Set theme Default / Darkmode
    let theme = 'eclipse';
    if (typeof rex === 'object') {
        theme = rex.aceeditor_defaulttheme;
    }
    let darkmode = false;

    if (typeof rex === 'object') {
        let systemDarkModeDetector = null;
        if (window.matchMedia) {
            systemDarkModeDetector = window.matchMedia('(prefers-color-scheme: dark)');
            // Query system settings
            if (systemDarkModeDetector.matches) {
                theme = rex.aceeditor_defaultdarktheme;
                darkmode = true;
            }
            // Setting from profile
            if (document.body.classList.contains('rex-theme-light')) {
                theme = rex.aceeditor_defaulttheme;
            } else if (document.body.classList.contains('rex-theme-dark')) {
                theme = rex.aceeditor_defaultdarktheme;
                darkmode = true;
            }
            // Detect dark/light switching on the system side
            systemDarkModeDetector.addEventListener('change', function (e) {
                if (systemDarkModeDetector.matches) {
                    theme = rex.aceeditor_defaultdarktheme;
                    darkmode = true;
                } else {
                    theme = rex.aceeditor_defaulttheme;
                }
                if (document.body.classList.contains('rex-theme-light')) {
                    theme = rex.aceeditor_defaulttheme;
                } else if (document.body.classList.contains('rex-theme-dark')) {
                    theme = rex.aceeditor_defaultdarktheme;
                    darkmode = true;
                }
            });
        }
    }

    // Set theme from Attribute `aceeditor-theme` or `aceeditor-themedark`
    let attrtheme = textArea.getAttribute('aceeditor-theme');
    if (null !== attrtheme) {
        theme = attrtheme;
    }
    if (darkmode === true) {
        let attrthemedark = textArea.getAttribute('aceeditor-themedark');
        if (null !== attrthemedark) {
            theme = attrthemedark;
        }
    }

    // Set theme
    editor.setTheme('ace/theme/' + theme);

    // Set mode from Attribute `aceeditor-mode`
    let mode = textArea.getAttribute('aceeditor-mode');
    if (null !== mode) {
        editor.getSession().setMode('ace/mode/' + mode);
    }

    // Set border color (assets/aceeditor.css)
    if (darkmode === true) {
        editor.container.classList.add('acerexdarkmode');
    } else {
        editor.container.classList.add('acerexmode');
    }

    // Set lineHeight
    editor.container.style.lineHeight = 1.5;
    editor.renderer.updateFontSize();

    // Fullscreen-Toggle F11
    editor.commands.addCommand({
        name: 'fullScreenF11',
        bindKey: { win: 'F11', mac: 'F11' },
        exec: function (editor) {
            editor.container.classList.toggle('acefullscreen');
            document.querySelector('html').classList.toggle('acefullscreenhtml');
            editor.resize();
        }
    });

    // Fullscreen-Toggle ESC
    editor.commands.addCommand({
        name: 'fullScreenESC',
        bindKey: { win: 'ESC', mac: 'ESC' },
        exec: function (editor) {
            editor.container.classList.toggle('acefullscreen');
            document.querySelector('html').classList.toggle('acefullscreenhtml');
            editor.resize();
        }
    });

    // Changes direct to original textarea
    editor.session.addEventListener('change', function (item) {
        let textArea = editorNode.nextElementSibling;
        textArea.value = editor.getSession().getValue();
    });

    return editor;
}