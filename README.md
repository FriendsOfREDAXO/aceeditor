# Ace-Editor - The high performance code editor for **REDAXO** - Replacement for codemirror

Dieses AddOn bindet den Code-Editor **Ace-Editor** v1.23.1 im Backend ein.
Die Einstellungen zum AddOn sind unter **System** zu finden.

Verwendet wird die *src-min-noconflict* Version v1.23.1 von https://github.com/ajaxorg/ace-builds/

https://github.com/ajaxorg/ace-builds/releases/tag/v1.23.1

Website: https://ace.c9.io/. Beispiel-Seite zum testen des Editors: https://ace.c9.io/build/kitchen-sink.html

## Ace-Editor individuell verwenden

### Ace-Editor über Textarea-Attribute anpassen

Für die Verwendung des Ace-Editors mit eigenen Optionen in Modulen oder AddOns sollte für Textareas die Klasse `aceeditor` verwendet werden.

**Beispiel**:

```html
<textarea class="aceeditor" aceeditor-theme="eclipse" aceeditor-themedark="dracula" aceeditor-mode="php" aceeditor-options='{"showLineNumbers": true, "showGutter": true}'></textarea>
```

> **Hinweis:** Die Default-Optionen aus den AddOn-Einstellungen werden immer angewendet!

Individuelle Optionen können über das Attribut `aceeditor-options` entsprechend gesetzt, oder die Default-Optionen überschrieben werden!

Über Attribute der Textarea kann das Verhalten und die Darstellung des Editors individuell angepasst werden.

**Mögliche Attribute**

| Attribut | Mögliche Werte |
|--------- | -------------- |
| aceeditor-theme | Name des Themes z.B. `eclipse` (ohne ace/theme) |
| aceeditor-themedark | Name des Themes im Dark-Mode z.B. `dracula` (ohne ace/theme) |
| aceeditor-mode | Sprache für das Syntax-Highlighting z.B. `php`, `json`, `html`, `javascript`, `yaml`, `xml` (ohne ace/mode) |
| aceeditor-options | Weitere Optionen für den Ace-Editor.<br>Achtung: Die Optionen müssen im korrekten JSON-Format angegeben werden!<br>z.B. `{"showLineNumbers": true, "showGutter": true}` |
| aceeditor-width | Breite des Editors, z.B. `800px`, `100%` |
| aceeditor-height | Höhe des Editors, z.B. `500px` |
| readonly | Durch das Attribut `readonly` wird der ReadOnly-Modus gesetzt |
| cols | Anzahl Spalten, wenn keine Breite (`aceeditor-width`) angegeben wird, wird die Breite anhand der FontSize errechnet |
| rows | Anzahl Zeilen, wenn keine Höhe (`aceeditor-height`) angegeben wird, wird die Höhe anhand der FontSize errechnet |
| width | Breite des Editors, z.B. `800`, `100%` |
| height | Höhe des Editors, z.B. `500`, `50%` |

> **Hinweis:** Die Default-Optionen können über das Attribut `aceeditor-options` entsprechend überschrieben werden!

> **Hinweis:** Wird keine Breite angegeben (`aceeditor-width`, `width` oder `cols`) wird `100%` als Default verwendet. Wird keine Höhe angegeben (`aceeditor-height`, `height` oder `rows`) wird `200px` als Default verwendet.

### Ace-Editor in JavaScript

In eigenen Java-Scripten im Backend kann eine Textarea über die Function `textAreaToAceEditor()` in einen Ace-Editor umgewandelt werden.

Die Optionen aus den AddOn-Einstellungen werden automatisch angewendet.

**Beispiel**:

```js
<script>
editor = textAreaToAceEditor($('textarea.themepreview')[0]);
</script>
```

Die Function liefert das `editor`-Objekt zurück und damit können noch weitere individuelle Optionen gesetzt werden.

**Beispiel**:

```js
<script>
editor.setTheme('ace/theme/eclipse');
editor.session.setMode('ace/mode/javascript');
editor.setOptions(myoptions);
</script>
```

> **Hinweis:** Weitere Informationen zum Ace-Editor gibt es hier: [https://ace.c9.io/](https://ace.c9.io/)

### Optionen für geladene Erweiterungen

Die folgenden Erweitertungen werden zusätzlich geladen:

`beautify`, `keybinding_menu`, `language_tools`, `whitespace`

Die Erweiterungen `beautify`, `keybinding_menu`, `whitespace` stellen Keyboard-Shortcuts zur Verfügung.

Die Erweiterung language_tools kann durch die folgenden Optionen konfiguriert werden.

```js
"enableBasicAutocompletion": true|false
"enableSnippets": true|false
"enableLiveAutocompletion": true|false
```

**sonstige nützliche Optionen**

```js
"customScrollbar": true|false
```

> **Hinweis:** Der Ace-Editor kann auch im Frontend eingebunden werden: https://friendsofredaxo.github.io/tricks/snippets/aceeditor_im_frontend
