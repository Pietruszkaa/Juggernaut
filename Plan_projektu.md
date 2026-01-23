# Juggernaut Bot – Kompleksowy Plan Projektu 

> Ten dokument jest **jedynym źródłem prawdy** dla projektu Juggernaut Bot.  
> Na jego podstawie powstaje kod, dokumentacja techniczna oraz przyszłe Wiki.

----------

## 1. Wizja projektu

Juggernaut Bot to **produkcyjny, modularny bot Discord**, projektowany od początku jako:

-   stabilny core (bot runtime)
-   platforma pod moduły (feature-driven)
-   aplikacja z **dashboardem webowym**
-   rozwiązanie gotowe do **self-hostingu** i **hostingu komercyjnego (SaaS)**

Projekt nie jest prototypem ani jednorazowym botem — jego celem jest długoterminowy rozwój i potencjalna monetyzacja.

----------

## 2. Założenia nadrzędne

-   modularność ponad wszystko
-   brak logiki biznesowej w entrypointach
-   jeden kontrakt danych (config) dla bota i dashboardu
-   pełna dokumentacja tworzona równolegle z kodem
-   każda decyzja architektoniczna jest zapisana

----------

## 3. Architektura wysokiego poziomu

```
Discord API
    │
    ▼
Bot Runtime (Client)
    │
    ├── EventHandler
    ├── CommandHandler
    ├── ModuleRegistry
    │       └── Feature Modules
    │
    └── Services
            ├── ConfigService
            ├── GuildService
            ├── PermissionService
            └── Logger
    │
    └── Dashboard API
            └── (wspólne serwisy + config)

```

----------

## 4. Struktura repozytorium (docelowa)

```
src/
├── bot.ts                     # entrypoint
├── client/
│   ├── createClient.ts
│   └── lifecycle.ts
│
├── handlers/
│   ├── eventHandler.ts
│   ├── commandHandler.ts
│   └── interactionHandler.ts
│
├── modules/
│   ├── _core/
│   ├── moderation/
│   └── _shared/
│
├── services/
│   ├── configService.ts
│   ├── moduleRegistry.ts
│   ├── guildService.ts
│   └── permissionService.ts
│
├── database/
│   ├── index.ts
│   ├── adapters/
│   └── schemas/
│
├── dashboard/
│   ├── server.ts
│   ├── routes/
│   └── auth/
│
├── infra/
│   ├── logger.ts
│   └── env.ts
│
├── utils/
│   └── errors.ts
│
└── types/
    └── core.d.ts

```

----------

## 5. Bot Core (`bot.ts`)

### Odpowiedzialność

-   inicjalizacja środowiska
-   stworzenie klienta Discord
-   uruchomienie handlerów
-   start dashboard API
-   kontrolowany shutdown

### Zasada

`bot.ts` **nie zna**:

-   eventów
-   komend
-   modułów

----------

## 6. System handlerów

### EventHandler

-   dynamiczna rejestracja eventów
-   brak logiki biznesowej
-   delegowanie do serwisów / modułów

### CommandHandler

-   ładowanie komend z modułów
-   walidacja permissions i cooldownów
-   routing execution

----------

## 7. Moduły

### Definicja modułu

Moduł to:

-   zamknięta funkcjonalność
-   własne komendy / eventy
-   własny schema configu

### Zasady

-   moduł nie zna clienta
-   moduł nie importuje innego modułu
-   komunikacja tylko przez serwisy

----------

## 8. Module Registry (kluczowy element)

Registry odpowiada za:

-   rejestrację modułów
-   lifecycle (enable/disable)
-   dostarczanie metadata do dashboardu

Każdy moduł eksportuje:

-   name
-   version
-   requiredConfig
-   commands
-   events

----------

## 9. System konfiguracji (ConfigService)

### Założenia

-   config per guild
-   jedno źródło prawdy
-   walidacja i normalizacja

### Warstwy

-   Service API
-   Storage Adapter (FS / DB)

### MVP

-   File-based JSON

### Produkcja

-   PostgreSQL + Prisma

----------

## 10. Dashboard

### MVP – Owner Mode

-   jeden owner
-   widok wszystkich guild
-   edycja configów

### Przyszłość – User Mode

-   OAuth2 Discord
-   RBAC
-   multi-tenant

Dashboard korzysta z **tych samych serwisów** co bot.

----------

## 11. Logger i infrastruktura

-   globalny logger
-   poziomy: info / warn / error / debug
-   przygotowany pod integrację z dashboardem

----------

