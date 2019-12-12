# Group Project 1 - Create a Browser Based User Application Utilizng APIs

This group project required creating a user app that is interactive, uses at least 2 server side APIs and 1 third part API, and a CSS framework that was not Bootstrap.

## Concept, Composition of Website

User Story: As a casual moviegoer, I want to be able to quickly view and choose from top movie options, and conveniently navigate to a nearby theatre.

Our website gives users the ability to find the top ten films in theaters, choose a film, and have access to movie details of the chosen film. They then see the nearest 5 theaters, which includes the next showing of the film they chose. Once they select a cinema, directions to the cinema populates. New results update if they select different movies or cineams.

When users try to decide on a movie, we’re providing choices and also the ease of selection by curating top options, local availability, with click events to limit typing but embedding data attributes to transfer those selections to output the next flow of data.

APIs used:
Movieglu: FilmsShowingNow; ClosestShowings
OMDB
Google Maps
moment.js
jquery

CSS used:
Materialize

## Process

The project was split among our team members: Joe, Jenny, and Yong. Joe focused on the front end HTML/CSS, while Jenny and Yong focused on the javascript and APIs. TThe HTML includes a combination of hard coded and dynamically (javascript) generated HTML. 

Challenges:
Different API formats and limitations, CORS errors, new CSS, git push/pull/merge issues.

Successes:
Clear concept, efficient itemization of tasks, collaborative effort to troubleshoot and develop improvements and solutions.

## Deployment

Our project is deployed on Github. 

https://github.com/JShields30/GroupProject1

https://jshields30.github.io/GroupProject1/ 

## Acceptance Criteria

As a team, we had a clear idea of our MVP. Our concept translates to a working application that increases efficiency for the user. 

Some ideas for the next iterations of our app:
* Expanded options for user selection (freedom to search cinemas first, or filter by other parameters, etc.)
* Parse out more API data and add to existing functionality (trailers, more showtimes, google map directions and travel options,  etc.)
* Use more CSS functionality to improve UX/UI (additional materialize components such as collapsible divs, card reveal, etc.)
* Think of additional user needs (allow user to input address or locations rather than only using user location)
