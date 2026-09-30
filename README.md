# Princess's Little World
Personal portfolio for Princess S. Responte · BS Nursing · GEC124 – H23.

## Open it in Notepad or a browser
Extract the ZIP first. Open index.html in a browser to view the website.
Open index.html, style.css, or script.js in Notepad to edit. Save using UTF-8 and
“All files” so Notepad does not add .txt. No Vite, npm, framework, or build is needed.

The separate Princess_Portfolio.html download puts the CSS, JavaScript, and photos
inside one HTML file. Double-click it to open. In Notepad, search for a section ID
such as id="about" to find its text. The long data:image strings are embedded photos.
Use the ZIP version when replacing photos frequently.

## Included content and interactions
- Welcome portrait, name, degree, course, and section.
- About cards: background, interests/hobbies, and goals; click or press Enter/Space.
- Three-step education timeline; click or press Enter/Space to expand.
- Five academic skills with self-assessed proficiency bars; five soft-skill keywords.
- Three project categories with accessible detail dialogs and academic distinctions.
- Services: Administrative Support, Event & Project Support, Writing & Documentation,
  and Creative & Visual Support, using the supplied descriptions.
- Testimonials: two supplied quotes, without names or roles because none were given.
  To add attribution later, put a figcaption after each blockquote.
- Favorite Things carousel: Cats, Matcha, Adventure, Duty, Sports.
  Use Previous/Next, dots, Left/Right keys, or swipe on a touchscreen.
- Souvenir carousel: visit receipt and a real camera photo booth.
- Automatic sparkle cursor and mouse trail. Touch uses normal interaction;
  reduced-motion settings disable the animated trail.
- Header hyperlinks for Home, About, Resume, Services, Testimonials, Favorites,
  and Souvenir; keyboard focus indicators, mobile layout, and footer credits.
  Reading order: Home → About → Favorites → Journey → Skills & Work → Services
  → Testimonials → Souvenir.
  Resume links to education, followed by skills, projects, and credentials.
  This remains a single-page portfolio with linked sections.

## Your photos
All six uploaded photos are included unchanged. To replace a photo, put a new photo
with the same filename in images/. Filenames are case-sensitive on GitHub.

| File | Placement |
| --- | --- |
| images/welcome.jpg | Welcome portrait |
| images/sunny.jpg | Cats slide |
| images/matcha.jpg | Matcha slide |
| images/adventure.jpg | Adventure slide |
| images/duty.jpg | Duty slide |
| images/sports.jpg | Sports slide |

The gallery gives all five photos the same 3:4 portrait frame using CSS.
object-fit: cover fills each frame without stretching; edges may be cropped.
The original image files remain unchanged.
images/cats.png is the earlier supplied artwork, retained as an optional asset.
images/cat.jpg is the previous Cats photo, retained as an optional replacement.
After replacing a photo, update its alt description in index.html as appropriate.
Replacing images in the ZIP folder does not update the separate embedded HTML file.

## Real photo booth
Choose Souvenir → Photo Booth → Start camera and allow camera access.
Choose Matcha, Strawberry, Adventure, or Classic Cream. Optional controls provide
mirrored selfies, black and white, and synthesized countdown/shutter sound.
Take 3 photos has a three-second countdown before each photo. Download the finished
strip as PNG. Change its frame after capture, retake, or stop the camera.
Switching to the receipt, scrolling away, hiding the tab, or leaving the page stops
an active camera. Completed pictures remain in memory until a retake or page reload.
Photos are not uploaded. The microphone is not requested.

HTML supplies the page structure; CSS styles it; JavaScript operates the camera,
canvas export, countdown, carousels, receipt, and cursor trail. The standalone .html
file contains all three. A real camera booth cannot function using HTML/CSS alone.
If your professor requires strictly HTML/CSS, discuss the interactive portion first.

Camera access needs a supported browser and permission in a secure context.
Test on your HTTPS GitHub Pages site if local-file camera access is unavailable.

## Receipt
Enter a nickname and choose Create my visit receipt. Print / Save as PDF prints a
copy of the receipt. Section checks track sections entering the viewport during the
current visit; they do not prove someone read a section. The booth is optional for
journey completion. Names are not sent to a server or retained after reload.

## GitHub Pages
Upload index.html, style.css, script.js, and the entire images/ folder together to
your repository. Enable GitHub Pages for that folder. Relative filenames support
repository URLs. Alternatively, rename Princess_Portfolio.html to index.html and
upload that single file. Use only one version as your published index.html.
Official setup guide:
https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Credits
Design and original scrapbook interactions adapted from Princess's Little World
source supplied by the project owner. All photos and optional cats artwork supplied
by the project owner. Camera/carousel additions were written for this portfolio.
No code from an unidentified YouTube tutorial was copied. API documentation:
- https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
- https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
- https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
Google Fonts (Nunito and Caveat) are optional; system fallbacks work offline.
Anime interests are included in the About section. No commercial anime recordings
or third-party cursor assets are bundled. The sparkle shape is inline SVG/CSS.

## Verification and final submission check
Checked balanced HTML, unique IDs, all local navigation/ARIA targets, all six photo
assets, JavaScript element references, and JavaScript syntax. Simulated camera tests
passed three-photo capture, undistorted 4:3 cropping, frame changes, PNG download
flow, retake, stop, denied permission, and cancellation of delayed permission.
Carousel tests passed captions, dots, wraparound, arrow keys, panel visibility,
and tab selection. A live hardware camera and visual browser check were unavailable.
Before submission, check on a phone and computer: navigation, readable card text,
all five gallery slides, camera permission/capture/download, receipt print preview,
and project dialogs. Confirm academic distinctions and self-assessed skill values.
The project descriptions summarize supplied categories; no unprovided work samples
or individual leadership positions have been invented.