## 12. Dokumentacja i workflow

### Standard

-   kod + JSDoc
-   README per moduł
-   brak wiedzy ukrytej w głowie

### Workflow: nowy moduł

1.  decyzja funkcjonalna
2.  schema configu
3.  rejestracja w moduleRegistry
4.  dokumentacja

----------

## 13. Baza danych

### Rekomendacja

-   PostgreSQL
-   Prisma ORM

### Powód

-   skalowalność
-   JSONB
-   migracje

----------

## 14. Deployment i monetyzacja (przyszłość)

-   self-host
-   Docker
-   bot-as-a-service
-   płatne moduły
-   hosting jako usługa

----------

## 15. Roadmapa techniczna

### Etap 1 – Core

-   ModuleRegistry
-   EventHandler
-   ConfigService

### Etap 2 – Dashboard MVP

-   API
-   config editor

### Etap 3 – Moduły

-   moderation
-   permissions

----------

**Ten dokument jest podstawą implementacji, refactorów i Wiki projektu Juggernaut Bot.**

----------

# Developer Tooling & Debug Architecture

## Cel

Celem wbudowanych narzędzi developerskich jest zapewnienie **pełnej obserwowalności, kontroli i debuggowalności bota w runtime**, bez konieczności bezpośredniego dostępu do hosta. Tooling ma wspierać:

-   rozwój modułowy,
-   szybkie diagnozowanie błędów,
-   bezpieczne testowanie nowych funkcji,
-   przyszłą monetyzację i hosting dla osób trzecich.

Zakłada się, że **część narzędzi będzie dostępna wyłącznie w trybie DEV / OWNER** i nie będzie widoczna dla zwykłych użytkowników.

----------

## 1. Tryby działania aplikacji

### 1.1 NODE_ENV

Bot rozróżnia co najmniej:

-   `development`
-   `production`

Tryb wpływa na:

-   poziom logowania,
-   dostępność narzędzi developerskich,
-   zachowanie API i dashboardu.

### 1.2 OWNER / DEV mode

Konfiguracja przez zmienne środowiskowe:

-   `OWNER_ID`
-   opcjonalnie lista ID

OWNER ma dostęp do:

-   komend developerskich,
-   endpointów DEV API,
-   pełnego wglądu w guilds, moduły i configi.

----------

## 2. Narzędzia developerskie po stronie Discorda

### 2.1 Komendy DEV / OWNER

Dostępne wyłącznie w trybie DEV lub dla OWNERA.

Minimalny zestaw (MVP):

-   `/dev status`
    
    -   uptime
    -   ilość guild
    -   ilość modułów
    -   memory usage
    -   shard info (future-proof)
-   `/dev guild <guildId>`
    
    -   status gildii
    -   config (sanitized)
    -   aktywne moduły
-   `/dev reload`
    
    -   configów
    -   i18n
    -   wybranego modułu

Cel: możliwość diagnozy problemów bez restartu bota.

----------

## 3. System logowania (Logger)

### 3.1 Poziomy logów

Wprowadzony zostaje centralny logger obsługujący poziomy:

-   DEBUG
-   INFO
-   WARN
-   ERROR
-   FATAL

### 3.2 Kontekst logów

Każdy log może zawierać:

-   moduł
-   guildId
-   event / requestId
-   dodatkowe dane diagnostyczne

Przykład użycia:

-   logi konfiguracyjne
-   logi API
-   logi modułów

### 3.3 Logi runtime (DEV)

W trybie development:

-   bufor ostatnich N logów w pamięci (ring buffer)
-   możliwość pobrania przez API / dashboard

----------

## 4. Bezpieczne wykonywanie kodu (Safe Execution)

### 4.1 Wrapper wykonania

Każdy event, handler i moduł powinien być wykonywany przez wspólny wrapper:

-   przechwytuje wyjątki
-   loguje kontekst błędu
-   zapobiega crashowi całego procesu

Efekt:

-   brak „unknown_error”
-   pełna informacja co, gdzie i dlaczego się wysypało

### 4.2 Lifecycle modułów

Każdy moduł posiada lifecycle hooks:

-   `onLoad`
-   `onEnable`
-   `onDisable`
-   `onError`

Centralny manager:

-   rejestruje stan modułu
-   mierzy czas inicjalizacji
-   umożliwia wyłączenie modułu runtime

----------

## 5. Dashboard & API – narzędzia DEV

### 5.1 Endpointy developerskie

Dostępne wyłącznie w DEV / OWNER mode:

