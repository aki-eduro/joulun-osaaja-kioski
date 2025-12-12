# Joulun Osaaja – AI Tonttukioski

Itsenäinen Lovable-kioski, jossa käyttäjä muuntaa oman kamerakuvansa tonttukuvaksi, kirjoittaa lahjatoiveensa ja saa tulostettavan Joulun Osaaja -todistuksen. Ei sähköpostia tai kirjautumista – kaikki tapahtuu yhdessä istunnossa.

## Pika-ajo

```sh
npm install
npm run dev
```

## Käyttöpolku
1. Tervetuloa-näkymä: otsikko “Joulun Osaaja – AI Tonttukioski” ja Aloita-painike.
2. Nimikysymys (min 2 merkkiä).
3. Lahjatoive/supervoima (max 160 merkkiä) + mahdollisuus liittää oma PNG/SVG-osaamismerkki todistukseen.
4. Kamera: otetaan kuva ilman rajauksia tai korvaavia kasvoja.
5. AI-muunnos: asiakaspään canvas lisää tonttulakin, korvat, asun, jouluisen miljöön ja visualisoi toiveen.
6. Todistusnäyttö: näyttää AI-muokatun kuvan, toiveen lainauksena, käyttäjän merkin ja Tulosta-painikkeen. Print-näkymä on yhden A4-sivun mittainen.

## Teknologia
- Vite + React + TypeScript
- shadcn/ui + Tailwind CSS
- Asiakaspuolen canvas-muunnos (ei ulkoisia kutsuja)

## Local test checklist
- **Nimivaihe toimii**: syötä vähintään 2 merkkiä ja siirry eteenpäin.
- **Toive & merkki**: kirjoita toive (≤160 merkkiä), liitä PNG/SVG ja tarkista esikatselu.
- **Kamera & AI-muunnos**: ota kuva, odota AI-muunnosvalmistuminen ja varmista, että kuvaa ei ole rajattu pois.
- **Todistus & tulostus**: tarkista, että todistus näyttää nimen, AI-kuvan, toiveen lainauksena ja liitetyn merkin. Print preview tuottaa yhden A4-sivun ilman venyviä elementtejä.
