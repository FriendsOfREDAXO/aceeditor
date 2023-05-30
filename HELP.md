# AceEditor individuell verwenden

## AceEditor über Textarea-Attribute anpassen

Für die Verwendung des AceEditors mit eigenen Optionen in Modulen oder AddOns sollte für Textareas die Klasse `aceeditor` verwendet werden.

Am besten folgende Form verwenden:

```html
<textarea class="aceeditor" aceeditor-theme="eclipse" aceeditor-mode="php" aceeditor-options='{"showLineNumbers": true, "showGutter": true}'></textarea>
```

Die Default-Optionen aus den AddOn-Einstellungen werden immer angewendet!

Individuelle Optionen können über das Attribut `aceeditor-options` entsprechend gesetzt oder die Default-Optionen überschrieben werden!

Über Attribute der Textarea kann das Verhalten und die Darstellung des Editors individuell angepasst werden.

**Mögliche Attribute**

| Attribut | Mögliche Werte |
|--------- | -------------- |
| aceeditor-theme | Name des Themes z.B. `eclipse` (ohne ace/theme) |
| aceeditor-themedark | Name des Themes im Dark-Mode z.B. `dracula` (ohne ace/theme) |
| aceeditor-mode | Sprache für das Syntax-Highlighting z.B. `php`, `json`, `html` (ohne ace/mode) |
| aceeditor-options | Weitere Optionen für den AceEditor.<br>Achtung: Die Optionen müssen im korrekten JSON-Format angegeben werden!<br>z.B. `{"showLineNumbers": true, "showGutter": true}` |
| aceeditor-width | Breite des Editors, z.B. `800px`, `100%` |
| aceeditor-height | Höhe des Editors, z.B. `500px` |
| readonly | Durch das Attribut `readonly` wird der ReadOnly-Modus gesetzt |
| cols | Anzahl Spalten, wenn keine Breite angegeben wird (`aceeditor-width`), wird die Breite anhand der FontSize errechnet |
| rows | Anzahl Zeilen, wenn keine Höhe angegeben wird (`aceeditor-height`), wird die Höhe anhand der FontSize errechnet |

> **Hinweis:** Die Default-Optionen können bei individuellen Optionen über das Attribut `aceeditor-options` entsprechend überschrieben werden!

> **Hinweis:** Wird keine Breite angegeben (`aceeditor-width` oder `cols`) wird `100%` als Default verwendet. Wird keine Höhe angegeben (`aceeditor-height` oder `rows`) wird `200px` als Default verwendet.

## AceEditor in JavaScript

In Eigenen Java-Scripten im Backend kann eine Textarea über die Function `textAreaToAceEditor()` in einen AceEditor umgewandelt werden.

Beispiel:

```js
editor = textAreaToAceEditor($('textarea.themepreview')[0]);
```

Die Function liefert das editor-Objekt zurück und damit können noch individuelle Optionen gesetzt werden.

Beispiel:

```js
editor.setTheme('ace/theme/eclipse');
editor.session.setMode('ace/mode/javascript');
editor.setOptions(myoptions);
```

> **Hinweis:** Weitere Informationen zum AceEditor gibt es hier: [https://ace.c9.io/](https://ace.c9.io/)