-   `/api/dev/health`
-   `/api/dev/modules`
-   `/api/dev/guilds`
-   `/api/dev/configs`
-   `/api/dev/logs`

Na etapie MVP:

-   brak rozbudowanego auth
-   ograniczenie do localhost / self-host

### 5.2 Feature flags

Wbudowany system flag funkcjonalnych:

-   włączanie / wyłączanie funkcji runtime
-   testowanie nowych modułów
-   podstawa pod płatne feature’y

----------

## 6. Workflow jako element toolingowy

### 6.1 Template modułu

Każdy moduł posiada:

-   spójną strukturę folderów
-   plik główny modułu
-   schema configu
-   default config
-   README

### 6.2 Checklisty developerskie

Przykładowa checklist:

-   schema configu
-   default config
-   rejestracja modułu
-   logi
-   i18n
-   widoczność w dashboardzie

Workflow jest podstawą przyszłego Wiki projektu.

----------

## 7. Zakres świadomie odłożony

Na obecnym etapie **nie wdrażamy**:

-   zaawansowanego APM (Prometheus, Grafana)
-   distributed tracing
-   rozbudowanego systemu ról
-   pełnego hot-reload

Priorytetem jest: **stabilność, przewidywalność, kontrola i prostota rozwoju.**

----------

# Dokumentacja projektu – styl i zasady

## Cel dokumentacji

Dokumentacja projektu Juggernaut Bot ma spełniać **dwa równoległe cele**:

1.  Dostarczać **precyzyjnych informacji technicznych** dla developerów.
2.  Wyjaśniać działanie systemu **prostym językiem („na chłopski rozum”)**, tak aby:
    -   nowa osoba szybko zrozumiała architekturę,
    -   łatwo było wrócić do kodu po czasie,
    -   ograniczyć chaos i błędy wynikające z nieporozumień.

Każdy istotny element projektu **powinien być opisany w obu tych warstwach**.

----------

## Zasada podwójnego opisu

Dla każdego modułu, serwisu lub kluczowego pliku:

### 1. Opis techniczny ("jak to działa")

Powinien zawierać:

-   odpowiedzialność komponentu,
-   wejścia (parametry, zależności),
-   wyjścia (zwracane wartości, side‑effecty),
-   lifecycle,
-   powiązania z innymi częściami systemu.

Ten opis jest skierowany do:

-   developerów,
-   osób utrzymujących system,
-   przyszłego Ciebie.

### 2. Opis uproszczony ("na chłopski rozum")

Powinien odpowiadać na pytania:

-   po co to istnieje,
-   co się stanie, jeśli tego zabraknie,
-   w którym momencie bot z tego korzysta,
-   dlaczego to jest zrobione w ten sposób.

Ten opis jest skierowany do:

-   nowych współtwórców,
-   osób nietechnicznych (np. hoster, właściciel serwera),
-   szybkiego przypomnienia koncepcji.

----------

## Struktura dokumentacji

### README (root projektu)

README pełni rolę **mapy projektu** i zawiera:

-   czym jest Juggernaut Bot,
-   ogólną architekturę,
-   sposób uruchomienia (high‑level),
-   linki do szczegółowej Wiki.

README **nie wchodzi w detale implementacyjne**.

----------

### Wiki / docs

Wiki zawiera dokumentację szczegółową:

-   architektura core
-   system modułów
-   config per guild
-   dashboard i API
-   dev tooling

Każda strona Wiki:

-   sekcja techniczna
-   sekcja "na chłopski rozum"

----------

## Dokumentowanie kodu w trakcie pisania

### Zasady

-   Dokumentacja powstaje **razem z kodem**, nie po fakcie.
-   Każda publiczna funkcja / serwis ma opis:
    -   co przyjmuje
    -   co zwraca
    -   kiedy jest wywoływana

### Komentarze w kodzie

Komentarze:

-   wyjaśniają _dlaczego_, nie _co_ (to wynika z kodu),
-   są krótkie i konkretne,
-   odnoszą się do dokumentacji, jeśli istnieje.

----------

## Przykład standardu opisu

**Opis techniczny:**

> Moduł ConfigManager odpowiada za ładowanie, normalizację i zapis konfiguracji per guild. Dane są przechowywane w systemie plików i scalane z domyślnym schematem przy każdym odczycie.

**Na chłopski rozum:**

> To jest sejf na ustawienia serwerów. Jak bot wchodzi na nowy serwer, tworzy mu plik z ustawieniami. Jak coś się zmieni lub brakuje, bot sam to naprawia.

----------

