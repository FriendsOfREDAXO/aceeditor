<?php

declare(strict_types=1);

namespace FriendsOfRedaxo\AceEditor;

use rex_addon;

$addon = rex_addon::get('aceeditor');

/* Ace-Editor-Assets entpacken */
$addon->includeFile(__DIR__ . '/install.php');
