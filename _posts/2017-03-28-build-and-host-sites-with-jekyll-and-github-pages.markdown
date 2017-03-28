---
layout: post
title:  "Tworzenie i hostowanie stron z wykorzystaniem Jekyll oraz Github Pages"
comments: true
tags: [Github, Jekyll, Blog]
---
Cześć! W swoim pierwszym poście chciałbym opisać, w jaki sposób założyć bloga, wykorzystując do tego celu generator stron statycznych [Jekyll][jekyll-url] oraz darmowy hosting oferowany przez [Github][gh-pages]. 

Ja wybrałem właśnie tą metodę i jak na razie sprawia mi dużo frajdy. Repozytorium dla mojego bloga jest publicznie dostępne [tutaj][repo-url]. 

# Github Pages
Github umożliwia hostowanie statycznych stron bezpośrednio z repozytorium. Wystaczy, że swoje pliki umieścisz w odpowiednim repozytorium (na odpowiednim branchu). Główne założenia Github Pages, bo tak właśnie nazywa się ta mechanika, to tworzenie stron "wizytówek" dla swoich projetków lub dla siebie (jako użytkownika bądź organizacji). Możliwości jest jednak znacznie więcej, a wszystko jest całkowicie darmowe.

Jak już wspomniałem można zakładać dwa rodzaje stron:

* strona użytkownika/organizacji,
* strona projektu.

## Strona użytkownika/organizacji

Należy założyć nowe repozytorium o nazwie `username.github.io`, gdzie `username` to nazwa użytkownika bądź organizacji (nazwa musi dokładnie pasować, inaczej nie będzie działać). 

![Tworzenie nowego repozytorium]({{ "/images/2017-03-28/CreateNewRepository.png" | prepend: site.baseurl}} )

Wystarczy teraz, że wrzucimy tu nasze pliki html. Zaczynamy np. od dodania prostego pliku `index.html`.

{% highlight html %}
<!DOCTYPE html>
<html>
  <body>
    <h1>Hello World</h1>
    <p>I'm hosted with GitHub Pages.</p>
  </body>
</html>
{% endhighlight %}

I tyle! Nasza strona za kilka minut będzie opublikowana pod adresem `http://username.github.io`. Oczywiście teraz stronę można rozbudowywać wedle własnego uznania.

## Strona projektu

Procedura jest tutaj równie prosta. W odróżnieniu od stron użytkownika, nie jest wymagana żadna konkretna nazwa repozytorium. 

* Zakładamy nowe repo, albo przechodzimy do istniejącego. 
* Tworzymy brancha o nazwie `gh-pages`. 
* Na tym branchu dodajemy dodajemy nasze pliki. 

Gotowe! Nasza strona jest opublikowana pod adresem: `http://username.github.io/repository` gdzie `repository` odpowiada nazwie repozytorium. 

W zakładce z ustawieniami dla naszego repo, odnajdziemy sekcję Github Pages, która będzie wyglądać podobnie jak tutaj:

![Ustawienia - Github Pages]({{ "/images/2017-03-28/SettingsGhPages.png" | prepend: site.baseurl}} )

Uwaga: Github Pages można także hostować z brancha `master`, wystarczy tylko zmienić ustawienie `source`. Przy takiej opcji miałem jednak problem, gdy chciałem podpiąć własną domenę, zamiast domyślnego url. 

Podsumowanie różnic pomiędzy stronami użytkownika, a stronami projeku znajduje się [tutaj][user-vs-project-pages]

## Motywy

Zamiast ręczenie dodawać pliki css zmieniające szatę graficzną naszej strony, możemy skorzystać z jednego z dostępnych motywów żeby szybko uzyskać atrakcyjny wygląd.

W ustawieniach Github Pages w sekcji `Theme chooser` klikamy na przycisk `Choose a theme` i wybieramy jeden z kilku dostęnych.

![Wybór motywu]({{ "/images/2017-03-28/ThemeChooser2.png" | prepend: site.baseurl}} )

