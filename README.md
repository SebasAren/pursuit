# Pursuit

## Stappenplan
  1. Keuzes maken welke frameworks gebruikt worden.
  2. Project initialiseren.
  3. Modules aanmaken voor de arXiv en prompt onderdelen.
  4. Tests implementeren in deze modules.
  5. Modules zelf implementeren.
  6. Modules bundelen tot 1 applicatie.

## Keuzes
Ik heb hier voor een oplossing gekozen gebaseerd op NestJS in een monorepo gemaakt met Nx, alles in Typescript. Deze keuze is gemaakt deels op basis van eerdere ervaring en, in het geval van Nx, interesse in een alternatief van een eerder gebruikte tool (Turborepo). Een aantal alternatieven die ik heb overwegen zijn als volgt:
 - tRPC: tRPC is wat mij betreft een van de meest interessante opties voor het bouwen van een backend, maar is in zekere mate polariserend. Het houdt zich in het geheel niet aan REST, maar geeft daarvoor een bijna automatische integratie tussen backend en frontend voor terug. Niet gebruikt omdat het geen standaard oplossing is.
 - graphQL: Ik ben persoonlijk een groot fan van graphQL in grote projecten, omdat het vergelijkbare voordelen heeft als tRPC, maar ook cross-language werkt, tRPC is voornamelijk bedoeld voor full stack typescript. Grote nadeel van graphQL is dat het een significante "developer overhead" heeft, waarmee ik bedoel dat het flink wat boilerplate en tooling werk vereist. Niet gekozen omdat het niet passend is voor een opdracht van een paar uur.
 - turborepo: Alternatief voor Nx. Iets minder "opinionated" dan Nx, maar daardoor ook iets minder behulpzaam. Nx voegt flink wat "code generators" toe om snel nieuwe delen van je applicatie aan te maken. Niet gekozen omdat ik het al eerder gebruikt heb en eens Nx wilde proberen.


