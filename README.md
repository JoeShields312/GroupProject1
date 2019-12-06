# GroupProject1-

    <!-- HTML -->

    <!-- Jumboron -->
        <!-- user input zipCode -->
        <!-- submit zipCode -->

        <!-- ++++ -->

    <!-- empty div for propagation on submit of zipCode -->
        <!-- JS -->
        <!-- div posterBtn x5 -->

        <!-- ++++ -->

    <!-- empty div for propagation on click of posterBtn -->
        <!-- JS -->
        <!-- div rotten tomatoes  review -->
        <!-- div for scores -->
        <!-- mapBtn for google map -->

    <!-- empty div for propagation on click of mapBtn -->
        <!-- JS -->
        <!-- div for google map api -->

    <!-- Footer -->

API used

movieglu
    GetFilmShowingNow
    GetFilmShowtime
    GetCinemaDetails

API Endpoint : https://api-gate2.movieglu.com/
Username : SMIT_0
x-api-key : ZRUjCrZ5r18epZovOj1A3aesuvedkfbZ7Dy06U7U
Territory : US
Authorization : Basic U01JVF8wOkF4emkwWEppMDFlcg==
Request limit : 75

omdb

GoogleMaps Api
AIzaSyAANtePNUW17A6gNOBBD5uSa9oZA12jw-A


1.Get Device Location (Lon, Lat) from user pressing btn
2.with Coords from device location - getfilmsnow(api)
3.film_id (for api), film_year(for omdb), film_name(omdb), image(btn)
4.OMDB (need details) stuff using film_year and film_name
5.using film_id, moment.js(date) - getfilmshowtime(api)
6.user onclick showtime(btn) - cinema_id
7.using cinema_id - getcinemadetails(api)
8.cinema coords, distance from divice location