Spowoduje to dodanie pliku `_config.yml`, który jest plikiem konfiguracyjnym Jekylla. Github Pages wykorzystuje to narzędzie do budowania stron. Cała zawartość dodanego pliku konfiguarcyjnego to ustawienie jednej zmiennej.

```
theme: jekyll-theme-tactile
```

Treść strony, możemy teraz trzymać w plikach markdown, a Jekyll zadba o wygenerowanie całej reszty. 

## Własna domena

Możemy zmienić adres strony i podpiąć własną domenę. Aby to zrobić dodajemy do repo (na tym branchu, z którego Github hostuje naszę stronę) plik o nazwie CNAME, którego zawartość to jedna linijka - nazwa naszej domeny. W przypadku mojego bloga jest to:

```
wpelczar.com
```

Teraz u wybranego dostawcy musimy dodać rekordy DNS.

* Dwa rekordy typu `A` wskazujące na adresy ip `192.30.252.153` oraz `192.30.252.154`.
* Rekord dla www typu `CNAME` wskazujący nasz githubowy url w postaci `username.github.io` (uwaga: nawet w przypadku stron dla projektów, url wygląda tak samo, nie uwzględniamy nazwy repozytorium)

W moim przypadku tak wygląda screen ze strony GoDaddy:

![Ustawienia DNS dla bloga]({{ "/images/2017-03-28/BlogDNS.png" | prepend: site.baseurl}} )

Czekamy, aż wpisy się rozpropagują. Teoretycznie może to zająć nawet kilka godzin.

# Jekyll

Jekyll to popularny generator statycznych stron, z silnym wsparciem dla tworzenia blogów. Jest to silnik, który odpowiada za generowanie GithubPages.

Dzięki niemu treść swojej strony możemy tworzyć w prostym języku znaczników, jakim jest np. Markdown, a Jekyll wykorzystując system templatów [Liquid][liquid] wygeneruje odpowiednie pliki html. Nie ma tutaj żadnej bazy danych, wszytkie treści trzymamy w plikach. Jeśli dokonamy zmian, to Jekyll na nowo generuje wszystkie statyczne pliki. 

## Instalacja

Jekyll wymaga do swojego działania zainstalowanego `Ruby` oraz `RubyGems`. Jeśli mamy je na swoim systemie instalacja Jekylla sprowadza się do wykonania polecenia

```
gem install Jekyll
```

Jekyll oficjalnie nie jest wspierany na systemie Windows, ale jak najbardziej można go uruchomić. Najszybciej zrobić to przy pomocy [Chocolatey][chocolatey] - menadżera pakietów dla Windows.

{% highlight powershell linenos %}
choco install ruby -y
gem install bundler
gem install jekyll
{% endhighlight %}

Jeśli podczas instalacji gemów Ruby wyskoczy błąd odnośnie certyfikatu SSL trzeba ręcznie zaktulizować Ruby Gems. Problem i jego rozwiązanie opisane są [na stronie Ruby Gems][rubygems-ssl-error]

Szerszy opis instalacji na Windows znajduje się [tutaj][jekyll-windows-installation]

## Tworzenie strony

Aby lokalnie zbudować stronę wykonujemy w konsoli następujące polecenia

{% highlight powershell linenos %}
jekyll new myblog
cd myblog
bundle exec jekyll serve
{% endhighlight %}

Zgodnie z komunikatem wygenerowaną stronę możemy zobaczyć pod adresem `http://127.0.0.1:4000/`. Jekyll seve domyślnie śledzi nasze pliki, co oznacza, że na bieżąco będziemy widzieć efekty wprowadzonych zmian (wyjątkiem są zmiany w pliku konfiguracyjnym `_config.yml`, które wymagają zrestartowania procesu). 

## Struktura katalogów

Podstawowa struktura katalogów wygląda mniej więcej tak:

```
├── _config.yml
├── _includes
|   ├── footer.html
|   └── header.html
├── _layouts
|   ├── default.html
|   └── post.html
├── _posts
|   ├── 2017-03-05-welcome-to-jekyll.markdown
├── _sass
|   ├── _base.scss
|   └── _layout.scss
├── _site
├── .jekyll-metadata
├── Gemfile
├── Gemfile.lock 
└── index.html
```

