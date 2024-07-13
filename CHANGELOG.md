# Ace-Editor - Changelog

## Version 1.3.0 - 13.07.2023

### Features

* Update Ace-Editor Version src-min-noconflict v1.35.2
* Erweiterung der README.md
* namespace FriendsOfRedaxo\AceEditor

### Bugfixes

* Keine

## Version 1.2.1 - 03.07.2023

### Bugfixes

* Beim Update über den Installer wurden die Assets nicht aktualisiert

## Version 1.2.0 - 02.07.2023

### Updates

* Update Ace-Editor Version src-min-noconflict v1.23.1
* README.md angepasst/erweitert
* Fix rexstan errors in `pages\system.aceeditor.php`

## Version 1.1.0 - 03.06.2023

### New Features

* zusätzliche Extensions werden geladen
  * `beautify`, `keybinding_menu`, `language_tools`, `whitespace`
  * Default-Options in `package.yml` erweitert
* Attribute `height` und `width` der Textarea werden berücksichtigt. Möglich sind Pixel-Werte oder Prozentangaben

### Updates

* Wording AceEditor -> Ace-Editor geändert
* README.md überarbeitet, HELP.md in README.md übernommen, die README wird unter AddOns und bei den AddOn-Einstellungen angezeigt
* Hinweise bei den AddOn-Einstellungen erweitert
* im Redonly-Modus alle Keybindings entfernen da sonst die Editor-Einstellungen verändert werden können
* CSS für Ace-Editor-Dialoge angepasst (aceeditor.css)

### Bugfixes

* Bei Fullscreen z-index auf 9989, da sonst die Ace-Dialoge im Fullscreen-Modus hinter dem Editor lagen
* bei vorhandenem Attribut aceeditor-theme wurde der Darkmode nicht richtig berücksichtigt

## Version 1.0.3 - 31.05.2023

### Features

* Der AceEditor kann jetzt auch einfach im Frontend eingebunden werden https://friendsofredaxo.github.io/tricks/snippets/aceeditor_im_frontend
* Readonly-Modus wenn die Textarea das readonly-Attribut hat (z.B. `readonly` oder `readonly="readonly"`)
* Hinweise zur individuellen Verwendung in HELP.md ausgelagert. Anzeige am Seitenende der Einstellungen per Click.
* AceEditor kann jetzt in der Höhe geändert werden (Resize-Grabber unten rechts)
* Beim speichern der Einstellungen Refresh der Seite für die Darstellung der aktuellen Einstellungen
* neues Attribut `aceeditor-themedark` für den Dark-Mode
* JavaScript `aceeditor.js`
  * Abhängigkeiten von jQuery eliminiert, jQuery wird nur noch für das Backend (rex:ready) verwendet wenn vorhanden
  * Code für die Einbindung im Frontend angepasst
  * Code besser kommentiert
  * Check ob eine Textarea an die Function `textAreaToAceEditor(textArea)` übergeben wird
  * Check ob Textarea bereits in AceEditor umgewandelt wurde
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
