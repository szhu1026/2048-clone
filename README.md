# FresherNote

[Heroku link][heroku]

[heroku]:

## Minimum Viable Product

2048 is a web browser game utilizing the powers of two and web animation.

- Hosting on Heroku.
- Working animation.
- Arrow key functionality.  Board moves along with arrow keys.
- Game is won if user gets to 2048.

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: docs/views.md
[components]: docs/components.md
[flux-cycles]: docs/flux-cycles.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md

## Implementation Timeline

### Phase 1: Implement Javascript game logic (1.5 days)

**Objective:** Functioning 2048 game logic

- [ ] Create class for tile, board
- [ ] Create methods for tile and board
- [ ] Create methods for shifts based off arrow key input
- [ ] Score functionality 

### Phase 2: Implement CSS and HTML design (1 day)

**Objective:**  Design out CSS features for 2048

- [ ] Image changes for when tile updates value
- [ ] Pull color images for specific numbers
- [ ] Animation for arrow shifts

### Phase 3: Add additional features (.5 day)

**Objective:** Add additional features not featured in original 2048

- [ ] Implement different board game size
- [ ] Allow users to update board game size
- [ ] Allow users to update target (4096 etc.)


### Bonus Features (TBD)
- [ ] multiplayer game

[phase-one]: docs/phases/phase1.md
[phase-two]: docs/phases/phase2.md
[phase-three]: docs/phases/phase3.md