* W pliku `_config.yml` umieszczamy dane konfiguracyjne takie jak: tytuł naszego bloga, id dla google analytics czy format URL pod jakim dostępne będą nasze posty.
* Folder `_includes` zawiera częściowe widoki, które możemy używać w naszych layoutach lub postach. Aby dołączyć taki widok wykorzystujemy tag liquidowy, np {% raw %} `{% include header.html %}` {% endraw %}.
* W folderze `_layouts` zdefiniowane są szablony naszych stron. Tag {% raw %} `{{ content }}` {% endraw %} umieszczony w szablonie oznacza miejsce, w którym zostanie wstrzyknięta zawartość strony.
* W folderze `_posts` znajduje się treść naszego bloga czyli posty. Format nazwy plików jest istotny i wygląda tak `YEAR-MONTH-DAY-title.MARKUP`. Mogą to być pliki html lub markdown.
* Jekyll domyślnie wspiera preprocesor css'a jakim jest SASS. Pliki w formacie scss przechowywane są w folderze `_sass`. Nie potrzebujemy pisać żadnych tasków gulpowych czy gruntowych - jeśli uruchomimy build to Jekyll przekonwertuje pliki SASS na css'y rozpoznawalne przez przeglądarki.
* W folderze `_site` znajduje się wygenerowana przez Jekylla strona. Nie ingerujemy w zawartośćtego folderu, bo i tak zostanie nadpisana po kolejnym buildzie. Jeśli polegamy na tym, że GithubPages generuje nam stronę to cały folder możemy dodać do pliku `.gitignore`.
* `Gemfile` i `Gemfile.lock` używane są przez Bundler do śledzenia jakie gemy i w jakiej wersji są nam potrzebne.
* `index.html` - strona główna naszego bloga.

**Uwaga**: Jekyll od wersji 3.2 domyślnie generuje znacznie prostszą strukturę, w której brakuje folderów `_includes`, `_layouts` i `_sass`. Dzieje się tak ponieważ od tej wersji pliki związane z wyglądem strony trzymane są w gemach. 
Po stworzeniu strony, w pliku Gemfile jest zawarta linijka `gem "minima", "~> 2.0"`, a w pliku konfiguracyjnym ustawiony jest `theme: minima`. Lokalizację "zaginionych" folderów poznamy wykonując polecenie:

```
bundle show minima
``` 

Oczywiście możemy zmieniać wygląd poprzez instalację nowych motywów, możemy także nadpisywać domyślny wygląd motywu poprzez umieszczenie wybranych plików w folderze strony, możemy w końcu całkowicie zrezygnować z motywów opartych na gemach i skopiować foldery `_includes`, `_layouts`, `_sass` oraz `assets`, a także usunąć wspomniane wcześniej ustawiena z plików `Gemfile` oraz `_config.yml`. Więcej informacji znajduje się na stronie Jekylla [tutaj][jekyll-themes].

## Liquid templating

Wykorzystując język templatów [Liquid][liquid], możemy definiować szablony naszych stron, częściowe widoki, korzystać ze zmiennych i pisać wyrażenia logiczne.

### Składnia

* Zmienne - aby uzyskać wartość zmiennej stosujemy podwójne nawiasy klamrowe, np: 
{% highlight liquid %}
{% raw %}
{{ post.title }}
{% endraw %}
{% endhighlight %}

* Tagi pozwalają tworzyć funkcje i wyrażenia sterujące - umieszczamy je pomiędzy nawiasem klamrowym i procentem, np. 
{% highlight liquid %}
{% raw %}
{% if page.comments %}
  {% include disqus.html %}
{% endif %}
{% endraw %}
{% endhighlight %}

* Filtry zmieniają wyjście obiektu - aby skorzystać z filtru wykorzystujemy znak `|`. Na przykład jeśli chcemy dostosować format daty, możemy użyć

{% highlight liquid %}
{% raw %}
{{ page.date | date: "%d/%m/%Y" }}
{% endraw %}
{% endhighlight %}


