# Garwan

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Senior Frontend Developer zadanie

Vytvorte single page aplikaciu pre zobrazovanie vybranych informacii z Github.

## Funkcionalita

Aplikacia zobrazuje GitHub developerov a podporuje prihlaseneho ale aj anonymneho pouzivatela.

### Anonymny a aj prihlaseny pouzivatel

### List developerov

- paginated list podla zadanej lokality (napr. Bratislava)
- sortovanie bud podla poctu repozitarov (default), followerov alebo datumu vytvorenia uctu na GitHube
- item v liste obsahuje:
  - fotka
  - meno
  - pocet repozitarov
  - pocet followerov
- po kliknuti na item je pouzivatel navigovany na detail developera (vybrane informacie z jeho GitHub profilu)

### Detail developera

- tie iste informacie ako v item (ostatne su optional)
- strankovany zoznam repozitarov
- strankovany zoznam followerov, kliknutie na followera naviguje na jeho detail

### Len prihlaseny pouzivatel

- v hlavnej navigacii moznost prechodu na vlastny profile (detail seba), ktory je totozny s detailom developera okrem viditelnej indikacie, ze sa jedna o vlastny profil
- zoznam GitHub issues pre prihlaseneho pouzivatela s moznostou navigacie na issue v ramci https://github.com

## Dodatocne info

- aplikaciu nasadte na lubovolne prostredie dostupne z Internetu cez HTTPS
- strankovanie moze byt bud klasicka paginacia, alebo infinite scrolling
- UI obsahuje jasnu indikaciu ci sa jedna o prihlasene pouzivatela a je mozne sa odhlasit
- API dokumentacia https://developer.github.com/v3/
- postaci basic authentication, ale moze byt aj OAuth resp. Firebase
