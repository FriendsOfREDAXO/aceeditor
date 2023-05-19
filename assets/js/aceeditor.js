// Load AceEditor for Textareas
$(document).on('rex:ready', function () {

    // Select Textareas
    let aceTextAreas = document.querySelectorAll(rex.aceeditor_selectors);

    // Load AceEditor only if needed
    if (aceTextAreas.length > 0) {

        // Load AceEditor-Script
        var script = document.createElement('script');
        script.src = '../assets/addons/aceeditor/vendor/aceeditor/ace.js';
        document.head.appendChild(script);
        script.onload = function () {

            for (var i = 0; i < aceTextAreas.length; i++) {
                let textArea = aceTextAreas[i];

                // Insert DIV for AceEditor
                let editorNode = document.createElement('div');
                editorNode.style.width = '100%';
                editorNode.style.height = $(textArea).height() + 'px' || '250px';
                textArea.parentNode.insertBefore(editorNode, textArea);

                // Hide Textarea
                textArea.style.display = 'none';

                // Initiate AceEditor and set Value
                let editor = ace.edit(editorNode);
                editor.getSession().setValue(textArea.value);

                // General Options from Settings-Page
                try {
                    ace_options = JSON.parse(rex.aceeditor_options);
                } catch (e) {
                    // Default on Error
                    ace_options = {
                        "showLineNumbers": true,
                        "showGutter": true,
                        "showInvisibles": false,
                        "fontSize": 15,
                        "mode": "ace/mode/php"
                    };
                    console.warn('Addon aceeditor: Error in aceeditor-Options! Using minimum default configuration!');
                }

                // Additional Settings from Attribute aceeditor-options
                add_options = textArea.getAttribute('aceeditor-options');
                if (null !== add_options) {
                    try {
                        new_options = JSON.parse(add_options);
                    } catch (e) {
                        // Default on Error
                        new_options = {};
                        console.warn('Addon aceeditor: Error in Attribute aceeditor-options! Options ignored!');
                    }
                    ace_options = $.extend(ace_options, new_options);
                }

                // Set options
                editor.setOptions(ace_options);

                // Set theme Default / Darkmode
                let theme = rex.aceeditor_defaulttheme;
                let darkmode = false;

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

                // Set theme from Attribute aceeditor-theme
                let attrtheme = textArea.getAttribute('aceeditor-theme');
                if (null !== attrtheme) {
                    theme = attrtheme;
                }

                // Set theme
                editor.setTheme('ace/theme/' + theme);

                // Set mode from Attribute aceeditor-mode
                let mode = textArea.getAttribute('aceeditor-mode');
                if (null !== mode) {
                    editor.getSession().setMode('ace/mode/' + mode);
                }

                // Set border color
                if (darkmode === true) {
                    editor.container.classList.add('acerexdarkmode');
                } else {
                    editor.container.classList.add('acerexmode');
                }

                // Set lineHeight
                editor.container.style.lineHeight = 1.5;
                editor.renderer.updateFontSize();

                // Fullscreen-Toggle F11 + ESC
                editor.commands.addCommand({
                    name: 'fullScreenF11',
                    bindKey: { win: 'F11', mac: 'F11' },
                    exec: function (editor) {
                        editor.container.classList.toggle('acefullscreen');
                        document.body.classList.toggle('acefullscreenbody');
                        editor.resize();
                    }
                });
                editor.commands.addCommand({
                    name: 'fullScreenESC',
                    bindKey: { win: 'ESC', mac: 'ESC' },
                    exec: function (editor) {
                        editor.container.classList.toggle('acefullscreen');
                        document.body.classList.toggle('acefullscreenbody');
                        editor.resize();
                    }
                });

                // Changes direct to Textarea
                editor.session.addEventListener('change', function (item) {
                    let textArea = editorNode.nextElementSibling;
                    textArea.value = editor.getSession().getValue();
                });
            }

        };
    }

});
