# Sudoku validators

## Uzdevuma apraksts

Uzrakstīt kodu, kas pārbauda, vai teksts atbilst pareizam [sudoku](https://en.wikipedia.org/wiki/Sudoku) mīklas izkārtojumam (pilnīgi vai nepilnīgi aizpildītam), un izprintē atbilstošu ziņu.

## Uzdevuma uzstādīšana

Pirmajā programmas darbināšanas reizē nepieciešams palaist:

```sh
bin/setup
```

Pēc tam uzdevumu var palaist:

```sh
  rake run <ceļš uz failu, kuru validēt>
```

Atkarībā no tā, kā sudoku ir aizpildīts, atgriež atšķirīgu tekstu

* Ja mīkla ir derīga un pilnīgi aizpildīta, atgriež `Sudoku ir derīgs.`
* Ja mīkla ir derīga, bet nav pilnīgi aizpildīta, atgriež `Sudoku ir derīgs, bet nepabeigts.`
* Ja mīkla nav derīga, atgriež `Sudoku ir nederīgs.`

Sudoku mīkla ir derīga, ja:

1. Tai vienā rindā neatkārtojas cipari
2. Tai vienā kolonnā neatkārtojas cipari
3. Katrā apakšgrupā (deviņi mazie 3x3 kvadrātiņi) katrs cipars ir sastopams tikai vienreiz

## Implementācija

Pamata kodu paredzēts rakstīt `lib/validator.rb` faila metodē `validate`, bet var brīvi veidot jaunas metodes un/vai failus un klases, kuras šī metode izmanto.

## Kā zināt, ka viss strādā

Šim uzdevumam klāt pielikti testi, kas noklāj visus gadījumus. Sākotnēji visi pieci testi būs sarkani, jo vēlamā funkcionalitāte vēl nav izstrādāta. Ja tie ir zaļi, tad viss strādā, kā tam vajadzētu būt.

Testus iespējams palaist, izmantojot komandu `rake spec`.

## Parauga ievades faila formāts

*Nulles apzīmē tukšās sudoku mīklas vietas*
```
8 5 0 |0 0 2 |4 0 0
7 2 0 |0 0 0 |0 0 9
0 0 4 |0 0 0 |0 0 0
------+------+------
0 0 0 |1 0 7 |0 0 2
3 0 5 |0 0 0 |9 0 0
0 4 0 |0 0 0 |0 0 0
------+------+------
0 0 0 |0 8 0 |0 7 0
0 1 7 |0 0 0 |0 0 0
0 0 0 |0 3 6 |0 4 0
```

Ja ir vēlme, var uztaisīt vēl testpiemērus, tomēr esošie testpiemēri jau noklāj nepieciešamos gadījumus. Tos iespējams atrast šī projekta `spec/fixtures` direktorijā.
