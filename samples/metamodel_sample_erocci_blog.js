{
  "kinds": [
    {
      "attributes": {
        "example.blog.title": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        }
      },
      "location": "http://localhost:8080/categories/blog",
      "parent": "http://schemas.ogf.org/occi/core#resource",
      "scheme": "http://example.org/occi/test#",
      "term": "blog",
      "title": "A Blog"
    },
    {
      "attributes": {
        "occi.core.summary": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        }
      },
      "location": "http://localhost:8080/categories/resource",
      "parent": "http://schemas.ogf.org/occi/core#entity",
      "scheme": "http://schemas.ogf.org/occi/core#",
      "term": "resource",
      "title": "Core Resource"
    },
    {
      "attributes": {
        "occi.core.id": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        },
        "occi.core.title": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        }
      },
      "location": "http://localhost:8080/categories/entity",
      "scheme": "http://schemas.ogf.org/occi/core#",
      "term": "entity",
      "title": "Core Entity"
    },
    {
      "location": "http://localhost:8080/categories/author",
      "parent": "http://schemas.ogf.org/occi/core#link",
      "scheme": "http://example.org/occi/test#",
      "term": "author",
      "title": "Author"
    },
    {
      "attributes": {
        "blog.entry.content": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "blog.entry.date": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        },
        "blog.entry.title": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        }
      },
      "location": "http://localhost:8080/categories/entry",
      "parent": "http://schemas.ogf.org/occi/core#resource",
      "scheme": "http://example.org/occi/test#",
      "term": "entry",
      "title": "entry"
    },
    {
      "attributes": {
        "blog.user.email": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        },
        "blog.user.name": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "blog.user.role": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        }
      },
      "location": "http://localhost:8080/categories/user",
      "parent": "http://schemas.ogf.org/occi/core#resource",
      "scheme": "http://example.org/occi/test#",
      "term": "user",
      "title": "Blog user"
    },
    {
      "attributes": {
        "occi.core.source": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "occi.core.source.kind": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        },
        "occi.core.target": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "occi.core.target.kind": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        }
      },
      "location": "http://localhost:8080/categories/link",
      "parent": "http://schemas.ogf.org/occi/core#entity",
      "scheme": "http://schemas.ogf.org/occi/core#",
      "term": "link",
      "title": "Core Link"
    }
  ],
  "mixins": [
    {
      "location": "http://localhost:8080/categories/tag",
      "scheme": "http://erocci.ow2.org/occi#",
      "term": "tag",
      "title": "User mixin root mixin"
    }
  ]
}