### Front Matter
[YAML Front Matter][YAML-front-matter] jest to specjalna sekcja, którą możemy umieścić na górze pliku. Wykorzystujemy ją do ustawienia metadanych pliku lub zdefiniowania własnych zmiennych. 
Blok Front Matter składa się z danych w formacie YAML, zawartych pomiędzy potrójnymi myślnikami. Dla przykładu:

```
---
layout: post
title: Hello world
---
```

Każdy plik zawierający taki blok, będzie specjalnie przetwarzany przez Jekyll.  Dane zawarte w sekcji Front Matter możemy użyć przy pisaniu tagów liquidowych.

### Szablony

Pliki z szablonami dla naszych stron umieszczmy w folderze `_layouts`. Przykładowo: 

{% highlight html %}
{% raw %}
---
layout: default
---
<div class="page-container">
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <h1 class="page-title text-center">{{ page.title }}</h1>
        <div class="page-content">  
          {{ content }}    
        </div>
    </div>
  </div>
</div>
{% endraw %}
{% endhighlight %}

Zawartość strony, która ma ustawiona layout zostanie wstrzyknięta w miejsce tagu {% raw %} `{{ content }}` {% endraw %}. Aby ustawić szablon dla danej strony, w sekcji front matter ustawiamy odpowiednią zmienną `layout: nazwa_pliku_z_layoutem`. Szablony mogą także "dziedziczyć" po innych szablonach (jak w tym przypadku).

### Częściowe widoki

Za pomocą liquidowego tagu `include` możemy wstrzykiwać zawartość plików znajdujących się w folderze `_includes`. Tak na przykład wygląda mój defaultowy layout:

{% highlight html %}
{% raw %}
<!DOCTYPE html>
<html>

{% include head.html %}

<body>
  {% include header.html %}
  <div class="container">
    {{ content }}
  {% include search-modal.html %}     
  </div>
  {% include footer.html %}
</body>
</html>
{% endraw %}
{% endhighlight %}

## Pisanie postów

Dodawanie kolejnych postów sprowadza się do dodania plików w katalogu `_posts`. Nazwy plików muszą być w formacie `YEAR-MONTH-DAY-title.MARKUP`, np.

```
2017-03-05-welcome-to-jekyll.markdown
```

Każdy post musi na początku zawierać blok Front Matter. 

Aby lista postów była dostępna na głownej stronie bloga, gdzieś w pliku `index.html` musi znajdować się kod podobny do poniższego:

{% highlight html %}
{% raw %}
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
{% endraw %}
{% endhighlight %}

## Publikowanie

Aby opublikować nasz blog za pomocą GithubPages, jedyne co musimy zrobić to dodać nasze pliki do repozytorium, tak jak to opisałem w pierwszej części. Nie musimy dołączać folderu `_site`.  Github rozpozna strukturę plików Jekyll i sam zbuduje naszą stronę.

Z drugiej strony, możemy również samą zawartość folderu `_site` wrzucić na dowolny serwer hostingowy.

## Materiały

Opisałem tutaj tylko podstawy działania Jekylla. Poniżej załączam kilka linków, z którymi warto się zapoznać.

* [Oficjalna strona Jekylla][jekyll-url]
* [Oficjalna strona języka Liquid][liquid]
* [https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/](https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/)
* [http://jmcglone.com/guides/github-pages/](http://jmcglone.com/guides/github-pages/)
* [http://jekyllbootstrap.com/lessons/jekyll-introduction.html](http://jekyllbootstrap.com/lessons/jekyll-introduction.html)


[repo-url]: https://github.com/wpelczar/blog
[jekyll-url]: https://jekyllrb.com/
[gh-pages]: https://pages.github.com/
[liquid]: https://shopify.github.io/liquid/
[chocolatey]: https://chocolatey.org/
[jekyll-windows-installation]: https://jekyllrb.com/docs/windows/#installation
[rubygems-ssl-error]: http://guides.rubygems.org/ssl-certificate-update/
[user-vs-project-pages]: https://help.github.com/articles/user-organization-and-project-pages/
[jekyll-themes]: https://jekyllrb.com/docs/themes/
[YAML-front-matter]: https://jekyllrb.com/docs/frontmatter/