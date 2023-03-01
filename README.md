# tome

## Running

To run this project locally, open the directory in a terminal and run: 

#### `npm start`

Then navigate in your browser to:

#### http://localhost:3000/

## Overview

### Spellbook
To save or unsave a spell to your spellbook, click the spellbook icon next to the name of the selected spell (on the right).

### Theme
To change between light and dark theme, click the button on the top right.

### Memory
Your spellbook and theme will persist between sessions.

Each time you select a spell the app will fetch the details of that spell with a REST request. If the spell is in your spellbook and you select it then the details will be saved for the session so you don't have to re-request the details!
