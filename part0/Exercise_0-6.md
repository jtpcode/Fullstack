```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Status code 201 (Created)
    deactivate server

    Note right of browser: Server creates the new list without further HTTP-requests.
```
