# Veranstaltungskatalog

## Technische Anforderungen

| Anforderung | Beschreibung |
|-------------|--------------|
| **Datenbank für Events** | Um Events abrufen zu können, benötigen wir eine Online-Datenbank. Hierbei greifen wir auf den Dienst "Google-Firebase (Firestore)" zurück. |
| **Datenbank für Locations** | Um Locations abrufen zu können, benötigen wir eine Online-Datenbank. Hierbei greifen wir auf den Dienst "Google-Firebase (Firestore)" zurück. |
| **Layout** | Das Grundgerüst des Layouts der gesamten Seite wird mit Hilfe von "Bootstrap" modelliert. Details und Feinheiten werden mit Hilfe von CSS angepasst. |
| **Karten** | Alle Locations werden auf einer Karte angezeigt. Um dies gewährleisten zu können verwenden wir die API von Google Maps. Das Layout der Karte wird mit Hilfe von "Google Maps Platform Styling Wizard" angepasst. |
| **Login** | Für die Speicherung von Events und Locations ist ein Login auf der Seite notwendig. Dieser wird durch den "Google Login" oder die Registrierung per Mail und Passwort umgesetzt. Für beide Fälle stellt Google eine passende API bereit. |