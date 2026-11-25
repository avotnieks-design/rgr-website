# RGR sākumlapas video

Izmantots lietotāja piegādātā `rgr.mp4` posms no **00:38 līdz klipa beigām (01:22,48)**. Saglabāts viss 44,48 sekunžu attēls; gala logotips ir daļa no izvēlētā posma. Oriģināls netiek publicēts.

- `rgr-hero-desktop-v1.mp4`: 1280×720, H.264, 25 fps, 9 242 311 baiti. AAC skaņa saglabāta saitei “Skatīties video ar skaņu”; fona elements vienmēr ir izslēgts skaņai.
- `rgr-hero-mobile-v1.mp4`: 960×540, H.264, 25 fps, bez audio, 4 261 549 baiti.
- `rgr-hero-poster-v1.jpg`: kadrs 38. sekundē, 41 104 baiti. Redzams pirms video un samazinātas kustības/datu taupīšanas režīmā.

MP4 galvenes izvietotas faila sākumā (`faststart`). Telefoniem tiek pieprasīts tikai mazākais fails; izšķirtspēja izvēlēta pie pirmās atskaņošanas. Samazinātas kustības, datu taupīšanas un 2G režīmā video automātiski netiek pieprasīts; var sākt atskaņošanu ar pogu. Fons apstājas ārpus skata un slēptā cilnē. YouTube iframe un tā API skripts ir noņemti.

Visi publicējamie faili glabājas šajā repozitorijā un publicējas ar parasto Cloudflare Pages GitHub integrāciju. Versēti failu nosaukumi un CSS/JS vaicājumi novērš vecā video kešatmiņas izmantošanu. Precīzi failu izmēri un kontrolsummas ir `video-manifest.json`.

## Atjaunošana no oriģināla

Datora versija:

```sh
ffmpeg -ss 38 -i rgr.mp4 -map 0:v:0 -map '0:a:0?' -vf 'scale=1280:-2:flags=lanczos,fps=25' -c:v libx264 -preset medium -crf 26 -maxrate 1800k -bufsize 3600k -pix_fmt yuv420p -profile:v high -level:v 3.1 -g 50 -c:a aac -b:a 96k -map_metadata -1 -movflags +faststart rgr-hero-desktop-v1.mp4
```

Telefona versijai: mērogs 960, CRF 28, maxrate 850k, bufsize 1700k, `-an`. Pēc satura maiņas izmanto jaunu faila versiju un atjaunini HTML saites; nemaini citus lapas materiālus.