## Długoterminowy cel

Taki styl dokumentacji:

-   pozwala bezboleśnie skalować projekt,
-   ułatwia przekazanie projektu innym developerom,
-   stanowi bezpośrednią podstawę pod oficjalne Wiki i dokumentację użytkową.

Dokumentacja jest traktowana jako **część systemu**, nie dodatek.

----------

# Security Model

## Zakres

Model bezpieczeństwa w projekcie Juggernaut Bot koncentruje się głównie na **dashboardzie i API**, ponieważ:

-   komunikacja z Discordem odbywa się przez oficjalne API,
-   największe ryzyko pochodzi z interfejsów webowych, konfiguracji i przyszłego multi-hostingu.

Celem jest zapewnienie **rozsądnego poziomu bezpieczeństwa bez nadmiernej komplikacji** na etapie MVP.

----------

## 1. Model zaufania

### 1.1 Komponenty zaufane

-   proces bota (Node.js)
-   lokalny dashboard (self-host)
-   właściciel instancji (OWNER)

### 1.2 Komponenty niezaufane

-   input z Discorda (komendy, eventy, treści)
-   dane wysyłane przez dashboard UI
-   configi edytowane przez użytkownika
-   przyszli użytkownicy SaaS

Zasada: **każde dane z zewnątrz są traktowane jako potencjalnie niebezpieczne**.

----------

## 2. Dashboard & API Security

### 2.1 Dostęp do dashboardu (MVP)

Na etapie self-host:

-   dashboard dostępny tylko lokalnie lub za reverse proxy
-   brak publicznej ekspozycji API
-   opcjonalny prosty token dostępu

### 2.2 Docelowy model (future)

-   OAuth2 Discord
-   dostęp tylko do guilds, gdzie użytkownik ma uprawnienia
-   role: owner / admin / user

----------

## 3. Autoryzacja i uprawnienia

### 3.1 Zasada minimalnych uprawnień

-   dashboard widzi tylko to, co jest konieczne
-   brak możliwości modyfikacji krytycznych ustawień bez OWNER mode

### 3.2 Operacje wrażliwe

Operacje wymagające dodatkowej walidacji:

-   edycja configów
-   restart / reload modułów
-   dostęp do logów

----------

## 4. Walidacja i sanitizacja danych

### 4.1 Input validation

-   wszystkie dane z API walidowane schematami
-   brak bezpośredniego zapisu danych wejściowych do FS / DB

### 4.2 Dane zabronione

Nigdy nie zapisujemy w configach:

-   tokenów
-   sekretów
-   danych autoryzacyjnych

----------

## 5. Izolacja danych

### 5.1 Izolacja per guild

-   configi oddzielone per guild
-   brak dostępu cross-guild

### 5.2 Multi-hosting (future)

-   pełna separacja instancji
-   brak współdzielonych sekretów

----------

# Performance & Optymalizacja

## Cel

Celem jest zapewnienie **stabilnej i przewidywalnej wydajności**, nawet przy:

-   dużej liczbie guild
-   wielu aktywnych modułach
-   rozbudowanym dashboardzie

Priorytetem jest **brak blokowania event loop**.

----------

## 1. Zasady ogólne

-   brak operacji synchronicznych w handlerach Discorda
-   brak ciężkich obliczeń w eventach
-   I/O zawsze async (future refactor FS)

----------

## 2. Obsługa eventów Discorda

### 2.1 Event flood protection

-   debouncing
-   throttling
-   kolejki zdarzeń

### 2.2 Co jest zabronione w eventach

-   zapisy do FS
-   złożone operacje logiczne
-   zapytania sieciowe bez kontroli

----------

## 3. Moduły a wydajność

-   każdy moduł musi być możliwy do wyłączenia
-   moduły raportują czas inicjalizacji
-   moduły nie mogą blokować core

----------

## 4. Dashboard & API performance

-   cache danych konfiguracyjnych
-   brak bezpośrednich odczytów FS przy każdym request
-   limitowanie requestów (rate limit)

----------

## 5. Pamięć i zasoby

-   monitorowanie memory usage
-   unikanie globalnych singletonów z dużym stanem
-   kontrola wzrostu cache

----------

## 6. Planowane usprawnienia (future)

-   przejście z FS na bazę danych
-   worker threads dla ciężkich zadań
-   shardowanie bota

----------

## Filozofia

Najpierw:

-   stabilność
-   przewidywalność
-   czytelność kodu

Optymalizacja jest:

-   świadoma
-   mierzona
-   wprowadzana tylko tam, gdzie faktycznie potrzebna.

