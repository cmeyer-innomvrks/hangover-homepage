# Quellcode (Client)

Speichern Sie hier Ihr den Client-Code Ihres Projekt ab. Dazu gehören auch HTML- und CSS-Dateien sowie weitere Medieninhalte. Ersetzten Sie diesen Text durch eine kurze Beschreibung der Struktur bzw. Architektur Ihres Codes.

Die HTML-Dateien index.html sowie alle Dateien im Unterordner ./sites bilden das Grundgerüst unserers Client-Interfaces. Der Ordner ./resources wurde wiefolgt aufgeteilt:

- ./resources/css: Beinhaltet alle Stylesheets
- ./resources/img: Beinhaltet die Image-assets
- ./resources/partials: Beinhaltet Style-Komponenten der Nav-Bar
- ./resources/scss: Gehört ebenfalls zum Menü
- ./resources/js: Enthält alle Skripte der Anwendung

Der ./resources/js Ordner beinhaltet folgende Struktur:

- ./resources/js/: Enthält alle Skripte, die in die einzelnen Pages eingebunden werden und als Controller fungieren
- ./resources/js/filter: Enthält die Model-Klassen für die Filterfunktionalitäten der Listen
- ./resources/js/FirebaseDownloader: Enthält alle Module die für den Down- und Upload der Firebase fungieren
- ./resources/js/Maps: Enthält einen Geocoder, sowie eine Datei, die den API-Key der Karte hält
- ./resources/js/SavedItems: Enthält Module, die zur Speicherung von Events und Locations notwendig sind
- ./resources/js/UI: Enthält alle UI-Elemente der Anwendung
- ./resources/js/utils: Enthält ein Event/Observable-Modul
