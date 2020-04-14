# Projekt

[Beschreiben Sie hier in einer kurzen Zusammenfassung Hintergrund, Ziele und Funktionen Ihrer Anwendung. Fügen Sie einen sinnvollen Screenshot ein. Geben Sie eine Link zu einer lauffähigen, online-erreichbaren Version der fertigen Anwendung an.]

## Team

|                                                                                    | Infos                                                                                                                            | Implementierte Komponenten |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| <img alt="Portrait von Stefan Lippl" src="docs/christoph_meyer.jpg" width="100" /> | **Stefan Lippl**<br />E-Mail: stefan.lippl@stud.uni-regensburg.de<br />Github-Nutzer: swstudentrgb<br /> Matrikelnummer: 2046000 | TODO                       |

|                                                                                       | Infos                                                                                                                                      | Implementierte Komponenten |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| <img alt="Portrait von Christoph Meyer" src="docs/christoph_meyer.jpg" width="100" /> | **Christoph Meyer**<br />E-Mail: christoph.meyer@stud.uni-regensburg.de<br />Github-Nutzer: christophmeyer13<br /> Matrikelnummer: 2036571 | TODO                       |

## Setup und Testing

Im Starterpaket ist ein einfacher Webserver vorgegeben, mit dem Sie die Inhalte des Ordners `/app` statisch ausliefern können. Benutzen Sie diesen, um Ihre Anwendung zu entwickeln und zu testen. Sollten Sie zu Realisierung Ihrer Anwendung eine komplexere Serverkomponente benötigen, können Sie die vorhandenen Dateien (`index.js` und `lib/AppServer.js`) als Ausgangslage für eigene Erweiterungen nutzten. Speichern Sie alle weiteren, serverseitig verwendeten Dateien im Verzeichnis `/lib` ab.

So nutzen Sie den vorgegebenen Server:

1. Führen Sie **einmalig** den Befehl `npm install` aus, um die notwendigen Abhängigkeiten (`express`) zu installieren.

2. Führen Sie den Befehl `npm start` aus um die Anwendung zu starten. Der Inhalt des `/app`-Verzeichnis ist anschließend über die die Adresse `http://localhost:8000/app` erreichbar.

### Automatisches Bauen der Anwendung

Unter Umständen müssen oder wollen Sie vor dem Ausführen bzw. Bereitstellen Ihrer Anwendung bestimmte Optimierungsvorgänge durchführen (z.B. mehrere Javascript-Dateien zu einer zusammenfügen oder Grafikdateien für die Verwendung im Browser anpassen). Versuchen Sie diese Schritte mithilfe entsprechende _Node.js_-Module zu lösen und implementieren Sie die Automatisierung in der Datei `build.js`. Sie können diese Datei über den Befehl `npm run build` starten. Dabei wird vor dem Ausführen der Datei der Javascript-Code unter `app/resources/js/` auf Fehler und Warnungen (_eslint_) geprüft. Der automatisierte Bau der Software startet nur dann, wenn Ihr Code fehlerfrei ist.

[Beschreiben Sie alle Schritte, die notwendig sind um Ihre Anwendung auf Basis dieses Repositorys zu starten.]

## Beschreibung

[Dokumentieren Sie ausführlich alle Funktionen der Anwendung. Verwenden Sie Screenshots und ggf. auch Gif-Dateien um zentrale Elemente und Abläufe zu beschreiben.]
