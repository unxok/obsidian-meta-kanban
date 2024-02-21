# Obsidian Meta Kanban
This is a plugin for the note-taking app [Obsidian](https://obsidian.md/) which creates a custom code block syntax to generate a Kanban board which is interconnected with the properties (metadata/frontmatter) of the notes in your vault.

This depends on the [Dataview](https://github.com/blacksmithgu/obsidian-dataview/tree/master) and [MetaEdit](https://github.com/chhoumann/MetaEdit) plugins to achive the functionality of quickly and efficiently reading and updating metadata. Please show them some love for all their hardwork!

## Usage

Set your codeblock langauge to `meta-kanban` → <code>```meta-kanban</code>
The configuration will accept any valid YAML syntax, as long as they match the types described below

### Quick Reference
```yaml
title: string
id: string
property: string
direction: "horizontal" || "vertical"
from: DataviewSource
where: expression returning a boolean
columns: Array<string>
lane: propertyValue, title
```


### Example
```yaml
title: My Tasks
id: my-tasks
property: progress
direction: horizontal
from: #task
where: p.progress !== 'abandoned'
columns: progress, difficulty
lane: not started, Not Started
lane: in progress, In Progress
lane: completed, Completed
```

That will then render your Kanban board with the lanes you described and will automatically pull the notes it needs for each lane based on your configuration.
Then you can simply drag and drop cards between columns and it will be moved to that column and **it's property will be updated accordingly**

## Roadmap
These features will not have a set schedule as I can only work on this in my free time.

### Alpha
This is the first release which will cover all the necessary features for this plugin to be considered 'functioning'.
- [x] Custom code block syntax
- [x] Parse code block to JSON
- [x] Handle errors with validation/parsing
- [x] Generate cards automatically in each lane
- [x] Allow cards to be dragged to different lanes
- [x] Card metadata updated when dragged to different lane
- [x] Allow cards to be dropped anywhere in the lane and shift other cards

### Beta
This will be the release where 'quality of life' improvements are added. Ideally I can get some feedback about what features others may want to see.
- [ ] Add card button on each lane
- [ ] Add card button can be configured to templates and default folder
- [ ] Custom colors for lanes
- [ ] Custom color for board
- [ ] Text alignment options

### Backlog
This is not really a release per say, but rather a list of features that I don't have figured out on when I want to try and implement them
- [ ] Resort lanes when rendered
  - Honestly I don't know if this one is worth it since you can easily just edit the code block to do this
