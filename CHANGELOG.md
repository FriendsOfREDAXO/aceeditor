# AceEditor - Changelog

## Version 1.0.3 - 30.05.2023

### Features

* Der AceEditor kann jetzt auch einfach im Frontend eingebunden werden https://friendsofredaxo.github.io/tricks/snippets/aceeditor_im_frontend
* Readonly-Modus wenn die Textarea das readonly-Attribut hat (z.B. `readonly` oder `readonly="readonly"`)
* Hinweis zur Verwendung in eigenen Scripten mit der JavaScript-Function `textAreaToAceEditor(textArea)`
* JavaScript `aceeditor.js`
  * Abhängigkeiten von jQuery eliminiert, jQuery wird nur noch für das Backend (rex:ready) verwendet wenn vorhanden
  * Code für die Einbindung im Frontend angepasst
  * Code besser kommentiert
  * Check ob eine Textarea an die Function `textAreaToAceEditor(textArea)` übergeben wird
  * Verbesserung um Breite/Höhe zu ermitteln bzw. zu setzen
  * Fullscreen-Modus angepasst, auch Anpassung in `aceeditor.css`
* Update AceEditor Version src-min-noconflict v1.22.0

## Version 1.0.2 - 23.05.2023

### Features

* Theme-Vorschau verbessert
* Mindesthöhe auf 200px falls Textarea kleiner ist

## Version 1.0.1 - 21.05.2023

### Features

* Hinweismeldung und Link auf die AceEditor-Einstellungen nach der Installation
* Hilfe-Text bei den Einstellungen erweitert
* Theme-Vorschau in den AceEditor-Einstellungen
* neue JavaScript-Function: textAreaToAceEditor(textArea)
  Mit dieser Function können in eigenen Scripten Textareas in AceEditor umgewandelt werden
* README.md - Link zur Testseite hinzugefügt

### Bugfixes

* Scrollbar der Webseite im FullScreen-Modus ausblenden @aeberhard
* Default-Selektoren verwenden wenn keine Selektoren in den Einstellungen gesetzt sind @aeberhard

## Version 1.0.0 - 20.05.2023

* Erste Version des AddOns erstellt von @aeberhard
* Version src-min-noconflict v1.21.1 des AceEditors - https://github.com/ajaxorg/ace-builds/releases/tag/v1.21.1
* Der Editor wird nur geladen wenn Textareas entsprechend den Optionen vorhanden sind
* Entwickelt mit rexstan und rexfactor
