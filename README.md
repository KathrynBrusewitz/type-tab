# Type Tab
A dead simple and customizable new tab Chrome extension for keeping notes. Auto-saves as you type and syncs across browsers and devices wherever you're signed into your Google account. Goal is to keep Type Tab as lightweight and straightforward as possible while enabling notetaking to be quick and always available.

Available options at the moment:
- Font color, size, family
- Line height
- Enable spellcheck
- Background color
- Background image url

See the [issue tracker](https://github.com/KathrynBrusewitz/type/issues) for future updates in the works. Type Tab can easily extend to other browsers like FireFox and Edge, but I'm a Chrome user so that's what I'm focusing on supporting first.

## Installing
This is just a development release. You'll need to download or clone this repo as an unpacked extension.

1. If you downloaded the code, unzip the file.
2. Open `chrome://extensions/` or select the menu `Window > Extensions`.
3. Enable developer mode at top right.
4. Click `Load unpacked extension...` and select the source code folder.

## Screenshots

![Type Tab in Monospace](./screenshots/monospace.jpg)

![Type Tab in Sans-Serif](./screenshots/sans-serif.jpg)

# Docs

## Why chrome.storage.sync and not window.localStorage?

- Each extension gets its own storage
- Data is available in content scripts and shareable across domains; sharing data with localStorage is limited to background pages
- Automagically serializes JSON-compatible data; localStorage only stores strings
- Has built-in method for default values: 
```
chrome.storage.local.get({ key: defaultValue }, (value) => { /*...*/ });
```
- [Is supported by Firefox and Edge](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/sync), therefore enabling Type Tab to be available across all instances of that browser that the user is logged into (e.g. via Firefox sync, or a Google account), across different devices

## Links
- [Chrome.storage.sync example](https://gist.github.com/IzumiSy/765cfd6dc02c79de875e)
- [Chrome.storage API](https://developer.chrome.com/extensions/storage)
