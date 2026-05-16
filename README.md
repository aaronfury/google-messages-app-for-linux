# Google Messages Desktop *for Linux*

Welcome to Google Messages Desktop! This is an unofficial Electron-based wrapper for Google Messages, bringing the web app to your desktop with some extra goodies.

This version is forked from [markeglseder](https://github.com/markeglseder/google-messages-app)'s Mac-optimized version and is (very) lightly modified to remove a few things and build for Linux.

## Features
- Native desktop app experience for Google Messages
- Adapts to your system's light/dark mode
- Remembers window position and size
- Desktop notifications with smart handling
- Global shortcut (Cmd+Shift+M) to quickly show/hide the app
- Tray icon for easy access and app management

## Getting Started

1. Download the latest release from the [Releases](https://github.com/aaronfury/google-messages-app-for-linux/releases) page.
2. Download the AppImage.
3. Do the necessary AppImage things to get it to run. Or use Gear Lever or something to manage it.

## Development

Feeling techy? Here's how to run it from source:

1. Clone this repo
2. Run `npm install`
3. Start the app with `npm start`

To build your own version:

```bash
npm run build
```

This will create a distributable in the `dist` folder.

## Contributing & Issues
I hate to sound curmudgeonly, but this project was largely self-serving. It's also pretty dang basic. Contributions and bug reports are appreciated, but may not be acknowledged or acted upon.

If you want to help package this in RPM and DEB, that would be appreciated. I can't figure out RPM, and didn't bother with DEB.

I love you all.

## License

The original project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

I personally prefer CC0 because it's as close to "do what you will" as you can get, but I'm not sure how that applies to derivative works. And I don't care enough to learn. So, I make no claims about the licensing of this project. But do what you will.

Also also, the original README in @markeglseder's project linked to a nonexistent LICENSE.md file. Since I have to include that license text to be compliant with it, I've included the standard MIT license text, but with no copyright info because the original author didn't include it.

Also also also, the more I look over @markeglseder's profile (and the original README for this project), the more I realize it may have been "vibe-coded AI slop," as the kids say. Not throwing shade, just saying. Maybe it was just the README file that was AI-generated.

## Acknowledgements
- Google for the awesome Messages web app
- Electron for making cross-platform desktop apps easy
- @markeglseder, and possibly an AI and therefore, every open-source developer whose work was ripped off by the goddamned AI.
- ... Google Gemini for answering some questions I had 🫢

Don't you judge me.
