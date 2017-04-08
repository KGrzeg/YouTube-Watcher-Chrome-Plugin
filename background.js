/*  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *
    Licencja MIT
*   
    Copyright (c) 2017 Grzegorz Kupczyk kupczykgrzeg@gmail.com
*   
    Niniejszym gwarantuje się, bez opłat, że każda osoba która wejdzie w posiadanie kopii tego
*   oprogramowania i związanych z nim plików dokumentacji (dalej „Oprogramowanie”) może
    wprowadzać do obrotu Oprogramowanie bez żadnych ograniczeń, w tym bez ograniczeń
*   prawa do użytkowania, kopiowania, modyfikowania, łączenia, publikowania,
    dystrybuowania, sublicencjonowania i/lub sprzedaży kopii Oprogramowania a także
*   zezwalania osobie, której Oprogramowanie zostało dostarczone czynienia tego samego, z
    zastrzeżeniem następujących warunków:
*   
    Powyższa nota zastrzegająca prawa autorskie oraz niniejsza nota zezwalająca muszą zostać
*   włączone do wszystkich kopii lub istotnych części Oprogramowania.
    
*   OPROGRAMOWANIE JEST DOSTARCZONE TAKIM, JAKIE JEST, BEZ JAKIEJKOLWIEK GWARANCJI,
    WYRAŹNEJ LUB DOROZUMIANEJ, NIE WYŁĄCZAJĄC GWARANCJI PRZYDATNOŚCI HANDLOWEJ LUB
*   PRZYDATNOŚCI DO OKREŚLONYCH CELÓW A TAKŻE BRAKU WAD PRAWNYCH. W ŻADNYM
    PRZYPADKU TWÓRCA LUB POSIADACZ PRAW AUTORSKICH NIE MOŻE PONOSIĆ
*   ODPOWIEDZIALNOŚCI Z TYTUŁU ROSZCZEŃ LUB WYRZĄDZONEJ SZKODY A TAKŻE ŻADNEJ INNEJ
    ODPOWIEDZIALNOŚCI CZY TO WYNIKAJĄCEJ Z UMOWY, DELIKTU, CZY JAKIEJKOLWIEK INNEJ
*   PODSTAWY POWSTAŁEJ W ZWIĄZKU Z OPROGRAMOWANIEM LUB UŻYTKOWANIEM GO LUB
    WPROWADZANIEM GO DO OBROTU    
*  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  */

(function() {
    //ustawienia skryptu
    const version = 0.1;
    const interval = 10 * 60000; //co jaki czas sprawdzać (10 minut)
    const youtubeprofiles = [
        'https://www.youtube.com/user/MiroslawZelent/videos',
        'https://www.youtube.com/user/wybuchajacebeczki/videos',
        'https://www.youtube.com/user/JavaDevMatt/videos',
        'https://www.youtube.com/user/NoCopyrightSounds/videos'
        
        //kolejne odnośniki do list filmów danych kanałów
    ];
    
    //zmienne globalne
    var lastTitle = {};   //lista nazw ostatnich tytułów dla kazdego kanału

    //inicjalizuj pętlę powiadomień
    function InitializeLocalStorage(){
        //sprawdz, czy "pętla sprawdzająca" jest już w ruchu
        if (!localStorage.isInitialized || localStorage.version != version) {
            localStorage.isActivated = true;
        }
    
        //sprawdź, czy przeglądarka obsługuje powiadomienia
        if (window.Notification) {
            if (JSON.parse(localStorage.isActivated)) {
                CheckYoutubeVideo(DotaHandler);
            }
    
            //wykonuj funkcję, co 'interval' milisekund
            setInterval(function() {
    
                if (JSON.parse(localStorage.isActivated)) {
                    CheckYoutubeVideo(DotaHandler);
                }
            }, interval);
        }
    }

    //wyświetl powiadomienie
    function Notify(tytul, wiadomosc, ikona, link) {
        //sprawdź, czy przeglądarka obsługuje powiadomienia
        if (window.Notification) {
            var notify = new Notification(tytul, {
                icon: ikona,
                body: wiadomosc
            });
            
            //dodaj reakcję na naciśnięcie powiadomienia
            notify.onclick = function() {
                window.open(link);
            }
        }
    }

    function CheckYoutubeVideo(done) {
        youtubeprofiles.forEach( (youtubeprofile,i) => {
            
            //wczytujemy stronę z listą filmów
            $.get(youtubeprofile, function(data){
        
                var doc = $.parseHTML(data);
                
                //znajdź tytuł najnowszego filmu
                var title = $('.yt-lockup-title', doc);
                
                if (title.length === 0){
                    lastTitle[youtubeprofile] = 'nope_brak_nazwy_default_miszmasz_angielski_polski_dwa_bratanki_hehe';
                    return done(false); //kanał nie ma żadnego filmu
                }
                    
                title = title.first().text();
                
                
                if (!lastTitle[youtubeprofile]){
                    lastTitle[youtubeprofile] = title;
                    return done(false); //dopiero uruchomiono skrypt, nie ma punktu odniesienia
                }
                
                if (lastTitle[youtubeprofile] != title){
                    //dodano nowy film
                    //w tym miejscu można rozbudować dodatek,
                    //aby podać dokładniejsze informacje o video w powiadomieniu
                    lastTitle[youtubeprofile] = title;
                    return done({
                        title: title,
                        url: youtubeprofile
                    });
                }
                
                //nie dodano nowego filmiku
                return done(false);
            });
        });
    }
    
    function DotaHandler(data){
        //nie znaleziono nowego filmu
        if (data === false) return;
        
        //budowa powiadomienia
        var title = "Nowy film!";
        var img = 'img/ChromeExtension128.png';
        
        var body = data.title;
        var url = data.url;
        
        //wyświetl powiadomienie
        Notify(title, body, img, url);
    }
    
    //uruchom skrypt
    InitializeLocalStorage();
    
})();