## Idee voor RAG
Voor het implementeren van de RAG backend heb ik me laten inspireren door [Pathfinder](https://huggingface.co/spaces/kiyer/pathfinder). Toevallig is een vriend van mij actief als onderzoeker in de astrofysica en daar ook bezig met machine learning. Dit model heeft RAG toegepast op [arXiv](https://arxiv.org/), een pre-publicatie site voor physics en astrophysics science papers. Dit model is dus extra "getrained" op astrofysica vraagstukken en kan bijvoorbeeld "Wat is de waarde van de Hubble constante". Voor zover ik heb begrepen is dit model getrained op de abstracts en conslusies van alle papers tot een bepaalde datum (ergens dit jaar). Dit werkt met gebruik van een vector database en is behoorlijk high tech.

Mijn idee is een zwak aftreksel van dit model. Er zijn een aantal zware concessies die ik heb gedaan om niet daadwerkelijk een langdurig project te moeten beginnen:
 - Geen koppeling met arxiv API. Deze API is heel mooi, maar heeft geen OpenAPI spec of iets vergelijkbaars en levert de data in xml aan. Beide voegen ongeveer een week toe om dit fatsoenljk uit te werken of het toevoegen van een zeer slecht onderhouden externe library. Ik heb dit dus gehardcode naar een endpoint die een voorgekozen abstract returned van een paper.
 - Geen koppeling met een LLM. Ik moet eerlijk toegeven dat ik nog nooit een koppeling met een LLM geschreven heb, dus heb een beetje moeten gokken hoe dat normaal zou werken. Vanuit mijn ervaring met LLM's zou ik zeggen dat ze eigenlijk maar 1 echte parameter willen, namelijk de user input (prompt). Ik heb ook deze koppeling gewoon gehardcode met een mooie quote uit 2001: A Space Odyssey.
 - Het originele idee gebruikt llm embedding met een vector database. Ik heb dit zwaar versimpeld tot een voorbeeld wat ik tegenkwam op wikipedia: [SVG](https://upload.wikimedia.org/wikipedia/commons/1/14/RAG_diagram.svg) en de nep "summary" toegevoegd aan de prompt die de user invoert. Ook wordt er aan de gebruiker een onderwerp gevraagd waar de vraag over gaat.
 - Ik heb maar 1 endpoint gemaakt. De opdracht heeft het ook over een endpoint voor de retrievel. Mijn idee is eigenlijk dat er in de hele applicatie maar 1 endpoint (user input) hoeft te zijn. De gebruiker hoort, buiten zijn "prompt", geen impact te hebben op de context die het LLM mee krijgt.
  - Mocht er dus wel echt een 2e endpoint nodig zijn, dan zou het met de huidige setup heel makkelijk zijn om dit toe te voegen. Je zou via een controller method direct de "getSummary" functie kunnen aanroepen.

## Tests
NestJS heeft een groot voordeel dat testing goed ingebouwd is. Het scheiden in losse containers is bedoeld om alles los te kunnen testen. Ik heb het in dit geval Test-Driven geschreven, waar ik op zich wel een fan van ben. Als alles al getest is voordat de code is geschreven weet je dat de code die je schrijft gewoon klopt. In dit geval is het alleen nog niet helemaal compleet. Er missen integratie tests en e2e tests, waarvan ik vooral de integratie tests wel belangrijk vind.

Handmatig is het endpoint ook te testen bij de [OpenAPI docs](http://localhost:3000/docs)

## Frontend
De frontend die hierbij hoort bestaat uit 2 inputs: vraag en onderwerp. Bijvoorbeeld: "Wat is de waarde van de Hubble constante?" en "Astrofysica".

## Scalability
Ik ben een groot fan van monorepos. Monorepos voegen een extra laag aan modulariteit toe, namelijk de packages. Deze monorepo is een beetje saai, omdat er maar 1 app in staat, een NestJS backend app. Ondanks dat deze saai is heeft het wel direct duidelijke voordelen.  De llm integratie (lib/prompt) en arxiv integratie (lib/arxiv) zijn twee losse modules. Het is goed voor te stellen dat een volgend project 1 van beide (waarschijnlijk de llm) zou willen hergebruiken. In dat geval is het alleen nodig om die applicatie ook aan te maken in deze monorepo en beide applicaties kunnen dan direct gebruik maken van dezelfde libs, zoals de prompt lib. Dit is een combinatie van microservices (iedere applicatie draait nog steeds zelfstandig) en een monoliet (applicaties kunnen hard gekoppeld worden aan elkaar).

Naast een andere backend toevoegen is het ook interessant om hier direct een frontend (NextJS?) aan toe voegen. Aangezien alles in dezelfde repo staat kan je heel simpel via OpenAPI (of GraphQL/tRPC) de frontend blijven koppelen aan de backend via een gedeelde library (OpenAPI client, GraphQL queries of een tRPC type). Dit geeft direct feedback (lees: type errors) in frontends als je iets aanpast in de backend. Je kan dus redelijk veilig database migraties uitvoeren.

## Verbeteringen
Omdat ik niet al te veel tijd wil besteden aan de code (het is uiteindelijk redelijk waardeloos), zijn er nog een aantal stukken laaghangend fruit om te verbeteren.
 - Er is geen enkele vorm van externe koppeling, zowel API's als databases. Zowel arXiv als het LLM zijn mocked, ook in de echte versie, dit zou een van de eerste dingen zijn die je moet regelen. Eigenlijk zou je ook net als in de inspiratie die ik opgaf een vector database willen opzetten om de context die je meestuurt te indexeren. Ik heb geen ervaring met vector databases, dus dat zou tijd kosten om te doen.
 - Deployment moet nog geregeld worden. Nx heeft een Dockerfile aangemaakt die er redelijk goed uit ziet, maar dit is uiteraard niet genoeg voor productie. Er moeten github actions (of Gitlab CI/CD) aangemaakt worden (Nx beweert dit ook te kunnen bij het project aanmaken) en het moet ergens online gezet worden.
 - Er is nog wel wat documentatie nodig bij de applicaties en modules.
