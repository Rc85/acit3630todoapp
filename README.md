# To Do App

## Description
A simple task management app that keeps track of current tasks. It includes features to set one time or recurring events, the capability to view/modify/delete events, and a calendar.

## Major Tasks (High Priority)

- [x] Add/Remove tasks
- [x] Saving tasks to local storage
- [x] Setting events
- [x] Saving events to local storage
- [ ] Push notification for event reminder
- [ ] Recurring reminder for events
- [x] Adding events
  - [x] Should reflect in event list
- [x] Deleting events
  - [ ] Update the list in `SetEventComponent.js`
- [ ] Modifying events
  - [ ] Changes should reflect immediately
- [ ] Calendar view

## Minor Tasks (Low Priority)

- [ ] Add icons to headers
- [ ] Use icons for navigation button instead of texts (text won't fit)
- [ ] Add color badges with category name for tasks
- [ ] Selecting date in calendar show events for that date only

## Current AsyncStorage Objects

`tasksList`
- An array that stores tasks in the form of `[ 'task1', 'task2', ...]`

`events`
- An array that store events in the form of `[ {eventName: <string>, date: <string>, time: <string>, repeat: <string> }, ...]`

## Project Members

- Alex Lilley
- Creighton Lee
- Roger Chin
