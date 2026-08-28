# Real-Device Launch Checklist

Use the production preview URL and record device model, OS/browser version, network and result. Local emulation is not a substitute.

## iOS Safari

- [ ] Cold and warm page load
- [ ] Header compression and menu open/close/focus return
- [ ] Safe-area spacing and edge progress rail
- [ ] Homepage autoplay, pause behaviour and swipe
- [ ] Case index filter, active preview and detail navigation
- [ ] Team rail swipe, snap, portrait visibility and disclosure
- [ ] Contact steps preserve values
- [ ] Software keyboard opens/closes without obscuring controls
- [ ] Invalid fields focus visibly
- [ ] Controlled Contact success and forced failure
- [ ] Sticky How We Work journey remains bounded during address-bar changes
- [ ] Landscape rotation and back navigation
- [ ] Reduced Motion setting exposes all content

## Android Chrome

- [ ] Cold and warm page load
- [ ] Header and menu
- [ ] Carousel autoplay and swipe
- [ ] Case interaction and detail navigation
- [ ] Team rail swipe/snap
- [ ] Contact steps, keyboard, validation, success and failure
- [ ] Sticky journeys and browser-toolbar viewport changes
- [ ] Back navigation and language switch
- [ ] Reduced Motion where supported

## Slower / low-power device

- [ ] No sustained input lag or blocked native scrolling
- [ ] Carousel and reveal motion remain stable
- [ ] Images do not decode into blank frames
- [ ] Contact remains usable while other media is loading

## Sign-off

- [ ] iOS Safari signed by tester
- [ ] Android Chrome signed by tester
- [ ] Any issue has severity, reproduction steps, screenshot/video and owner

Status: HUMAN TEST REQUIRED.
