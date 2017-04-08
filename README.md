# YouTube-Watcher-Chrome-Plugin
Prosty dodatek do przeglądarki Google Chrome™ (Chromium) wyświetlający powiadomienie, gdy ktoś z określonej listy doda nowy film.

# Instalacja
- Przejdź pod adres `chrome://extensions/`
- Przeciągnij plik `chrome_addon.crx` do okna przeglądarki Chrome.

# Modyfikacja
- Wiedzę na temat tworzenia modyfikacji najlepiej czerpać od twórców Zacznij pracę na [developer.chrome.com](https://developer.chrome.com/extensions/getstarted)
- W trakcie prac, najwygodniej załaczyć dodatek prosto z plików, należy:
  - przejść pod adres `chrome://extensions/`, zaznaczyć checkbox `Tryb Programisty`,
  - nacisnąć guzik `Wczytaj rozszerzenie bez pakietu...`
  - po modyfikacji plików należy odświeżyć rozszerzenie w Chrome
  - podać ścieżkę do folderu zawierającego pliki aplikacji (musi zawierać plik `manifest.json`)
- Gdy rozszerzenie jest gotowe, za pomocą przeglądarki. można wygenerować plik `.crx`. W menu rozszerzeń należy użyć przycisku `Umieść rozszerzenie w pakiecie...`. Przy pierwszym tworzeniu, należy pozostawić puste pole na klucz. Przy każdej kolejnej aktualizacji należy wprowadzić plik z kluczem, który jest generowany wrac z pierwszym utworzeniem pliku `.crx`

# Dodawnie własnej listy kanałów YouTube™
W pliku `background.js`, w linii `31` zadeklarowano tablicę zawierającą listę odnośników do list filmów na konkretnych kanałach. Poprawny link powinien być zakończony frazą `/videos`.