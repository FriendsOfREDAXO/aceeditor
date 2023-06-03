/*
Ace-Editor for REDAXO-Backend and Frontend

Compress to `aceeditor.min.js` with https://jscompress.com/
*/

let aceeditorBasePath = '../assets/addons/aceeditor/vendor/aceeditor/';
let aceeditorScriptPath = aceeditorBasePath + 'ace.js';

let aceeditorExtensionList = [
    'beautify',
    'language_tools',
    'whitespace'
];

let loadAceeditorExtensions = () => {
    return new Promise((resolve, reject) => {
        let promiseData = [];
        aceeditorExtensionList.forEach(function (extension) {
            promiseData.push(loadAceeditorExtensionScript(extension));
        });
        Promise.all(promiseData).then(function () {
            //console.log('The required scripts are loaded successfully!');
            resolve({ status: true });
        }).catch(function (extension) {
            reject({
                status: false,
                message: 'Failed to load the script ' + extension
            });
        });
    }
    )
};

let loadAceeditorExtensionScript = (extension) => {
    return new Promise(function (resolve, reject) {
        try {
            let scriptData = document.createElement('script');
            scriptData.src = aceeditorBasePath + 'ext-' + extension + '.js';
            scriptData.async = false;
            scriptData.onload = () => {
                //console.log(extension + ' loaded!');
                resolve(extension);
            };
            scriptData.onerror = () => {
                //console.log(extension + ' failed to load!');
                reject(extension);
            };
            document.body.appendChild(scriptData);
        } catch (error) {
            console.log(error);
        }
    });
};

// Load Ace-Editor for textareas only in REDAXO-Backend using `jQuery` and `rex:ready`
if (typeof $ === 'function') {
    $(document).on('rex:ready', function () {

        // Select textareas
        let aceTextAreas = document.querySelectorAll(rex.aceeditor_selectors);

        // Load Ace-Editor only if needed!
        if (aceTextAreas.length > 0) {
            // Load Ace-Editor-Script
            var script = document.createElement('script');
            script.src = aceeditorScriptPath;
            script.async = false;
            document.head.appendChild(script);
            script.onload = function () {
                loadAceeditorExtensions().then(data => {
                    //console.log('Create Ace-Editor from textarea');
                    // Transform textareas to Ace-Editor
                    for (var i = 0; i < aceTextAreas.length; i++) {
                        let textArea = aceTextAreas[i];
                        editor = textAreaToAceEditor(textArea);
                    }
                })
                    .catch(err => {
                        console.error(err);
                    });
            };
        }

    });
}

// Function for transform textarea to Ace-Editor, parameter textarea-Element
function textAreaToAceEditor(textArea) {

    // Get width for Ace-Editor
    function getTextAreaWidth(textArea, fontSize) {
        if (textArea.classList.contains('rex-js-code')) { // REDAXO-Backend default Code-Textareas
            return '100%';
        }
        if (null !== textArea.getAttribute('aceeditor-width')) { // Width from textarea-Attribute
            return textArea.getAttribute('aceeditor-width');
        }
        if (null !== textArea.getAttribute('width')) { // Width from textarea-Attribute
            if (Number.isInteger(parseInt(textArea.getAttribute('width')))) {
                return textArea.getAttribute('width') + 'px';
            }
            return textArea.getAttribute('width');
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

    // Get height for Ace-Editor
    function getTextAreaHeight(textArea, fontSize) {
        if (textArea.classList.contains('rex-js-code')) { // REDAXO-Backend default Code-Textareas
            return '500px';
        }
        if (null !== textArea.getAttribute('aceeditor-height')) { // Height from textarea-Attribute
            return textArea.getAttribute('aceeditor-height');
        }
        if (null !== textArea.getAttribute('height')) { // Height from textarea-Attribute
            if (Number.isInteger(parseInt(textArea.getAttribute('height')))) {
                return textArea.getAttribute('height') + 'px';
            }
            return textArea.getAttribute('height');
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

    // Check if already Ace-Editor
    if (textArea.getAttribute('data-aceactive') === 'true') {
        return null;
    }

    // Insert PRE for Ace-Editor
    let editorNode = document.createElement('pre');
    textArea.parentNode.insertBefore(editorNode, textArea);

    // Initiate Ace-Editor and set value of textarea
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
        editor.keyBinding.$defaultHandler.commandKeyBinding = {};
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

    // Set Ace-Editor options
    editor.setOptions(ace_options);

    // Set width + height for Ace-Editor
    editorNode.style.width = getTextAreaWidth(textArea, editor.getOptions().fontSize);
    editorNode.style.height = getTextAreaHeight(textArea, editor.getOptions().fontSize);

    // Hide textarea
    textArea.style.display = 'none';
    textArea.setAttribute('data-aceactive', 'true');

    // Set theme Default
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

    // Set theme from Attribute `aceeditor-theme`
    var attrtheme = textArea.getAttribute('aceeditor-theme');
    if (null !== attrtheme) {
        theme = attrtheme;
    }

    // Set theme from Attribute `aceeditor-themedark`
    if (darkmode === true) {
        theme = rex.aceeditor_defaultdarktheme;
        var attrthemedark = textArea.getAttribute('aceeditor-themedark');
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

    // Add commands of extensions
    aceeditorExtensionList.forEach(function (extension) {
        let ext = ace.require('ace/ext/' + extension);
        if (typeof ext === 'object') {
            if (typeof ext.commands === 'object') {
                editor.commands.addCommands(ext.commands);
            }
        }
    });

    // Extension keybinding_menu
    editor.commands.addCommand({
        name: 'showKeyboardShortcuts',
        bindKey: { win: 'Ctrl-Alt-h', mac: 'Command-Alt-h' },
        exec: function (editor) {
            ace.config.loadModule('ace/ext/keybinding_menu', function (module) {
                module.init(editor);
                editor.showKeyboardShortcuts();
            });
        }
    });

    // Changes direct to original textarea
    editor.session.addEventListener('change', function (item) {
        let textArea = editorNode.nextElementSibling;
        textArea.value = editor.getSession().getValue();
    });

    return editor;
}