----------

# Granice odpowiedzialności (Boundaries)

## Cel

Celem zdefiniowania granic odpowiedzialności jest:

-   uniknięcie chaosu architektonicznego,
-   zapobieganie "skrótom" implementacyjnym,
-   ułatwienie refaktoryzacji i code review,
-   umożliwienie skalowania projektu i pracy zespołowej.

Każda warstwa systemu ma **ściśle określony zakres odpowiedzialności**.

----------

## 1. Warstwy systemu

### 1.1 bot.ts (entrypoint)

**Odpowiada za:**

-   inicjalizację core (i18n, config, logger)
-   stworzenie klienta Discord
-   rejestrację eventów
-   uruchomienie API

**Nie wolno:**

-   importować modułów biznesowych
-   zawierać logiki domenowej
-   manipulować configami guild

----------

### 1.2 Core (client, registry, lifecycle)

**Odpowiada za:**

-   stabilność klienta
-   zarządzanie modułami
-   lifecycle modułów
-   centralne mechanizmy (logger, safeExecute)

**Nie wolno:**

-   znać szczegółów implementacji modułów
-   zawierać logiki konkretnej funkcjonalności bota

----------

### 1.3 Moduły

**Odpowiadają za:**

-   konkretną funkcjonalność (komendy, eventy)
-   własny config
-   własne logi

**Nie wolno:**

-   importować innych modułów
-   bezpośrednio manipulować klientem Discord poza swoim zakresem
-   operować na cudzych configach

----------

### 1.4 ConfigManager

**Odpowiada za:**

-   wczytywanie
-   normalizację
-   zapis configów

**Nie wolno:**

-   zawierać logiki biznesowej
-   wykonywać walidacji kontekstowej (to robią moduły)

----------

### 1.5 Dashboard & API

**Odpowiada za:**

-   prezentację danych
-   edycję configów
-   narzędzia developerskie

**Nie wolno:**

-   bezpośrednio manipulować FS / DB
-   obchodzić walidacji

----------

# Filozofia błędów i Error Handling

## Cel

Celem systemu obsługi błędów jest:

-   maksymalna stabilność bota,
-   pełna obserwowalność problemów,
-   brak crashy z powodu pojedynczego błędu.

----------

## 1. Klasy błędów

### 1.1 Błędy recoverable

Przykłady:

-   brak configu
-   nieistniejąca guild

**Zachowanie:**

-   automatyczna naprawa
-   log WARN

----------

### 1.2 Błędy logiczne (bugi)

Przykłady:

-   niepoprawna logika modułu
-   niespełnione założenia

**Zachowanie:**

-   log ERROR
-   brak crasha całego procesu

----------

### 1.3 Błędy krytyczne

Przykłady:

-   brak dostępu do storage
-   uszkodzenie core

**Zachowanie:**

-   log FATAL
-   kontrolowany shutdown

----------

## 2. Widoczność błędów

Odbiorca

Co widzi

Użytkownik

prosty komunikat

Owner / DEV

pełny kontekst

Logi

stack trace

Dashboard

zagregowane info

----------

## 3. Zasady

-   brak "silent failures"
-   brak surowych wyjątków z eventów Discorda
-   każdy błąd ma kontekst (moduł, guild, event)

----------

# Wersjonowanie Configów i Modułów

## Cel

Wersjonowanie umożliwia:

-   bezpieczne aktualizacje
-   backward compatibility
-   migracje danych bez przestojów.

----------

## 1. Wersjonowanie configów

### 1.1 configVersion

Każdy config zawiera pole:

-   `configVersion`

### 1.2 Migracje

-   migracje wykonywane przy starcie
-   brak ręcznych migracji przez użytkownika

### 1.3 Zasada kompatybilności

-   nowe pola są opcjonalne
-   stare configi są automatycznie uzupełniane

----------

## 2. Wersjonowanie modułów

### 2.1 moduleVersion

Każdy moduł deklaruje:

-   własną wersję
-   minimalną wersję core

### 2.2 Kompatybilność

Moduł może:

-   odmówić załadowania
-   zgłosić niezgodność wersji

----------

## 3. Changelog

Kategorie zmian:

-   BREAKING
-   FEATURE
-   FIX

Zmiany breaking wymagają:

-   bump wersji
-   wpisu w dokumentacji

----------

## Filozofia

System:

-   nigdy nie psuje danych użytkownika
-   zawsze próbuje się sam naprawić
-   informuje, gdy nie może tego zrobić.
