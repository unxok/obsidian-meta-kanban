This is a vault created for doing plugin development

[docs](https://github.com/unxok/obsidian-meta-kanban)

```json
hello: ['this', 'thing']
```

```python
hello = print('hwasld;f')
```


```meta-kanban
title: My Tasks
id: my-tasks
from: #task
where: true
columns: [difficulty, progress]
property: progress
direction: horizontal
lanes:
  -
    value: In progress
    title: In Progress
  -
    value: Not started
    title: Not Started
```

```dataview
TABLE file.etags, progress, difficulty
FROM #task
```
