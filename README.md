# What is this?
A simple application that shortens urls. You can enter a long url and then receive a short link that will take you to that same location.
It was written as a fun mini project to get familar with Svelte kit
It is pretty simple and open to extension.

# How would I extend this project?
A few ideas include
. Give the UI some styling - it looks pretty bad.
. Properly use TS in the back and front end for an improved dev experience
. Add unit/integration testing
. Improve the migrations code, it is fairly simplistic. There is a rollback flag in the table that does nothing
. Add user accounts - currently you can see all the links and remove them. This should be restricted to user accounts so you can login and manage your links/analytics
. Add analytics - both in terms of a ui page and in the backend to record data about how often links are clicked and who is clicking them, displaying them in a nice graphical way.
. Improve the validation of links in front and backend
