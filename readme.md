# Fan Recreation of Bella Sara Stable Game

This is a fan recreation of the [Bella Sara horse stable game](https://bellasara.wiki.gg/wiki/Magical_Horses) intended for archival purposes since the original is no longer available.


## Set Up

To start, you will first need to download the code from this repository. This can be done using git or by downloading the .zip folder directly in the browser.

Since JavaScript has been used here in place of Flash, Flash is not required to play this recreation. However, since modern browsers place a few limitations on files opened directly in the browser, this game does need to be running from a server to work.

The following are a few ways to set up a server locally (on your own computer):

- If you have [VSCode](https://code.visualstudio.com/) installed, install the Live Server extension in VSCode, open this project in VSCode and then press 'Go Live' in the bottom right to open the game in the browser.

- If you have python installed (it should be preinstalled on Macs), navigate to the project folder and run `python -m SimpleHTTPServer 8080` (or `python -m http.server 8080`	for python version 3).

- A dockerfile is also provided, so if you install [Docker](https://www.docker.com/get-started/), you can run the game locally by running the following after navigating to the project folder:
  ```
  docker build -t dockersite .
  docker run -dit --name dockersite-container -p 8080:80 dockersite
  ```

- Some other options are also listed [here](https://blog.ourcade.co/posts/2020/5-local-web-server-get-started-phaser-3/).


After starting a server locally, you can usually access it from http://localhost:8080/.



## Credits and References

All the original textures, animations, sounds and the gameplay itself were taken from the horse care game on Bella Sara and belong to the Bella Sara Company, LLC.

- Most of the spritees, animations and sounds come from a recovered cache of many of the original game files was recovered by Crystallinetearz and extracted by Mewfantasy and al_2713 (from the North of North discord)
- Additional screen recordings and screenshots of the game have been taken from the following and have been used / referenced whilst remaking the game:
  - The [Bella Sara Wiki](https://bellasara.wiki.gg/wiki/Bella_Sara_Wiki) has many  different screenshots of the stable and different horses.
  - [This video](https://www.youtube.com/watch?v=uaQ2FjKgHKQ&t=627s) was heavily referenced for recreating the actual gameplay.
- Other tools used:
  - The [Phaser](https://phaser.io/) game framework has been used to keep most of the coding pretty simple.
  - The [Leshy Sprite Sheet Tool](https://www.leshylabs.com/apps/sstool/) and [Codeshack Sprite Sheet Generator](https://codeshack.io/images-sprite-sheet-generator/) have been used to generate the texture atlas files and sprite sheets.
  - [This](https://fpscalculator.com/frames-to-time-calculator/) frame to time calculator was used to calculate timings and delays
  - [Spine Animations](https://blog.ourcade.co/posts/2020/phaser-3-parcel-typescript-spine/) are used for the horse

## Progress
- [ ] Basic gameplay
  - [x] remove dirty straw
  - [x] add new straw
  - [x] brush
  - [x] small brush
  - [x] hoofpick
  - [x] fill water
  - [x] give food
  - [x] apple
  - [x] click card for positive message
  - [x] click horseshoe for good luck
  - [ ] awards?
  - [x] music on/off
  - [x] help button
  - [x] progress bars for hunger, cleanliness and happiness
- [ ] Original sprites
  - [x] stable background
  - [x] shovel
  - [x] pitchfork
  - [x] hay loft
  - [x] hay (on ground)
  - [x] brush
  - [x] small brush
  - [x] hoofpick
  - [x] hoofpick circles
  - [x] water trough
  - [x] oats bin
  - [x] oats scoop
  - [x] food trough
  - [x] apple bin
  - [x] apple
  - [x] card image
  - [x] good luck
  - [ ] awards?
  - [x] music button
  - [x] help button
- [ ] Horse animations (these are being reanimated with pine animations)
  - [ ] Idle animations should be chosen randomly and start after a random delay. (*[onCompleteEvent](https://labs.phaser.io/view.html?src=src\animation\on%20complete%20event.js) could be used to queue the next animation, and random numbers could be used to pick an animation and start it after a [random delay](https://labs.phaser.io/view.html?src=src\animation\random%20delay.js)?*)
  - Placeholder
    - [ ] eat food
    - [ ] eat apple
    - [x] drink
    - [x] rear
    - [ ] paw with foreleg
    - [ ] raise head
    - [ ] raise head slow
    - [ ] shift in place
    - [ ] ear twitch
    - [ ] breath
    - [ ] sway
    - [ ] tail swish
  - Final
    - [ ] eat food
    - [ ] eat apple
    - [x] drink
    - [x] rear
    - [ ] paw with foreleg
    - [ ] raise head
    - [ ] raise head slow
    - [ ] shift in place
    - [ ] ear twitch
    - [ ] breath
    - [ ] sway
    - [ ] tail swish
- [ ] Textures
  - [ ] Horses
    - [x] Peter
    - [ ] Jewel
    - [ ] Fiona
    - [ ] ...
  - [ ] dirt overlay
- [ ] Sounds
  - [x] background music
  - [x] pour water
  - [x] pick up / pour grain
  - [x] feed apple
  - [x] use shovel
  - [x] pick up straw
  - [x] place straw
  - [x] brush
  - [x] small brush
  - [x] use hoofpick
  - [x] good luck
  - [x] rear / neigh
  - [ ] pawing
  - [ ] hooves shifting
  - [ ] ...